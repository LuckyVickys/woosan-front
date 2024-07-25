import React from "react";
import useCustomMove from "../../../hooks/useCustomMove";

const SuggestedBoardList = ({ suggestedBoards }) => {
    const { moveToRead } = useCustomMove();
    const slicedTitle = (str, maxLength = 20) => {
        if (str.length > maxLength) {
            return str.slice(0, maxLength) + '...';
        } else {
            return str;
        }
    }

    const slicedContent = (str, maxLength = 20) => {
        if (str.length > maxLength) {
            return str.slice(0, maxLength) + '...';
        } else {
            return str;
        }
    }

    return (
        <div className="suggested-list">
            <div className="category-title">연관 게시물</div>
            <div className="suggested-list-items">
                {suggestedBoards.map((post) => (
                    <div key={post.id} className="suggested-item" onClick={() => moveToRead(post.id)}>
                        <p className="title">{slicedTitle(post.title)}</p>
                        <p className="content">{slicedContent(post.content)}</p>
                        <p className="replyCount">{post.replyCount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuggestedBoardList;
