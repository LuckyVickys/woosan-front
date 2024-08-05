import React from "react";
import NoticeReadComponent from "../../../components/cs/NoticeReadComponent";
import ReplyComponent from "../../../components/board/ReplyComponent";
import "../../../assets/styles/App.scss";
import useCustomMove from "../../../hooks/useCustomMove";

const ReadPage = () => {
    const { moveToList } = useCustomMove("/cs/notices");

    return (
        <div className="readPage">
            <NoticeReadComponent moveToList={moveToList} />
            <br />
            <ReplyComponent />
        </div>
    );
};

export default ReadPage;
