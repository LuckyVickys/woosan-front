import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getDailyBest } from "../../api/boardApi";
import useCustomMove from "../../hooks/useCustomMove";
import "../../assets/styles/App.scss";

const DailyBestBoardList = ({ pageType }) => {
    const [dailyBest, setDailyBest] = useState([]);
    const location = useLocation();
    const { moveToRead } = useCustomMove();


    const slicedText = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.slice(0, maxLength) + '...';
        } else {
            return str;
        }
    }

    // 일별 인기글 데이터 가져오기
    useEffect(() => {
        const fetchDailyBest = async () => {
            try {
                const data = await getDailyBest();
                setDailyBest(data);
            } catch (error) {
                console.error("Failed to fetch daily best posts", error);
            }
        };

        fetchDailyBest();
    }, [location]);

    return (
        <div className="daily-best">
            <div className="daily-best-title">주간 Top</div>
            {dailyBest.map((post, index) => (
                <div key={post.id} className="daily-best-item" onClick={() => moveToRead(post.id)}>
                    <span className="daily-best-rank">{index + 1}</span>
                    <span className="daily-best-text">{slicedText(post.title, 15)}</span>
                    <span className="daily-best-reply-count">{post.replyCount}</span>
                </div>
            ))}
        </div>
    )
}
export default DailyBestBoardList;