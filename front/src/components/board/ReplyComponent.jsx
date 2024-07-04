import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import replyArrow from "../../assets/image/reply_arrow.png";
import '../../assets/styles/App.scss';
import { getList } from "../../api/replyApi";
import CommentDropDown from "./CommentDropDown";
import { formatDate } from "../../util/DateUtil.jsx";
import ListPageComponent from "../../components/board/element/ListPageComponent";
import LikeButton from "../../components/common/LikeButton"; // LikeButton 컴포넌트 import

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
  const { id } = useParams();
  const [replyForms, setReplyForms] = useState({});
  const [replies, setReplies] = useState(initState);
  const [openReplyDropDown, setOpenReplyDropDown] = useState({});
  const replyMenuRef = useRef(null);

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
    setOpenReplyDropDown((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDropDownMenu = (menu, id) => {
    console.log("Selected Menu:", menu, "on reply ID:", id);
    // 추가 기능 구현
  };

  const renderReply = (reply) => {
    return (
      <div key={reply.id} className="reply">
        <div className="reply-header">
          <div className="reply-left">
            <img
              src="https://kr.object.ncloudstorage.com/woosan/board/f18d0019-b9a0-41de-8b6e-5c0f814c4899_%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-29%20163620.png"
              alt="프로필"
              className="reply-profile-image"
            />
            <p className="reply-author">{reply.nickname}</p>
            {reply.best && <span className="best-tag">BEST</span>}
            <p className="reply-date">{formatDate(reply.regDate)}</p>
          </div>
          <div className="reply-right">
            <LikeButton
              memberId={1}
              type="댓글"
              targetId={reply.id}
              initialLikesCount={reply.likesCount}
            />
            <button className="menu-button" ref={replyMenuRef} onClick={() => handleDropDownClick(reply.id)}>
              ⋮
              {openReplyDropDown[reply.id] && <CommentDropDown onSelect={handleDropDownMenu} replyId={reply.id} />}
            </button>
          </div>
        </div>
        <p className="reply-text">{reply.content}</p>
        <button
          className="reply-button"
          onClick={() => handleReplyClick(reply.id)}
        >
          대댓글 달기
        </button>

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
              />
              <button className="submit-button">대댓글 작성</button>
            </div>
          </div>
        )}
        {reply.children && reply.children.length > 0 && (
          <div className="replies">
            {reply.children.map((child) => renderReply(child))}
          </div>
        )}
      </div>
    );
  };

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
            src="https://kr.object.ncloudstorage.com/woosan/board/f18d0019-b9a0-41de-8b6e-5c0f814c4899_%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-29%20163620.png"
            alt="프로필"
            className="reply-profile-image"
          />
          <input
            type="text"
            placeholder="댓글을 또 다른 나입니다. 바르고 고운말로 작성해주세요"
            className="full-width-reply-input-field"
          />
          <button className="submit-button">댓글 작성</button>
        </div>
      </div>
    </>
  );
};

export default ReplyComponent;
