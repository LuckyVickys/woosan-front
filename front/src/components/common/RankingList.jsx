import React, { useState, useEffect } from "react";
import { getRankingChanges } from "../../api/boardApi";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { CgLoadbar } from "react-icons/cg";
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
                            {item.change === "+" && <ImArrowUp className="icon-up" />}
                            {item.change === "-" && <ImArrowDown className="icon-down" />}
                            {item.change === "_" && <CgLoadbar className="icon-non" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RankingList;
