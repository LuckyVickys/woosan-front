import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../../assets/styles/App.scss";
import { getBoard, translate } from "../../api/boardApi";
import { summary } from "../../api/summaryApi";
import BoardDropDown from "../../components/board/element/BoardDropDown.jsx";
import PageComponent from "../../components/board/element/PageComponent.jsx";
import { formatDate } from "../../util/DateUtil.jsx";
import LikeButton from "../../components/common/LikeButton";
import { FaComment } from "react-icons/fa";
import ReportModal from "./element/ReportModal.jsx";
import MsgModal from "../../components/board/element/MsgModal";

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
  const [userId, setUserId] = useState(3); // 로그인한 사용자 id(임시)

  const { id } = useParams();

  const [board, setBoard] = useState(initState);
  const [summarizedBoard, setSummarizedBoard] = useState(null);
  const [showBoardMenu, setShowBoardMenu] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [openMsgModal, setOpenMsgModal] = useState(false);
  const boardMenuRef = useRef(null);
  const type="board";

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

  const handleClovaSummary = async () => {
    try {
      const summarized = await summary(id, { title: board.title, content: board.content });
      console.log("요약 중: ", summarized);
      setSummarizedBoard({ content: summarized});
    } catch (error) {
      console.error("요약 중 오류 발생:", error);
    }
  };


  const handleBoardMenuSelect = () => {
    setShowBoardMenu(!showBoardMenu);
  };

  const openReport = () => {
    setOpenReportModal(true);
    setOpenMsgModal(false);
    setShowBoardMenu(false);
  };

  const closeReport = () => {
    setOpenReportModal(false);
    setOpenMsgModal(false);
    setShowBoardMenu(false);
  };

  const openMsg = () => {
    setOpenReportModal(false);
    setOpenMsgModal(true);
    setShowBoardMenu(false);
  };

  const closeMsg = () => {
    setOpenReportModal(false);
    setOpenMsgModal(false);
    setShowBoardMenu(false);
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
          <button className="clova-button" onClick={handleClovaSummary}></button>
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
              {board.views} | 댓글 {board.replyCount} | {formatDate(board.regDate)}
            </p>
          </div>
        </div>
        <div className="right">
          <LikeButton 
            className="like-button"
            memberId={1}
            type="게시물"
            targetId={id}
            initialLikesCount={board.likesCount}
          />
          <FaComment className="replyIcon" /> {board.replyCount}
          <button className="menu-button" onClick={handleBoardMenuSelect} ref={boardMenuRef}>
            ⋮
            {showBoardMenu && <BoardDropDown id={id} onSelect={handleBoardMenuSelect} openReport={openReport} openMsg={openMsg} />}
          </button>
        </div>
      </div >
      <p className="alert-message">
        ※ 상대방을 향한 욕설과 비난은 게시판 이용에 있어서 불이익을 받을 수 있습니다.
      </p>
      <div className="post-content">
        {board.content}
        <br/>
        <br/>
        {summarizedBoard && (
          <div className="summary-content"  id="result">
            <div className="summary-state">요약 완료</div>
            {summarizedBoard.content}
          </div>
        )}
        <div className="image-container">
          {board.filePathUrl.map((url, index) => (
            <img key={index} src={url} alt={`image-${index}`} className="image" />
          ))}
        </div>
      </div>
      <PageComponent />
      {openMsgModal && <MsgModal senderId={userId} receiver={board.writerId} nickname={board.nickname} onClose={closeMsg}/> }
      {openReportModal && <ReportModal type={type} targetId={board.id} reportId={userId} reportedId={board.writerId} reportednickname={board.nickname} onClose={closeReport}/> }
    </>
  );
};

export default ReadComponent;
