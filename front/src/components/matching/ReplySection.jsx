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

const ReplySection = ({ matchingId, parentId = null, onReplyAdded }) => {
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
        const fetchComments = async () => {
            try {
                const res = await getReplies(matchingId, { page: currentPage - 1, size: 10 });
                setComments(res.content);
                setTotalPages(res.totalPages);
            } catch (error) {
                console.error("댓글을 가져오는 중 오류 발생:", error);
            }
        };
        fetchComments();
    }, [matchingId, currentPage]);

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
        console.log("Request DTO:", requestDTO); // 디버그용 로그 추가
        try {
            await saveReply(requestDTO);
            setNewComment('');
            const res = await getReplies(matchingId, { page: currentPage - 1, size: 10 });
            setComments(res.content);
            setTotalPages(res.totalPages);
            if (onReplyAdded) onReplyAdded();
            alert('댓글이 성공적으로 저장되었습니다.');
        } catch (error) {
            console.error("댓글 저장 중 오류 발생:", error);
            alert('댓글 저장 중 오류가 발생했습니다.');
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
        console.log("Request DTO:", requestDTO); // 디버그용 로그 추가
        try {
            await saveReply(requestDTO);
            setReplyInputs({
                ...replyInputs,
                [commentId]: ''
            });
            const res = await getReplies(matchingId, { page: currentPage - 1, size: 10 });
            setComments(res.content);
            setTotalPages(res.totalPages);
            if (onReplyAdded) onReplyAdded();
            alert('답글이 성공적으로 저장되었습니다.');
        } catch (error) {
            console.error("답글 저장 중 오류 발생:", error);
            alert('답글 저장 중 오류가 발생했습니다.');
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
        const res = await getReplies(matchingId, { page: currentPage - 1, size: 10 });
        setComments(res.content);
        setTotalPages(res.totalPages);
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
        return replies.map(reply => (
            <div key={reply.id} className={styles.reply}>
                <div className={styles.commentHeader}>
                    <div className={styles.commentWriterInfo}>
                        <img src={reply.writerProfileImage || defaultProfile} alt="프로필" className={styles.profileImage} />
                        <span className={styles.commentWriter}>{reply.writerNickname}</span>
                    </div>
                    <div className={styles.commentActions}>
                        <span className={styles.commentDate}>
                            {formatRelativeTime(reply.regDate)}
                        </span>
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
                                        openMsg={() => openMsg(reply.writerNickname)}
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
                            placeholder="답글을 입력하세요"
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
                {reply.childReplies && renderReplies(reply.childReplies)}
            </div>
        ));
    };

    // 댓글 및 답글 렌더링 함수
    const renderComments = (comments) => {
        return comments.map(comment => (
            <div key={comment.id} className={styles.comment}>
                <div className={styles.commentHeader}>
                    <div className={styles.commentWriterInfo}>
                        <img src={comment.writerProfileImage || defaultProfile} alt="프로필" className={styles.profileImage} />
                        <span className={styles.commentWriter}>{comment.writerNickname}</span>
                    </div>
                    <div className={styles.commentActions}>
                        <span className={styles.commentDate}>
                            {formatRelativeTime(comment.regDate)}
                        </span>
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
                                        openMsg={() => openMsg(comment.writerNickname)}
                                        onDeleteSuccess={handleReplyAdded}
                                        showDeleteButton={memberId === comment.writerId}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <p className={styles.commentContent}>{comment.content}</p>
                {comment.childReplies && renderReplies(comment.childReplies)}
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
                            placeholder="답글을 입력하세요"
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
            </div>
        ));
    };

    return (
        <div className={styles.commentSection}>
            <h3>댓글</h3>
            {comments.length > 0 ? renderComments(comments) : <p>댓글이 없습니다.</p>}
            <div className={styles.commentInputContainer}>
                <img src={loginState.profileImage || defaultProfile} alt="프로필" className={styles.profileImage} />
                <textarea
                    className={styles.commentInput}
                    placeholder="댓글을 입력하세요"
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
    onReplyAdded: PropTypes.func
};

export default ReplySection;
