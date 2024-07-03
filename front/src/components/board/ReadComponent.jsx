import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import likeNoIcon from "../../assets/image/heart_no.svg";
import likeIcon from "../../assets/image/heart_yes.svg";
import "../../assets/styles/App.scss";
import { getBoard, getOne, translate } from "../../api/boardApi";
import { toggleLike } from "../../api/likesApi";
import useCustomMove from "../../hooks/useCustomMove.jsx";
import BoardDropDown from "./BoardDropDown.jsx";
import PageComponent from "../../components/board/PageComponent";

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
  const [liked, setLiked] = useState(false);
  const [showBoardMenu, setShowBoardMenu] = useState(false);
  const boardMenuRef = useRef(null);
  const { page, size, categoryName, moveToList } = useCustomMove();

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


  const handleLikeToggle = async () => {
    try {
      const toggleRequest = {
        memberId: 1, // 예: 현재 로그인된 사용자의 ID
        type: "게시물", // 예: 좋아요의 대상 타입
        targetId: id, // 현재 게시물의 ID
      };
      await toggleLike(toggleRequest);
      setLiked(!liked);
      setBoard((prevBoard) => ({
        ...prevBoard,
        likesCount: liked ? prevBoard.likesCount - 1 : prevBoard.likesCount + 1,
      }));
    } catch (error) {
      console.error("Failed to toggle like", error);
    }
  };

  useEffect(() => {
    getBoard(id).then((data) => {
      console.log(data);
      setBoard(data);
      setLiked(data.liked); // 서버에서 사용자가 좋아요를 눌렀는지 여부를 받아와야 합니다.
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
          <button
            className={`like-button ${liked ? "liked" : "not-liked"}`}
            onClick={handleLikeToggle}
          >
            <span role="img" aria-label="like">
              <img
                src={liked ? likeIcon : likeNoIcon}
                className="likeIcon"
                alt="likeIcon"
              />
            </span>{" "}
            {board.likesCount}
          </button>
          <button className="menu-button" ref={boardMenuRef}>
            ⋮
            {showBoardMenu && <BoardDropDown id={id} onSelect={handleBoardMenuSelect} />}
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
      {/* <PageComponent /> */}
    </>
  );
};

export default ReadComponent;
