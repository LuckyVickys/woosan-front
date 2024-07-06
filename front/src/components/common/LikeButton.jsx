import React, { useState, useEffect } from "react";
import likeNoIcon from "../../assets/image/heart_no.svg";
import likeIcon from "../../assets/image/heart_yes.svg";
import { toggleLike, getLikes } from "../../api/likesApi";
import '../../assets/styles/App.scss';

const LikeButton = ({ memberId, type, targetId, initialLikesCount }) => {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(initialLikesCount);

    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const toggleRequest = {
                    memberId,
                    type,
                    targetId
                };
                const likeStatus = await getLikes(toggleRequest);
                setLiked(likeStatus);
            } catch (error) {
                console.error("Error fetching like status:", error);
            }
        };
        fetchLikeStatus();
    }, [memberId, type, targetId]);

    const handleLikeToggle = async () => {
        try {
            const toggleRequest = {
                // memberId,
                memberId: 1,
                type,
                targetId
            };
            await toggleLike(toggleRequest);
            setLiked((prevLiked) => {
                setLikesCount((prevLikesCount) => prevLiked ? prevLikesCount - 1 : prevLikesCount + 1);
                return !prevLiked;
            });
        } catch (error) {
            console.error("Failed to toggle like", error);
        }
    };

    return (
        <button className={`like-button ${liked ? "liked" : "not-liked"}`} onClick={handleLikeToggle}>
            <span role="img" aria-label="like">
                <img src={liked ? likeIcon : likeNoIcon} alt="likeIcon" className="likeIcon"/>
            </span>{" "}
            {likesCount}
        </button>
    );
};

export default LikeButton;
