import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getReplies, saveReply } from '../../api/matchingBoardReplyApi';
import MatchingReplyDropDown from '../matching/element/MatchingReplyDropDown';
import { BsThreeDotsVertical } from "react-icons/bs";
import styles from '../../assets/styles/matching/ReplySection.module.scss';
import Pagination from '../../components/matching/Pagination.jsx';
import defaultProfile from '../../assets/image/profile.png';
import { formatRelativeTime } from "../../util/DateUtil.jsx";
import MsgModal from "../board/element/MsgModal.jsx";
import ReportModal from "../board/element/ReportModal.jsx";
import Swal from 'sweetalert2';
import replyArrow from "../../assets/image/reply_arrow.png";

const ReplySection = ({ matchingId, parentId = null, onReplyAdded, onCommentCountChange }) => {
    const loginState = useSelector((state) => state.loginSlice);
    const memberId = loginState.id; // 로그인된 회원 ID
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

    // 댓글 및 답글을 가져오는 함수
    useEffect(() => {
        fetchComments();
    }, [matchingId, currentPage, onCommentCountChange]);

    const fetchComments = async () => {
        try {
            const res = await getReplies(matchingId, { page: currentPage - 1, size: 10 });
            console.log("API 응답 데이터:", res);  // 디버깅용 로그
            setComments(res.content);
            setTotalPages(res.totalPages);
            onCommentCountChange(res.totalElements);
        } catch (error) {
            console.error("댓글을 가져오는 중 오류 발생:", error);
        }
    };

    // 드롭다운 외부 클릭 시 드롭다운 닫기
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
        const requestDTO = {
            matchingId: matchingId,
            writerId: memberId,
            content: newComment,
            parentId: parentId
        };
        console.log("댓글 작성 요청 DTO:", requestDTO); // 디버깅용 로그 추가
        try {
            await saveReply(requestDTO);
            setNewComment('');
            // 댓글을 새로고침하여 업데이트
            fetchComments();
            if (onReplyAdded) onReplyAdded();
        } catch (error) {
            console.error("댓글 저장 중 오류 발생:", error);
            Swal.fire('오류!', error.response ? error.response.data : error.message, 'error');
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
        const requestDTO = {
            matchingId: matchingId,
            writerId: memberId,
            content: replyInputs[commentId],
            parentId: commentId
        };
        console.log("답글 작성 요청 DTO:", requestDTO); // 디버깅용 로그 추가
        try {
            await saveReply(requestDTO);
            setReplyInputs({
                ...replyInputs,
                [commentId]: ''
            });
            // 답글을 새로고침하여 업데이트
            fetchComments();
            if (onReplyAdded) onReplyAdded();
        } catch (error) {
            console.error("답글 저장 중 오류 발생:", error);
            Swal.fire('오류!', error.response ? error.response.data : error.message, 'error');
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
    const renderReplies = (replies) => {
        console.log("렌더링 중인 답글 데이터:", replies); // 디버깅용 로그 추가
        return replies.map(reply => (
            <div key={reply.id} className={styles.reply}>
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
                        <div className={styles.replyInputContainer}>
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
                            >
                                답글 작성
                            </button>
                        </div>
                    )}
                    {reply.childReplies && reply.childReplies.length > 0 && renderReplies(reply.childReplies)}
                </div>
            </div>
        ));
    };

    // 댓글 및 답글 렌더링 함수
    const renderComments = (comments) => {
        console.log("렌더링 중인 댓글 데이터:", comments); // 디버깅용 로그 추가
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
                    <div className={styles.replyInputContainer}>
                        <img src={loginState.profileImage || defaultProfile} alt="프로필" className={styles.profileImage} />
                        <textarea
                            className={styles.replyInput}
                            placeholder="댓글은 또 다른 나입니다. 바르고 고운말로 작성해주세요."
                            value={replyInputs[comment.id] || ''}
                            onChange={(e) => handleReplyChange(comment.id, e)}
                        ></textarea>
                        <button
                            className={styles.replyButton}
                            onClick={() => handleReplySubmit(comment.id)}
                        >
                            답글 작성
                        </button>
                    </div>
                )}
                {comment.childReplies && comment.childReplies.length > 0 && renderReplies(comment.childReplies)}
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
                <button className={styles.commentButton} onClick={handleCommentSubmit}>댓글 작성</button>
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
                    type="matching"
                    targetId={matchingId}
                    reporterId={memberId}
                    onClose={() => setIsReportModalOpen(false)}
                />
            )}
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
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
