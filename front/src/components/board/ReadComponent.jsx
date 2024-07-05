import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../../assets/styles/App.scss";
import { getBoard, translate } from "../../api/boardApi";
import BoardDropDown from "../../components/board/element/BoardDropDown.jsx";
import PageComponent from "../../components/board/element/PageComponent.jsx";
import { formatDate } from "../../util/DateUtil.jsx";
import LikeButton from "../../components/common/LikeButton";
import { FaComment } from "react-icons/fa";

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

const ReadComponent = () => {
  const { id } = useParams();

  const [board, setBoard] = useState(initState);
  const [showBoardMenu, setShowBoardMenu] = useState(false);
  const boardMenuRef = useRef(null);

  useEffect(() => {
    getBoard(id).then((data) => {
      console.log(data);
      setBoard(data);
    });
  }, [id]);

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


  const handleBoardMenuSelect = () => {
    setShowBoardMenu(!showBoardMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boardMenuRef.current && !boardMenuRef.current.contains(event.target)) {
        setShowBoardMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              {board.nickname} | &nbsp; 조회수{" "}
              {board.views} | 댓글 5 | {formatDate(board.regDate)}
            </p>
          </div>
        </div>
        <div className="right">
          <LikeButton className="likeIcon"
            memberId={1}
            type="게시물"
            targetId={id}
            initialLikesCount={board.likesCount}
          />
          <FaComment className="replyIcon" /> {board.replyCount}
          <button className="menu-button" onClick={handleBoardMenuSelect} ref={boardMenuRef}>
            ⋮
            {showBoardMenu && <BoardDropDown id={id} onSelect={handleBoardMenuSelect} />}
          </button>
        </div>
      </div >
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
      <PageComponent />
    </>
  );
};

export default ReadComponent;
