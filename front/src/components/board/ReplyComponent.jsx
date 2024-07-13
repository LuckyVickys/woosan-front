import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import replyArrow from "../../assets/image/reply_arrow.png";
import '../../assets/styles/App.scss';
import { getList, addReply } from "../../api/replyApi";
import ReplyDropDown from "./element/ReplyDropDown.jsx";
import { formatRelativeTime } from "../../util/DateUtil.jsx";
import ListPageComponent from "../../components/board/element/ListPageComponent";
import LikeButton from "../../components/common/LikeButton";
import ReportModal from "./element/ReportModal.jsx";
import MsgModal from "../../components/board/element/MsgModal";
import defaultProfile from "../../assets/image/profile.png";
import { useSelector } from "react-redux";

const initState = {
  "dtoList": [],
  "pageNumList": [],
  "pageRequestDTO": {
    "page": 1,
    "size": 10
  },
  "prev": false,
  "next": false,
  "totalCount": 0,
  "prevPage": 0,
  "nextPage": 0,
  "totalPage": 0,
  "current": 1
};

const ReplyComponent = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const [userId, setUserId] = useState(null); // 로그인한 사용자 id
  const { id } = useParams();
  const [replyForms, setReplyForms] = useState({});
  const [replies, setReplies] = useState(initState);
  const [openReplyDropDown, setOpenReplyDropDown] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [childReplyContent, setChildReplyContent] = useState({});
  const [openReportModal, setOpenReportModal] = useState(false);
  const [openMsgModal, setOpenMsgModal] = useState(false);
  const dropDownRefs = useRef([]);
  const type = "reply";

  useEffect(() => {
    if (loginState.id) {
      setUserId(loginState.id);
    }
  }, [loginState.id]);

  useEffect(() => {
    const getReplies = async (page = 1) => {
      try {
        const data = await getList(id, page);
        setReplies(data);
      } catch (error) {
        console.error("Error fetching replies:", error);
      }
    };

    getReplies();
  }, [id]);

  const handlePageChange = async ({ page }) => {
    if (page > 0 && page <= replies.totalPage) {
      try {
        const data = await getList(id, page);
        setReplies(data);
      } catch (error) {
        console.error("Error fetching replies:", error);
      }
    }
  };

  const handleReplyClick = (replyId) => {
    setReplyForms((prev) => ({
      ...prev,
      [replyId]: !prev[replyId],
    }));
  };

  const handleDropDownClick = (id) => {
    setOpenReplyDropDown(prev => (prev === id ? null : id));
  };

  const handleDropDownMenu = (menu, id) => {
    console.log("Selected Menu:", menu, "on reply ID:", id);
    // 추가 기능 구현
  };

  const openReport = () => {
    setOpenReportModal(true);
    setOpenMsgModal(false);
    setOpenReplyDropDown(false);
  };

  const closeReport = () => {
    setOpenReportModal(false);
    setOpenMsgModal(false);
    setOpenReplyDropDown(false);
  };

  const openMsg = () => {
    setOpenReportModal(false);
    setOpenMsgModal(true);
    setOpenReplyDropDown(false);
  };

  const closeMsg = () => {
    setOpenReportModal(false);
    setOpenMsgModal(false);
    setOpenReplyDropDown(false);
  };

  const handleDeleteSuccess = (replyId) => {
    setReplies((prevReplies) => ({
      ...prevReplies,
      dtoList: prevReplies.dtoList.filter(reply => reply.replyId !== replyId)
    }));
  };

  const handleReplyContentChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleChildReplyContentChange = (replyId, e) => {
    setChildReplyContent((prev) => ({
      ...prev,
      [replyId]: e.target.value
    }));
  };

  const handleReplySubmit = async () => {
    try {
      const newReply = await addReply({
        writerId: userId,
        content: replyContent,
        parentId: null,
        boardId: id,
      });
      setReplyContent(""); // Input 비우기
      setReplies((prevReplies) => ({
        ...prevReplies,
        dtoList: [newReply, ...prevReplies.dtoList]
      }));
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const handleChildReplySubmit = async (replyId) => {
    try {
      const newChildReply = await addReply({
        writerId: userId,
        content: childReplyContent[replyId],
        parentId: replyId,
        boardId: id,
      });
      setChildReplyContent((prev) => ({ ...prev, [replyId]: "" })); // Input 비우기
      setReplies((prevReplies) => ({
        ...prevReplies,
        dtoList: prevReplies.dtoList.map(reply =>
          reply.id === replyId
            ? { ...reply, children: [newChildReply, ...(reply.children || [])] }
            : reply
        )
      }));
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error("Error adding child reply:", error);
    }
  };

  const renderReply = (reply, isChild = false) => {
    const profileSrc =
    reply.writerProfile && reply.writerProfile.length > 0
      ? reply.writerProfile
      : defaultProfile;
      
    return (
        <div key={reply.id} className="reply" ref={el => (dropDownRefs.current[reply.id] = el)}>
          <div className="reply-header">
            <div className="reply-left">
              <img
              src={profileSrc}
                alt="프로필"
                className="reply-profile-image"
              />
              <p className="reply-author">{reply.nickname}</p>
              <p className="reply-date">{formatRelativeTime(reply.regDate)}</p>
            </div>
            <div className="reply-right">
              <LikeButton
                className="like-button"
                memberId={userId}
                type="댓글"
                targetId={reply.id}
                initialLikesCount={reply.likesCount}
              />
              <button className="menu-button" onClick={() => handleDropDownClick(reply.id)}>
                ⋮
                {openReplyDropDown === reply.id && (
                  <div>
                    <ReplyDropDown onSelect={handleDropDownMenu} replyId={reply.id} openReport={openReport} openMsg={openMsg} onDeleteSuccess={handleDeleteSuccess} />
                  </div>
                )}
              </button>
            </div>
          </div>
          <p className="reply-text">{reply.content} {!isChild && (
            <button
              className="reply-button"
              onClick={() => handleReplyClick(reply.id)}
            >
              대댓글 달기
            </button>
          )}</p>


          {replyForms[reply.id] && (
            <div className="reply-form-container">
              <img src={replyArrow} alt="replyArrow" className="reply-arrow" />
              <div className="reply-form">
                <img
                  src={defaultProfile}
                  alt="프로필"
                  className="reply-profile-image"
                />
                <input
                  type="text"
                  placeholder="댓글을 또 다른 나입니다. 바르고 고운말로 작성해주세요"
                  className="reply-input-field"
                  value={childReplyContent[reply.id] || ""}
                  onChange={(e) => handleChildReplyContentChange(reply.id, e)}
                />
                <button className="submit-button" onClick={() => handleChildReplySubmit(reply.id)}>대댓글 작성</button>
              </div>
            </div>
          )}
          {reply.children && reply.children.length > 0 && (
            <div className="replies">
              {reply.children.map((child) => renderReply(child, true))}
            </div>
          )}
          {openMsgModal && <MsgModal senderId={userId} receiver={reply.nickname} onClose={closeMsg}/> }
          {openReportModal && <ReportModal type={type} targetId={reply.id} reporterId={userId} onClose={closeReport} />}
        </div>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openReplyDropDown && dropDownRefs.current[openReplyDropDown] && !dropDownRefs.current[openReplyDropDown].contains(event.target)) {
        setOpenReplyDropDown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openReplyDropDown]);

  return (
    <>
      <h3 className="reply-header">댓글</h3>
      <div className="reply-section">
        {replies.dtoList.map((reply) => renderReply(reply))}

        {replies.dtoList.length > 0 && (
          <ListPageComponent serverData={replies} movePage={handlePageChange} />
        )}

        <div className="reply-input">
          <img
            src={defaultProfile}
            alt="프로필"
            className="reply-profile-image"
          />
          <input
            type="text"
            placeholder="댓글을 또 다른 나입니다. 바르고 고운말로 작성해주세요"
            className="full-width-reply-input-field"
            value={replyContent}
            onChange={handleReplyContentChange}
          />
          <button className="submit-button" onClick={handleReplySubmit}>댓글 작성</button>
        </div>
      </div>
    </>
  );
};

export default ReplyComponent;
