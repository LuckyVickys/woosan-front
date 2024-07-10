import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { saveReply } from '../../api/matchingBoardReplyApi';
import styles from '../../assets/styles/matching/ReplySection.module.scss';

const ReplySection = ({ replies, parentId, onReplyAdded }) => {
    const [replyInputs, setReplyInputs] = useState({});
    const [showReplyInput, setShowReplyInput] = useState({});

    const handleReplyChange = (replyId, e) => {
        setReplyInputs({
            ...replyInputs,
            [replyId]: e.target.value
        });
    };

    const handleReplySubmit = async (replyId) => {
        const requestDTO = {
            matchingBoardId: parentId,
            memberId: 25, // 현재 로그인한 사용자 ID로 변경 필요
            content: replyInputs[replyId],
            parentId: replyId
        };
        try {
            await saveReply(requestDTO);
            setReplyInputs({
                ...replyInputs,
                [replyId]: ''
            });
            onReplyAdded();
        } catch (error) {
            console.error("답글 저장 중 오류 발생:", error);
            alert('답글 저장 중 오류가 발생했습니다.');
        }
    };

    const toggleReplyInput = (replyId) => {
        setShowReplyInput({
            ...showReplyInput,
            [replyId]: !showReplyInput[replyId]
        });
    };

    return (
        <div className={styles.replySection}>
            {replies && replies.length > 0 && (
                replies.map(reply => (
                    <div key={reply.id} className={styles.reply}>
                        <div className={styles.replyHeader}>
                            <span className={styles.replyWriter}>{reply.memberId}</span>
                            <span className={styles.replyDate}>{new Date(reply.createdDate).toLocaleString()}</span>
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
                        {reply.replies && (
                            <ReplySection 
                                replies={reply.replies} 
                                parentId={reply.id} 
                                onReplyAdded={onReplyAdded} 
                            />
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

ReplySection.propTypes = {
    replies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        memberId: PropTypes.string.isRequired,
        createdDate: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        replies: PropTypes.array
    })),
    parentId: PropTypes.number.isRequired,
    onReplyAdded: PropTypes.func.isRequired
};

export default ReplySection;
