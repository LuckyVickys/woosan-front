import React from 'react';

const CommentDropDown = ({commentId, replyId, onSelect}) => {
    if (commentId) {
        console.log("Selected commentId:", commentId);
    } else {
        console.log("Selected replyId:", replyId);
    }

    return (
        <div className="comment-dropdown-wrapper">
            <div className="comment-dropdown-list">
                <div className='comment-dropdown' onClick={() => onSelect("report")}>
                    <div className='comment-report-icon'></div>
                    <div className='comment-report-text'>신고하기</div>
                </div>
                <div className='comment-dropdown' onClick={() => onSelect("msg")}>
                    <div className='comment-msg-icon'></div>
                    <div className='comment-msg-text'>쪽지 전송</div>
                </div>
                <div className='comment-dropdown' onClick={() => onSelect("delete")}>
                    <div className='comment-delete-icon'></div>
                    <div className='comment-delete-text'>삭제하기</div>
                </div>
            </div>
        </div>
      );
}

export default CommentDropDown;