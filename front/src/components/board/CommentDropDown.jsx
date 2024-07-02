import React from 'react';

const CommentDropDown = (onSelect) => {

    return (
        <div className="comment-dropdown-wrapper">
            <div className="comment-dropdown-list">
                <div className='comment-dropdown'>
                    <div className='comment-report-icon'></div>
                    <div className='comment-report-text'>신고하기</div>
                </div>
                <div className='comment-dropdown'>
                    <div className='comment-msg-icon'></div>
                    <div className='comment-msg-text'>쪽지 전송</div>
                </div>
                <div className='comment-dropdown'>
                    <div className='comment-delete-icon'></div>
                    <div className='comment-delete-text'>삭제하기</div>
                </div>
            </div>
        </div>
      );
}

export default CommentDropDown;