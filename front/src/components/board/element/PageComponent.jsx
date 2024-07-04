import React from "react";
import "../../../assets/styles/App.scss";
import { useParams } from "react-router-dom";
import useCustomMove from "../../../hooks/useCustomMove";

const PageComponent = ({ serverData }) => {
    const { id } = useParams();
    const { moveToList, moveToRead } = useCustomMove();
    const currentId = parseInt(id);

    console.log("####" + serverData)


    const findCurrentIndex = () => {
        // return serverData.boardPage.dtoList.findIndex(item => item.id === currentId);
    }

    const handlePrevPost = () => {
        const currentIndex = findCurrentIndex();
        if (currentIndex > 0) {
            const prevPost = serverData.dtoList[currentIndex - 1];
            moveToRead(prevPost.id);
        } else {
            alert("이전 글이 없습니다.");
        }
    }

    const handleNextPost = () => {
        const currentIndex = findCurrentIndex();
        if (currentIndex < serverData.dtoList.length - 1) {
            const nextPost = serverData.dtoList[currentIndex + 1];
            moveToRead(nextPost.id);
        } else {
            alert("다음 글이 없습니다.");
        }
    }

    return (
        <div className="movePostButton">
            <button className="prevPostButton" onClick={handlePrevPost}>
                <span className="icon">&lt;</span> 이전 글
            </button>
            <button className="listButton" onClick={() => moveToList()}>
                목록으로
            </button>
            <button className="nextPostButton" onClick={handleNextPost}>
                다음 글 <span className="icon">&gt;</span>
            </button>
        </div>
    );
};

export default PageComponent;
