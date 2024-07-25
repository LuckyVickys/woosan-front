import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getReplies, saveReply } from '../../api/matchingBoardReplyApi';
import MatchingReplyDropDown from '../matching/element/MatchingReplyDropDown';
import { BsThreeDotsVertical } from "react-icons/bs";
import styles from '../../assets/styles/matching/ReplySection.module.scss';
import ReplyPagination from './ReplyPagination';
import defaultProfile from '../../assets/image/profile.png';
import { formatRelativeTime } from "../../util/DateUtil.jsx";
import MsgModal from "../board/element/MsgModal.jsx";
import ReportModal from "../board/element/ReportModal.jsx";
import Swal from 'sweetalert2';
import replyArrow from "../../assets/image/reply_arrow.png";
import useCustomLogin from "../../hooks/useCustomLogin";  // 로그인 훅 추가
import LoginModal from "../member/LoginModal";  // 로그인 모달 추가

const ReplySection = ({ matchingId, parentId = null, onReplyAdded, onCommentCountChange }) => {
    const loginState = useSelector((state) => state.loginSlice);
    const memberId = loginState.id; // 로그인된 회원 ID
    const memberType = loginState.memberType; // 회원 유형 (USER, ADMIN 등)
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyInputs, setReplyInputs] = useState({});
    const [showReplyInput, setShowReplyInput] = useState({});
    const [isDropdownOpen, setIsDropdownOpen] = useState({});
    const [isMsgModalOpen, setIsMsgModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [selectedReceiver, setSelectedReceiver] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const dropdownRef = useRef({});
    const replyInputRef = useRef({});
    const { isLogin, moveToLoginReturn, isLoginModalOpen, closeLoginModal } = useCustomLogin();  // 로그인 훅 사용

    // 댓글 및 답글을 가져오는 함수
    useEffect(() => {
        fetchComments();
    }, [matchingId, currentPage, onCommentCountChange]);

    const fetchComments = async () => {
        try {
            const res = await getReplies(matchingId, { page: currentPage - 1, size: 10 });
            const commentTree = buildCommentTree(res.content);
            setComments(commentTree);
            setTotalPages(res.totalPages);
            const totalCount = res.content.length; // 단순히 댓글 개수로 변경
            onCommentCountChange(totalCount);
        } catch (error) {
            Swal.fire('오류!', '댓글을 가져오는 중 오류가 발생했습니다.', 'error');
        }
    };

    // 댓글 트리를 빌드하는 함수
    const buildCommentTree = (comments) => {
        const map = {};
        const roots = [];

        comments.forEach(comment => {
            map[comment.id] = { ...comment, childReplies: [] };
        });

        comments.forEach(comment => {
            if (comment.parentId) {
                if (map[comment.parentId]) {
                    map[comment.parentId].childReplies.push(map[comment.id]);
                }
            } else {
                roots.push(map[comment.id]);
            }
        });

        return roots;
    };

    // 드롭다운 및 입력창 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            Object.keys(dropdownRef.current).forEach((key) => {
                if (dropdownRef.current[key] && !dropdownRef.current[key].contains(event.target)) {
                    setIsDropdownOpen((prev) => ({
                        ...prev,
                        [key]: false,
                    }));
                }
            });

            Object.keys(replyInputRef.current).forEach((key) => {
                if (replyInputRef.current[key] && !replyInputRef.current[key].contains(event.target)) {
                    setShowReplyInput((prev) => ({
                        ...prev,
                        [key]: false,
                    }));
                }
            });
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 댓글 입력값 변경 핸들러
    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    // 댓글 제출 핸들러
    const handleCommentSubmit = async () => {
        if (!isLogin || (memberType !== 'USER' && memberType !== 'ADMIN')) {
            Swal.fire({
                title: "로그인이 필요한 서비스입니다.",
                icon: "error",
                confirmButtonText: "확인",
                confirmButtonColor: "#3085d6",
            }).then((result) => {
                if (result.isConfirmed) {
                    moveToLoginReturn();
                }
            });
            return;
        }

        const requestDTO = {
            matchingId: matchingId,
            writerId: memberId,
            content: newComment,
            parentId: parentId
        };
        try {
            await saveReply(requestDTO);
            setNewComment('');
            fetchComments();
            if (onReplyAdded) onReplyAdded();
        } catch (error) {
            Swal.fire('오류!', '댓글 저장 중 오류가 발생했습니다.', 'error');
        }
    };

    // 답글 입력값 변경 핸들러
    const handleReplyChange = (commentId, e) => {
        setReplyInputs({
            ...replyInputs,
            [commentId]: e.target.value
        });
    };

    // 답글 제출 핸들러
    const handleReplySubmit = async (commentId) => {
        if (!isLogin || (memberType !== 'USER' && memberType !== 'ADMIN')) {
            Swal.fire({
                title: "로그인이 필요한 서비스입니다.",
                icon: "error",
                confirmButtonText: "확인",
                confirmButtonColor: "#3085d6",
            }).then((result) => {
                if (result.isConfirmed) {
                    moveToLoginReturn();
                }
            });
            return;
        }

        const requestDTO = {
            matchingId: matchingId,
            writerId: memberId,
            content: replyInputs[commentId],
            parentId: commentId
        };
        try {
            await saveReply(requestDTO);
            setReplyInputs({
                ...replyInputs,
                [commentId]: ''
            });
            setShowReplyInput({
                ...showReplyInput,
                [commentId]: false
            });
            fetchComments();
            if (onReplyAdded) onReplyAdded();
        } catch (error) {
            Swal.fire('오류!', '답글 저장 중 오류가 발생했습니다.', 'error');
        }
    };

    // 답글 입력창 토글 핸들러
    const toggleReplyInput = (commentId) => {
        setShowReplyInput({
            ...showReplyInput,
            [commentId]: !showReplyInput[commentId]
        });
    };

    // 드롭다운 토글 핸들러
    const toggleDropdown = (commentId) => {
        setIsDropdownOpen({
            ...isDropdownOpen,
            [commentId]: !isDropdownOpen[commentId]
        });
    };

    // 답글 및 댓글이 삭제되었을 때 상태를 업데이트하는 함수
    const handleReplyAdded = async () => {
        fetchComments();
    };

    // 메시지 모달 열기 핸들러
    const openMsg = (receiver) => {
        setSelectedReceiver(receiver);
        setIsMsgModalOpen(true);
    };

    // 리포트 모달 열기 핸들러
    const openReport = () => {
        setIsReportModalOpen(true);
    };

    // 페이지 변경 핸들러
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 답글 렌더링 함수
    const renderReplies = (replies, parentCommentId = null) => {
        return replies.map(reply => (
            <div key={reply.id} className={`${styles.reply} ${parentCommentId ? styles.childReply : ''}`}>
                {parentCommentId && (
                    <div className={styles.replyArrowContainer}>
                        <img src={replyArrow} alt="Reply Arrow" className={styles.replyArrow} />
                    </div>
                )}
                <div className={styles.replyContentContainer}>
                    <div className={styles.replyHeader}>
                        <div className={styles.replyWriterInfo}>
                            <img src={reply.profileImageUrl || defaultProfile} alt="프로필" className={styles.profileImage} />
                            <div className={styles.replyMeta}>
                                <span className={styles.replyWriter}>{reply.nickname}</span>
                                <span className={styles.replyDate}>{formatRelativeTime(reply.regDate)}</span>
                            </div>
                        </div>
                        <div className={styles.commentActions}>
                            <div className={styles.dropdownWrapper} ref={el => dropdownRef.current[reply.id] = el}>
                                <BsThreeDotsVertical
                                    className={styles.threeDotsIcon}
                                    onClick={() => toggleDropdown(reply.id)}
                                />
                                {isDropdownOpen[reply.id] && (
                                    <div className={styles.replyDropdownList}>
                                        <MatchingReplyDropDown 
                                            replyId={reply.id}
                                            openReport={openReport}
                                            openMsg={() => openMsg(reply.nickname)}
                                            onDeleteSuccess={handleReplyAdded}
                                            showDeleteButton={memberId === reply.writerId}
                                            writerId={reply.writerId}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <p className={styles.replyContent}>{reply.content}</p>
                    <button
                        className={styles.replyToggleButton}
                        onClick={() => toggleReplyInput(reply.id)}
                    >
                        답글 달기
                    </button>
                    {showReplyInput[reply.id] && (
                        <div className={styles.replyInputContainer} ref={el => replyInputRef.current[reply.id] = el}>
                            <img src={loginState.profileImage || defaultProfile} alt="프로필" className={styles.profileImage} />
                            <textarea
                                className={styles.replyInput}
                                placeholder="댓글은 또 다른 나입니다. 바르고 고운말로 작성해주세요."
                                value={replyInputs[reply.id] || ''}
                                onChange={(e) => handleReplyChange(reply.id, e)}
                            ></textarea>
                            <button
                                className={styles.replyButton}
                                onClick={() => handleReplySubmit(reply.id)}
                                disabled={!replyInputs[reply.id]?.trim()}
                            >
                                답글 작성
                            </button>
                        </div>
                    )}
                    {reply.childReplies && reply.childReplies.length > 0 && renderReplies(reply.childReplies, reply.id)}
                </div>
            </div>
        ));
    };

    // 댓글 및 답글 렌더링 함수
    const renderComments = (comments) => {
        return comments.map(comment => (
            <div key={comment.id} className={styles.comment}>
                <div className={styles.commentHeader}>
                    <div className={styles.commentWriterInfo}>
                        <img src={comment.profileImageUrl || defaultProfile} alt="프로필" className={styles.profileImage} />
                        <div className={styles.commentMeta}>
                            <span className={styles.commentWriter}>{comment.nickname}</span>
                            <span className={styles.commentDate}>{formatRelativeTime(comment.regDate)}</span>
                        </div>
                    </div>
                    <div className={styles.commentActions}>
                        <div className={styles.dropdownWrapper} ref={el => dropdownRef.current[comment.id] = el}>
                            <BsThreeDotsVertical
                                className={styles.threeDotsIcon}
                                onClick={() => toggleDropdown(comment.id)}
                            />
                            {isDropdownOpen[comment.id] && (
                                <div className={styles.commentDropdownList}>
                                    <MatchingReplyDropDown 
                                        replyId={comment.id}
                                        openReport={openReport}
                                        openMsg={() => openMsg(comment.nickname)}
                                        onDeleteSuccess={handleReplyAdded}
                                        showDeleteButton={memberId === comment.writerId}
                                        writerId={comment.writerId}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <p className={styles.commentContent}>{comment.content}</p>
                <button
                    className={styles.replyToggleButton}
                    onClick={() => toggleReplyInput(comment.id)}
                >
                    답글 달기
                </button>
                {showReplyInput[comment.id] && (
                    <div className={styles.replyInputContainer} ref={el => replyInputRef.current[comment.id] = el}>
                        <img src={loginState.profileImage || defaultProfile} alt="프로필" className={styles.profileImage} />
                        <textarea
                            className={styles.replyInput}
                            placeholder="답글은 또 다른 나입니다. 바르고 고운말로 작성해주세요."
                            value={replyInputs[comment.id] || ''}
                            onChange={(e) => handleReplyChange(comment.id, e)}
                        ></textarea>
                        <button
                            className={styles.replyButton}
                            onClick={() => handleReplySubmit(comment.id)}
                            disabled={!replyInputs[comment.id]?.trim()}
                        >
                            답글 작성
                        </button>
                    </div>
                )}
                {comment.childReplies && comment.childReplies.length > 0 && renderReplies(comment.childReplies, comment.id)}
            </div>
        ));
    };

    return (
        <div className={styles.commentSection}>
            <h2>댓글</h2>
            {comments.length > 0 ? renderComments(comments) : <p>댓글이 없습니다.</p>}
            <div className={styles.commentInputContainer}>
                <img src={loginState.profileImage || defaultProfile} alt="프로필" className={styles.profileImage} />
                <textarea
                    className={styles.commentInput}
                    placeholder="댓글은 또 다른 나입니다. 바르고 고운말로 작성해주세요."
                    value={newComment}
                    onChange={handleCommentChange}
                ></textarea>
                <button
                    className={styles.commentButton}
                    onClick={handleCommentSubmit}
                    disabled={!newComment.trim()}
                >
                    댓글 작성
                </button>
            </div>
            {isMsgModalOpen && (
                <MsgModal
                    senderId={memberId}
                    receiver={selectedReceiver}
                    onClose={() => setIsMsgModalOpen(false)}
                />
            )}
            {isReportModalOpen && (
                <ReportModal
                    type="matchingReply"
                    targetId={matchingId}
                    reporterId={memberId}
                    onClose={() => setIsReportModalOpen(false)}
                />
            )}
            {totalPages > 1 && (
                <ReplyPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
            {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
        </div>
    );
}

ReplySection.propTypes = {
    matchingId: PropTypes.number.isRequired,
    parentId: PropTypes.number,
    onReplyAdded: PropTypes.func,
    onCommentCountChange: PropTypes.func.isRequired
};

export default ReplySection;
