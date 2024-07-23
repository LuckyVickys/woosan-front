import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../assets/styles/App.scss";
import { getBoard, translate } from "../../api/boardApi";
import { summary } from "../../api/summaryApi";
import BoardDropDown from "../../components/board/element/BoardDropDown.jsx";
import ListButton from "../../components/board/element/ListButton.jsx";
import { formatDate } from "../../util/DateUtil.jsx";
import LikeButton from "../../components/common/LikeButton";
import { FaComment } from "react-icons/fa";
import ReportModal from "./element/ReportModal.jsx";
import MsgModal from "../../components/board/element/MsgModal";
import { convertLineBreaks } from "../../util/convertUtil";
import defaultProfile from "../../assets/image/profile.png";
import Swal from "sweetalert2";
import useCustomLogin from "../../hooks/useCustomLogin.jsx";
import LoginModal from "../member/LoginModal.jsx";

const initState = {
  id: 0,
  writerId: 0,
  nickname: "",
  writerProfile: "",
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
  const loginState = useSelector((state) => state.loginSlice);
  const [userId, setUserId] = useState(null);
  const { id } = useParams();

  const [board, setBoard] = useState(initState);
  const [summarizedBoard, setSummarizedBoard] = useState(null);
  const [showBoardMenu, setShowBoardMenu] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [openMsgModal, setOpenMsgModal] = useState(false);
  const boardMenuRef = useRef(null);
  const type = "board";

  // 혜리 추가 - 로그인 하지 않았을 때 addPage로 이동하지 못하게
  const { isLogin, moveToLoginReturn, isLoginModalOpen, closeLoginModal } =
    useCustomLogin();

  useEffect(() => {
    if (loginState.id) {
      setUserId(loginState.id);
    }
  }, [loginState.id]);

  useEffect(() => {
    getBoard(id).then((data) => {
      const contentWithLineBreaks = convertLineBreaks(data.content);
      setBoard({ ...data, content: contentWithLineBreaks });
    });
  }, [id]);

  const handlePapagoTranslate = async () => {
    try {
      const translated = await translate(id, {
        title: board.title,
        content: board.content,
      });
      setBoard((prevBoard) => ({
        ...prevBoard,
        title: translated.title,
        content: convertLineBreaks(translated.content),
      }));
      Swal.fire({
        icon: "success",
        title: "번역 완료",
        text: `게시글 번역이 완료되었습니다.`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
    } catch (error) {
      console.error("번역 중 오류 발생:", error);
    }
  };

  const handleClovaSummary = async () => {
    try {
      const summarized = await summary(id, {
        title: board.title,
        content: board.content,
      });
      setSummarizedBoard({ content: summarized });
      Swal.fire({
        icon: "success",
        title: "요약 완료",
        html: `게시글 요약이 완료되었습니다. <br> 게시글 하단을 확인해주세요.`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "요약 실패",
        text: "요약할 수 없는 게시글입니다.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
      console.error("요약 중 오류 발생:", error);
    }
  };

  const handleBoardMenuSelect = () => {
    if (!isLogin) {
      Swal.fire({
        title: "로그인이 필요한 서비스입니다.",
        icon: "error",
        confirmButtonText: "확인",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          moveToLoginReturn();
        }
      });
      setShowBoardMenu(showBoardMenu);
    } else {
      setShowBoardMenu(!showBoardMenu);
    }
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
      if (
        boardMenuRef.current &&
        !boardMenuRef.current.contains(event.target)
      ) {
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

  const profileSrc =
    board.writerProfile && board.writerProfile.length > 0
      ? board.writerProfile
      : defaultProfile;

  return (
    <>
      <div className="post-title">
        <h1 className="post-title-text">{board.title}</h1>
        <div className="api-button">
          <button
            className="papago-button"
            onClick={handlePapagoTranslate}
          ></button>
          <button
            className="clova-button"
            onClick={handleClovaSummary}
          ></button>
        </div>
      </div>
      <div className="board-header">
        <div className="left">
          <div className="author-info">
            <p className="post-author">
              <img src={profileSrc} alt="프로필" className="profile-image" />
              {board.nickname} | &nbsp; 조회수 {board.views} | 댓글{" "}
              {board.replyCount} | {formatDate(board.regDate)}
            </p>
          </div>
        </div>
        <div className="right">
          <LikeButton
            className="like-button"
            memberId={userId}
            type="게시물"
            targetId={id}
            initialLikesCount={board.likesCount}
          />
          <FaComment className="replyIcon" /> {board.replyCount}
          <button
            className="menu-button"
            onClick={handleBoardMenuSelect}
            ref={boardMenuRef}
          >
            ⋮
            {showBoardMenu && (
              <BoardDropDown
                id={id}
                onSelect={handleBoardMenuSelect}
                openReport={openReport}
                openMsg={openMsg}
                showReportButton={userId !== board.writerId}
                showMsgButton={userId !== board.writerId}
                showModifyButton={userId === board.writerId}
              />
            )}
          </button>
        </div>
      </div>
      <p className="alert-message">
        ※ 상대방을 향한 욕설과 비난은 게시판 이용에 있어서 불이익을 받을 수
        있습니다.
      </p>
      <div className="post-content">
        <div dangerouslySetInnerHTML={{ __html: board.content }}></div>
        <br />
        <br />
        {summarizedBoard && (
          <div className="summary-content" id="result">
            <div className="summary-state">요약 완료</div>
            <div
              dangerouslySetInnerHTML={{ __html: summarizedBoard.content }}
            ></div>
          </div>
        )}
        <div className="image-container">
          {board.filePathUrl.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`image-${index}`}
              className="image"
            />
          ))}
        </div>
      </div>
      <ListButton />
      {openMsgModal && (
        <MsgModal
          senderId={userId}
          receiver={board.nickname}
          onClose={closeMsg}
        />
      )}
      {openReportModal && (
        <ReportModal
          type={type}
          targetId={board.id}
          reporterId={userId}
          onClose={closeReport}
        />
      )}
      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
    </>
  );
};

export default ReadComponent;
