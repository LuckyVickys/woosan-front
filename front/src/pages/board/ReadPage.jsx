import React, { useState } from "react";

import likeIcon from "../../assets/image/heart_yes.svg";
import likeNoIcon from "../../assets/image/heart_no.svg";
import replyArrow from "../../assets/image/reply_arrow.svg"; // Make sure to include the arrow image
import ReadComponent from "../../components/board/ReadComponent";
import CommentList from "../../components/board/CommentList";

const ReadPage = () => {
  const [replyForms, setReplyForms] = useState({});

  const handleReplyClick = (commentId) => {
    setReplyForms((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    //게시글 상세 조회 컴포넌트 여기부터
    <div style={styles.readPage}>
      <ReadComponent />

      <div style={styles.buttonArea}>
        <button style={styles.prevButton}>이전 글</button>
        <button style={styles.listButton}>목록으로</button>
        <button style={styles.nextButton}>다음 글</button>
      </div>
      <br />
      <CommentList />
    </div>
  );
};

// CSS styles
const styles = {
  buttonArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    fontWeight: "bold", // 글자 진하게
  },
  prevButton: {
    backgroundColor: "transparent",
    border: "1px solid #00B207",
    color: "#00B207",
    borderRadius: "20px",
    padding: "10px 20px",
    marginRight: "10px",
    cursor: "pointer",
  },
  listButton: {
    backgroundColor: "#00B207",
    border: "1px solid #00B207",
    color: "#fff",
    borderRadius: "20px",
    padding: "10px 20px",
    marginRight: "10px",
    cursor: "pointer",
  },
  nextButton: {
    backgroundColor: "transparent",
    border: "1px solid #00B207",
    color: "#00B207",
    borderRadius: "20px",
    padding: "10px 20px",
    cursor: "pointer",
  },

  readPage: {
    maxWidth: "984px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },

};

export default ReadPage;
