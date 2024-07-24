import React from "react";
import ReadComponent from "../../components/board/ReadComponent";
import ReplyComponent from "../../components/board/ReplyComponent";
import "../../assets/styles/App.scss";
import useCustomMove from "../../hooks/useCustomMove";


const ReadPage = () => {
  const { moveToList } = useCustomMove();

  return (
    <div className="readPage">
      <ReadComponent />
      <ReplyComponent />
    </div>
  );
};

export default ReadPage;
