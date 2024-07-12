import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Redux의 useSelector 훅 사용
import likeNoIcon from "../../assets/image/heart_no.svg";
import likeIcon from "../../assets/image/heart_yes.svg";
import { toggleLike, getLikes } from "../../api/likesApi";
import '../../assets/styles/App.scss';

const LikeButton = ({ type, targetId, initialLikesCount }) => {
    const loginState = useSelector((state) => state.loginSlice);
    const memberId = loginState.id;

    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(initialLikesCount);

    useEffect(() => {
        if (!memberId) return;

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
        if (!memberId) {
            console.error("User is not logged in");
            return;
        }

        try {
            const toggleRequest = {
                memberId,
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
                <img src={liked ? likeIcon : likeNoIcon} alt="likeIcon" className="likeIcon" />
            </span>{" "}
            {likesCount}
        </button>
    );
};

export default LikeButton;
