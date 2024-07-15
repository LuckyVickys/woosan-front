import React, { useState, useEffect } from "react";
import { getRankingChanges } from "../../api/boardApi";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import '../../assets/styles/App.scss';

const RankingList = () => {
    const [rankings, setRankings] = useState([]);

    useEffect(() => {
        getRankingChanges().then(data => {
            console.log(data);
            setRankings(data);
        }).catch(err => {
            console.error("Failed to fetch rankings:", err);
        });
    }, []);

    return (
        <div className="real-time-rankings">
            {rankings.length > 0 && (
                <div className="slide">
                    {rankings.map((item, index) => (
                        <div key={index} className="ranking-item">
                            <span className="rank-number">{item.rank}</span> {item.keyword}
                            {item.change === "+" && <FaSortUp className="icon-up" />}
                            {item.change === "-" && <FaSortDown className="icon-down" />}
                            {item.change === " " && " "}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RankingList;
