import React, { useState } from "react";
import likeNoIcon from "../../assets/image/heart_no.svg"; // Ensure you have the correct path for the likeNoIcon
import likeIcon from "../../assets/image/heart_yes.svg";
import replyArrow from "../../assets/image/reply_arrow.png";
import '../../assets/styles/App.scss';

const CommentList = () => {
  const [replyForms, setReplyForms] = useState({});

  const handleReplyClick = (commentId) => {
    setReplyForms((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <>
      <h3 className="comment-header">댓글</h3>
      <div className="comment-section">
        <div className="comment">
          <div className="comment-header">
            <div className="comment-left">
              <img
                src="https://kr.object.ncloudstorage.com/woosan/board/f18d0019-b9a0-41de-8b6e-5c0f814c4899_%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-29%20163620.png"
                alt="프로필"
                className="comment-profile-image"
              />
              <p className="comment-author">
                다이어트는 내일부터 <span className="best-tag">BEST</span>
              </p>
              <p className="comment-date">2024-06-16 20:09:34</p>
            </div>
            <div className="comment-right">
              <button className="like-button">
                <span role="img" aria-label="like">
                  <img src={likeIcon} alt="likeIcon" />
                </span>{" "}
                34
              </button>
              <button className="menu-button">⋮</button>
            </div>
          </div>
          <p className="comment-text">
            내가 너 레시피 따라서 만들어먹다가 5kg 쪘다 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ
            이럴 줄이야.. 너무하군
          </p>
          <button
            className="reply-button"
            onClick={() => handleReplyClick("comment1")}
          >
            대댓글 달기
          </button>

          {replyForms["comment1"] && (
            <div className="reply-form-container">
              <img src={replyArrow} alt="replyArrow" className="reply-arrow" />
              <div className="reply-form">
                <img
                  src="https://kr.object.ncloudstorage.com/woosan/board/f18d0019-b9a0-41de-8b6e-5c0f814c4899_%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-29%20163620.png"
                  alt="프로필"
                  className="comment-profile-image"
                />
                <input
                  type="text"
                  placeholder="댓글을 또 다른 나입니다. 바르고 고운말로 작성해주세요"
                  className="comment-input-field"
                />
                <button className="submit-button">대댓글 작성</button>
              </div>
            </div>
          )}
        </div>
        <div className="reply">
          <div className="reply-header">
            <div className="reply-left">
              <img
                src="https://kr.object.ncloudstorage.com/woosan/board/f18d0019-b9a0-41de-8b6e-5c0f814c4899_%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-29%20163620.png"
                alt="프로필"
                className="reply-profile-image"
              />
              <p className="reply-author">카카시</p>
              <p className="reply-date">2024.07.01</p>
            </div>
            <div className="reply-right">
              <button className="like-button">
                <span role="img" aria-label="like">
                  <img src={likeIcon} alt="likeIcon" />
                </span>{" "}
                11
              </button>
              <button className="menu-button">⋮</button>
            </div>
          </div>
          <p className="reply-text">ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ</p>
        </div>
        <div className="comment">
          <div className="comment-header">
            <div className="comment-left">
              <img
                src="https://kr.object.ncloudstorage.com/woosan/board/f18d0019-b9a0-41de-8b6e-5c0f814c4899_%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-29%20163620.png"
                alt="프로필"
                className="comment-profile-image"
              />
              <p className="comment-author">친절한203호</p>
              <p className="comment-date">2024-06-16 20:09:30</p>
            </div>
            <div className="comment-right">
              <button className="like-button">
                <span role="img" aria-label="like">
                  <img src={likeIcon} alt="likeIcon" />
                </span>{" "}
                4
              </button>
              <button className="menu-button">⋮</button>
            </div>
          </div>
          <p className="comment-text">
            아 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 몇분 말 듣고 오늘 저녁메뉴는 이걸로
            정했다
          </p>
          <button
            className="reply-button"
            onClick={() => handleReplyClick("comment2")}
          >
            대댓글 달기
          </button>

          {replyForms["comment2"] && (
            <div className="reply-form-container">
              <img src={replyArrow} alt="replyArrow" className="reply-arrow" />
              <div className="reply-form">
                <img
                  src="https://kr.object.ncloudstorage.com/woosan/board/f18d0019-b9a0-41de-8b6e-5c0f814c4899_%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-29%20163620.png"
                  alt="프로필"
                  className="comment-profile-image"
                />
                <input
                  type="text"
                  placeholder="댓글을 또 다른 나입니다. 바르고 고운말로 작성해주세요"
                  className="comment-input-field"
                />
                <button className="submit-button">대댓글 작성</button>
              </div>
            </div>
          )}
        </div>

        <div className="pagination">
          <button className="page-button">{"<"}</button>
          <button className="page-button active-page-button">1</button>
          <button className="page-button">2</button>
          <button className="page-button">3</button>
          <button className="page-button">{">"}</button>
        </div>

        <div className="comment-input">
          <img
            src="https://kr.object.ncloudstorage.com/woosan/board/f18d0019-b9a0-41de-8b6e-5c0f814c4899_%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-29%20163620.png"
            alt="프로필"
            className="comment-profile-image"
          />
          <input
            type="text"
            placeholder="댓글을 또 다른 나입니다. 바르고 고운말로 작성해주세요"
            className="full-width-comment-input-field"
          />
          <button className="submit-button">댓글 작성</button>
        </div>
      </div>
    </>
  );
};

export default CommentList;
