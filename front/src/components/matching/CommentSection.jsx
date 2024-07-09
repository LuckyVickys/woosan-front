import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getReplies, saveReply } from '../../api/matchingBoardReplyApi';
import ReplySection from './ReplySection';
import styles from '../../assets/styles/matching/CommentSection.module.scss';

const CommentSection = ({ matchingId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyMap, setReplyMap] = useState({});

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await getReplies(matchingId, { page: 0, size: 10 }); // 페이지네이션 예시
                setComments(res.content);
                // Fetch replies for each comment
                for (const comment of res.content) {
                    const replyRes = await getReplies(comment.id);
                    setReplyMap((prevReplyMap) => ({
                        ...prevReplyMap,
                        [comment.id]: replyRes
                    }));
                }
            } catch (error) {
                console.error("댓글을 가져오는 중 오류 발생:", error);
            }
        };
        fetchComments();
    }, [matchingId]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        const requestDTO = {
            matchingBoardId: matchingId,
            memberId: 999, // 현재 로그인한 사용자 ID로 변경 필요
            content: newComment
        };
        try {
            await saveReply(requestDTO);
            setNewComment('');
            const res = await getReplies(matchingId, { page: 0, size: 10 });
            setComments(res.content);
            alert('댓글이 성공적으로 저장되었습니다.');
        } catch (error) {
            console.error("댓글 저장 중 오류 발생:", error);
            alert('댓글 저장 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className={styles.commentSection}>
            <h3>댓글</h3>
            {comments.length > 0 ? (
                comments.map(comment => (
                    <div key={comment.id} className={styles.comment}>
                        <div className={styles.commentHeader}>
                            <span className={styles.commentWriter}>{comment.memberId}</span>
                            <span className={styles.commentDate}>{new Date(comment.createdDate).toLocaleString()}</span>
                        </div>
                        <p className={styles.commentContent}>{comment.content}</p>
                        <ReplySection replies={replyMap[comment.id]} />
                    </div>
                ))
            ) : (
                <p>댓글이 없습니다.</p>
            )}
            <div className={styles.commentInputContainer}>
                <textarea 
                    className={styles.commentInput} 
                    placeholder="댓글을 입력하세요" 
                    value={newComment}
                    onChange={handleCommentChange}
                ></textarea>
                <button className={styles.commentButton} onClick={handleCommentSubmit}>댓글 작성</button>
            </div>
        </div>
    );
}

CommentSection.propTypes = {
    matchingId: PropTypes.number.isRequired
};

export default CommentSection;
