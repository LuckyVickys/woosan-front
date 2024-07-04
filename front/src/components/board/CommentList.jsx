import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import likeNoIcon from "../../assets/image/heart_no.svg";
import likeIcon from "../../assets/image/heart_yes.svg";
import replyArrow from "../../assets/image/reply_arrow.png";
import '../../assets/styles/App.scss';
import { getList } from "../../api/replyApi";
import CommentDropDown from "./CommentDropDown";
// import ReportModal from './ReportModal';
// import MsgModal from "./MsgModal";
// import Swal from 'sweetalert2';

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

const CommentList = () => {
  const { id } = useParams();
  const [replyForms, setReplyForms] = useState({});
  const [replies, setReplies] = useState(initState);

  const [openCommentDropDown, setOpenCommentDropDown] = useState({});
  const commentMenuRef = useRef(null);

  // const [openReportModal, setOpenReportModal] = useState(false);
  // const [openMsgModal, setOpenMsgModal] = useState(false);

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

  const handlePageChange = async (page) => {
    if (page > 0 && page <= replies.totalPage) {
      try {
        const data = await getList(id, page);
        setReplies(data);
      } catch (error) {
        console.error("Error fetching replies:", error);
      }
    }
  };

  const handleReplyClick = (commentId) => {
    setReplyForms((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleDropDownClick = (id) => {
    setOpenCommentDropDown((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDropDownMenu = (menu, id) => {
    const commentId = replies.dtoList.find(comment => comment.id === id)?.id;
    const replyId = replies.dtoList.find(comment => comment.children?.some(reply => reply.id === id))?.id;
  
    if (commentId) {
      console.log("Selected commentId:", commentId);
      console.log("Selected Comment Menu:", menu);
  
      // switch (menu) {
      //   case "report":
      //     setOpenReportModal(true);
      //     break;
      //   case "msg":
      //     setOpenMsgModal(true);
      //     break;
      //   case "delete":
      //     Swal.fire({
      //       title: '게시글 삭제',
      //       text: `${commentId}를 삭제하시겠습니까?`,
      //       icon: 'warning',
      //       showCancelButton: true,
      //       confirmButtonColor: '#3085d6',
      //       cancelButtonColor: '#d33',
      //       confirmButtonText: '삭제',
      //       cancelButtonText: '취소'
      //     }).then((result) => {
      //       if (result.isConfirmed) {
      //         // 삭제 기능
      //         Swal.fire('삭제 완료', `${commentId}가 삭제되었습니다.`, 'success');
      //       }
      //     });
      //     break;
      //   default:
      //     break;
      // }
    } else if (replyId) {
      console.log("Selected replyId:", replyId);
      console.log("Selected Reply Menu:", menu);
  
      // switch (menu) {
      //   case "report":
      //     setOpenReportModal(true);
      //     break;
      //   case "msg":
      //     setOpenMsgModal(true);
      //     break;
      //   case "delete":
      //     Swal.fire({
      //       title: '글 삭제',
      //       text: `${replyId}를 삭제하시겠습니까?`,
      //       icon: 'warning',
      //       showCancelButton: true,
      //       confirmButtonColor: '#3085d6',
      //       cancelButtonColor: '#d33',
      //       confirmButtonText: '삭제',
      //       cancelButtonText: '취소'
      //     }).then((result) => {
      //       if (result.isConfirmed) {
      //         // 삭제 기능
      //         Swal.fire('삭제 완료', `${replyId}가 삭제되었습니다.`, 'success');
      //       }
      //     });
      //     break;
      //   default:
      //     break;
      // }
    }
  };

  const renderReplies = (children) => {
    return children.map((reply) => (
      <div key={reply.id} className="reply">
        <div className="reply-header">
          <div className="reply-left">
            <img
              src="https://kr.object.ncloudstorage.com/woosan/board/f18d0019-b9a0-41de-8b6e-5c0f814c4899_%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-29%20163620.png"
              alt="프로필"
              className="reply-profile-image"
            />
            <p className="reply-author">{reply.nickname}</p>
            <p className="reply-date">{formatDate(reply.regDate)}</p>
          </div>
          <div className="reply-right">
            <button className="like-button">
              <span role="img" aria-label="like">
                <img src={likeIcon} alt="likeIcon" />
              </span>{" "}
              {reply.likeCount}
            </button>
            <button className="menu-button" ref={commentMenuRef} onClick={() => handleDropDownClick(reply.id)}>
                ⋮
                {openCommentDropDown[reply.id] && <CommentDropDown onSelect={handleDropDownMenu} replyId={reply.id} />}
            </button>
          </div>
        </div>
        <p className="reply-text">{reply.content}</p>
        {reply.children && reply.children.length > 0 && (
          <div className="replies">
            {renderReplies(reply.children)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <>
      <h3 className="comment-header">댓글</h3>
      <div className="comment-section">
        {replies.dtoList.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <div className="comment-left">
                <img
                  src="https://kr.object.ncloudstorage.com/woosan/board/f18d0019-b9a0-41de-8b6e-5c0f814c4899_%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-29%20163620.png"
                  alt="프로필"
                  className="comment-profile-image"
                />
                <p className="comment-author">
                  {comment.nickname} 
                </p>
                <p className="comment-date">{formatDate(comment.regDate)}</p>
              </div>
              <div className="comment-right">
                <button className="like-button">
                  <span role="img" aria-label="like">
                    <img src={likeIcon} alt="likeIcon" />
                  </span>{" "}
                  {comment.likeCount}
                </button>
                <button className="menu-button" ref={commentMenuRef} onClick={() => handleDropDownClick(comment.id)}>
                  ⋮
                  {openCommentDropDown[comment.id] && <CommentDropDown onSelect={handleDropDownMenu} commentId={comment.id} />}
                </button>
              </div>
            </div>
            <p className="comment-text">{comment.content}</p>
            <button
              className="reply-button"
              onClick={() => handleReplyClick(comment.id)}
            >
              대댓글 달기
            </button>

            {replyForms[comment.id] && (
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
            {comment.children && comment.children.length > 0 && (
              <div className="replies">
                {renderReplies(comment.children)}
              </div>
            )}
          </div>
        ))}
        {/* {openReportModal && (
        <ReportModal onClose={() => setOpenMsgModal(false)} />
        )}
        {openMsgModal && (
        <MsgModal onClose={() => setOpenMsgModal(false)} />
        )} */}
        {replies.dtoList.length > 0 && (
          <div className="pagination">
            <button 
              className="page-button" 
              onClick={() => handlePageChange(replies.pageRequestDTO.page - 1)}
              disabled={!replies.prev}
            >
              {"<"}
            </button>
            {replies.pageNumList.map((page) => (
              <button
                key={page}
                className={`page-button ${page === replies.pageRequestDTO.page ? 'active-page-button' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button 
              className="page-button" 
              onClick={() => handlePageChange(replies.pageRequestDTO.page + 1)}
              disabled={!replies.next}
            >
              {">"}
            </button>
          </div>
        )}

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
