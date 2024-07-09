import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/styles/matching/ReplySection.module.scss';

const ReplySection = ({ replies }) => {
    return (
        <div className={styles.replySection}>
            {replies && replies.length > 0 ? (
                replies.map(reply => (
                    <div key={reply.id} className={styles.reply}>
                        <div className={styles.replyHeader}>
                            <span className={styles.replyWriter}>{reply.memberId}</span>
                            <span className={styles.replyDate}>{new Date(reply.createdDate).toLocaleString()}</span>
                        </div>
                        <p className={styles.replyContent}>{reply.content}</p>
                    </div>
                ))
            ) : (
                <p>대댓글이 없습니다.</p>
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
    }))
};

export default ReplySection;
