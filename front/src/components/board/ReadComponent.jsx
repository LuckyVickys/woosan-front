import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import likeNoIcon from "../../assets/image/heart_no.svg";
import likeIcon from "../../assets/image/heart_yes.svg";
import "../../assets/styles/App.scss";
import { getOne, translate } from "../../api/boardApi";
import useCustomMove from "../../hooks/useCustomMove.jsx";
import BoardDropDown from "./BoardDropDown.jsx";

const initState = {
  id: 0,
  writerId: 0,
  nickname: "",
  title: "",
  content: "",
  regDate: "",
  views: 0,
  likesCount: 0,
  categoryName: "",
  images: null,
  filePathUrl: [],
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const ReadComponent = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(initState);
  const { moveToRead, categoryName } = useCustomMove();

  const [showBoardMenu, setShowBoardMenu] = useState(false);
  const boardMenuRef = useRef(null);

  const handleBoardMenuSelect = useCallback((boardMenu) => {
    console.log("Selected Board Menu:", boardMenu);
    setShowBoardMenu(false);
  }, []);

  const handleClick = useCallback((event) => {
    if (boardMenuRef.current && boardMenuRef.current.contains(event.target)) {
      setShowBoardMenu(!showBoardMenu);
    } else {
      setShowBoardMenu(false);
    }
  }, [showBoardMenu]);

  useEffect(() => {
    getOne(id).then((data) => {
      console.log(data);
      setBoard(data);
    });
  }, [id]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);

  const handlePapagoTranslate = async () => {
    try {
      const translated = await translate(id, { title: board.title, content: board.content });
      setBoard((prevBoard) => ({
        ...prevBoard,
        title: translated.title,
        content: translated.content,
      }));
    } catch (error) {
      console.error("번역 중 오류 발생:", error);
    }
  };
  if (!board.title) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <div className="post-title">
        <h1 className="post-title-text">{board.title}</h1>
        <div className="api-button">
          <button className="papago-button" onClick={handlePapagoTranslate}></button>
          <button className="clova-button"></button>
        </div>
      </div>
      <div className="board-header">
        <div className="left">
          <img
            src="https://kr.object.ncloudstorage.com/woosan/board/83435d0d-3965-4448-9a76-272efc3b370e_karina.png"
            alt="프로필"
            className="profile-image"
          />
          <div className="author-info">
            <p className="post-author">
              <strong>작성자 :</strong> {board.nickname} | &nbsp; 조회수{" "}
              {board.views} | 댓글 5 | {formatDate(board.regDate)}
            </p>
          </div>
        </div>
        <div className="right">
          <button className="like-button">
            <span role="img" aria-label="like">
              <img src={likeNoIcon} alt="likeIcon" />
            </span>{" "}
            {board.likesCount}
          </button>
          <button className="menu-button" ref={boardMenuRef}>
            ⋮
            {showBoardMenu && <BoardDropDown onSelect={handleBoardMenuSelect} />}
          </button>
        </div>
      </div>
      <p className="alert-message">
        ※ 상대방을 향한 욕설과 비난은 게시판 이용에 있어서 불이익을 받을 수 있습니다.
      </p>
      <div className="post-content">
        {board.content}
        <div className="image-container">
          {board.filePathUrl.map((url, index) => (
            <img key={index} src={url} alt={`image-${index}`} className="image" />
          ))}
        </div>
      </div>
    </>
  );
};

export default ReadComponent;
