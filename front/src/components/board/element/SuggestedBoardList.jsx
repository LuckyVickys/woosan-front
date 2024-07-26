import React from "react";
import useCustomMove from "../../../hooks/useCustomMove";
import { formatDateMin } from "../../../util/DateUtil";
import { FaComment, FaHeart } from "react-icons/fa";

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
                        <p className="categoryName">{post.categoryName}</p>
                        <p className="title">{slicedTitle(post.title)}</p>
                        <p className="regDate">{formatDateMin(post.regDate)}</p>

                        <FaHeart className="likesIcon" /><div className="likesCount">{post.likesCount}</div>
                        <FaComment className="replyIcon" /> <div className="replyCount">{post.replyCount}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuggestedBoardList;
