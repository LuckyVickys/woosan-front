import React from "react";
import ReadComponent from "../../components/board/ReadComponent";
import CommentList from "../../components/board/CommentList";

import "../../assets/styles/App.scss";
import useCustomMove from "../../hooks/useCustomMove";


const ReadPage = () => {
  const { moveToList } = useCustomMove();

  return (
    // 게시글 상세 조회 컴포넌트 여기부터
    <div className="readPage">
      <ReadComponent />
      <br />
      <CommentList />
    </div>
  );
};

export default ReadPage;
