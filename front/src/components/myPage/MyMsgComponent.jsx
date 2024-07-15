import React, { useEffect, useState } from "react";
import ListPageComponent from "../board/element/ListPageComponent";
import TableRowComponent from "../board/element/TableRowComponent";
import { TiDelete } from "react-icons/ti";
import "../../assets/styles/App.scss";

const initState = {
    
};

const MyMsgComponent = ({ onMsgClick }) => {
    const [msgData, setMsgData] = useState(initState);


    const handleMsgClick = (id) => {
        console.log("HandleMsgClick:", id);
        onMsgClick(id);
    };

    const handleMsgDelete = (id) => {
        console.log("HandleMsgDelete:", id);
    };

    return (
        <div className="list-component">
            <table className="list-table">
                <thead>
                    <tr>
                        <th>발신자</th>
                        <th>내용</th>
                        <th>작성 날짜</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    <tr onClick={handleMsgClick}>
                        <th>관리자</th>
                        <th>[답변]안녕하세요. 관리자입니다. 지난번에 문의주신 내용에 대해 답변드립니다...</th>
                        <th>2024-06-18 14:16</th>
                        <th><TiDelete className="delete-icon" onClick={handleMsgDelete} /></th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MyMsgComponent;