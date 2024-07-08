import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import replyArrow from "../../assets/image/reply_arrow.png";
import '../../assets/styles/App.scss';
import { getList, addReply } from "../../api/replyApi";
import ReplyDropDown from "./element/ReplyDropDown.jsx";
import { formatRelativeTime } from "../../util/DateUtil.jsx";
import ListPageComponent from "../../components/board/element/ListPageComponent";
import LikeButton from "../../components/common/LikeButton";
import MsgModal from "../../components/board/element/MsgModal";
import defaultProfile from "../../assets/image/profile.png";

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
  const [userId, setUserId] = useState(3); // 로그인한 사용자 id(임시)

  const { id } = useParams();
  const [replyForms, setReplyForms] = useState({});
  const [replies, setReplies] = useState(initState);
  const [openReplyDropDown, setOpenReplyDropDown] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [childReplyContent, setChildReplyContent] = useState({});
  const [openMsgModal, setOpenMsgModal] = useState(false);
  const dropDownRefs = useRef([]);

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

  const openMsg = () => {
    setOpenMsgModal(true);
    setOpenReplyDropDown(false);
  };

  const closeMsg = () => {
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
        writerId: 2,
        content: replyContent,
        parentId: null,
        boardId: id,
      });
      setReplyContent(""); // Input 비우기
      setReplies((prevReplies) => ({
        ...prevReplies,
        dtoList: [newReply, ...prevReplies.dtoList]
      }));
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const handleChildReplySubmit = async (replyId) => {
    try {
      const newChildReply = await addReply({
        writerId: 2,
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
                memberId={1}
                type="댓글"
                targetId={reply.id}
                initialLikesCount={reply.likesCount}
              />
              <button className="menu-button" onClick={() => handleDropDownClick(reply.id)}>
                ⋮
                {openReplyDropDown === reply.id && (
                  <div>
                    <ReplyDropDown onSelect={handleDropDownMenu} replyId={reply.id} openMsg={openMsg} onDeleteSuccess={handleDeleteSuccess} />
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
                  src="https://kr.object.ncloudstorage.com/woosan/board/f18d0019-b9a0-41de-8b6e-5c0f814c4899_%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-29%20163620.png"
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
          {openMsgModal && <MsgModal senderId={userId} receiver={reply.writerId} nickname={reply.nickname} onClose={closeMsg}/> }
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
