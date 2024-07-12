import React, { useState, useEffect } from "react";
import { addMessage } from "../../../api/messageApi";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";
import "../../../assets/styles/App.scss";

const initState = {
  senderId: "",
  receiver: "",
  content: "",
};

const MsgModal = ({ senderId, receiver, onClose }) => {
  const [message, setMessage] = useState({ ...initState });
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setMessage({ ...initState });
  }, [senderId, receiver]);

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  const handleClickMsgAdd = async (e) => {
    console.log("Receiver :", receiver);
    console.log("Sender :", senderId);
    e.preventDefault();

    if (message.content.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "전송 실패",
        text: "내용을 입력하세요.",
      });
      return;
    } else if (message.content.length > 100) {
      Swal.fire({
        icon: "error",
        title: "전송 실패",
        text: "최대 100자까지 입력 가능합니다.",
      });
      return;
    }

    try {
      const response = await addMessage({
        senderId: senderId,
        receiver: receiver,
        content: message.content,
      });

      if (response) {
        Swal.fire({
          title: `쪽지를 전송하시겠습니까?`,
          text: `${receiver}님께 전송된 쪽지는 수정이 불가능합니다.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "전송",
          cancelButtonText: "취소",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "전송 완료",
              `${receiver}께 전송되었습니다.`,
              "success"
            ).then(() => {
              setIsClosing(true);
            });
          }
        });
      } else {
        throw new Error("쪽지 전송에 실패했습니다.");
      }
    } catch (error) {
      console.error("쪽지 전송 오류:", error.message);
      Swal.fire("전송 실패", "쪽지 전송에 실패했습니다.", "error");
    }
  };

  return (
    <div className="msg-modal-background" onClick={onClose}>
      <div className="msg-modal" onClick={(e) => e.stopPropagation()}>
        <div className="msg-modal-header">
          <div className="msg-modal-title">쪽지 작성</div>
          <TiDelete className="delete-icon" onClick={onClose} />
        </div>
        <div className="msg-modal-body">
          수신자
          <div className="msg-input receiver-input  E6E6E6">{receiver}</div>
          <textarea
            className="msg-input message-input E6E6E6"
            type="text"
            placeholder="쪽지 내용은 1자 이상 100자 이하여야 합니다."
            value={message.content}
            onChange={(e) =>
              setMessage({ ...message, content: e.target.value })
            }
          />
        </div>
        <div className="msg-form-buttons">
          <button className="msg-save-button" onClick={handleClickMsgAdd}>
            보내기
          </button>
          <button className="msg-cancel-button" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default MsgModal;
