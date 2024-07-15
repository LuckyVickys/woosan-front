import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import { sendEmail, updatePassword } from "../../api/memberApi";
import Swal from "sweetalert2";
import TogglePassword from "./TogglePassword";
import "../../assets/styles/App.scss";

const initState = {
  email: "",
  password: "",
  newPassword: "",
};

const FinePWModal = ({ onClose }) => {
  const [updateData, setUpdateData] = useState({ ...initState });

  const [emailAvailable, setEmailAvailable] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPwCheck, setShowPwCheck] = useState(false);

  const [pwCheck, setPwCheck] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [pwCheckError, setPwCheckError] = useState("");

  const [updatePW, setUpdatePW] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const togglePwCheck = () => {
    setShowPwCheck(!showPwCheck);
  };

  const isValidEmail = (email) => {
    // '@', .이 포함되어야 함
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPassword = (password) => {
    // 특수문자 ('~', '^', ',')를 제외하고, 영문, 숫자, 특수문자 조합하여 8~16자
    return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/.test(
      password
    );
  };

  const handleSendEmail = async () => {
    if (!updateData.email) {
      setEmailError("필수 입력 사항입니다.");
      return;
    } else if (!isValidEmail(updateData.email)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
      return;
    }

    try {
      const emailResponse = await sendEmail(updateData.email);
      console.log(emailResponse);

      if (emailResponse === "메일 전송 완료") {
        setEmailError("작성해주신 이메일로 재발급된 비밀번호를 전송했습니다.");
        setEmailAvailable(true);
      } else {
        setEmailError("가입되어 있지 않은 이메일입니다.");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("이메일 전송 실패", `다시 시도해주세요.`, "error");
      setEmailError("");
      setEmailAvailable(false);
    }
  };

  const handleUpdatePW = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!updateData.email) {
      setEmailError("필수 입력 사항입니다.");
      valid = false;
    } else if (!isValidEmail(updateData.email)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
      valid = false;
    }

    if (!updateData.password) {
      setPasswordError("필수 입력 사항입니다.");
      valid = false;
    }

    if (!updateData.newPassword) {
      setNewPasswordError("필수 입력 사항입니다.");
      valid = false;
    } else if (!isValidPassword(updateData.newPassword)) {
      setNewPasswordError("비밀번호 형식이 올바르지 않습니다.");
      valid = false;
    }

    if (!pwCheck) {
      setPwCheckError("필수 입력 사항입니다.");
      valid = false;
    } else if (updateData.newPassword !== pwCheck) {
      setPwCheckError("비밀번호가 일치하지 않습니다.");
      valid = false;
    }

    if (valid) {
      try {
        const updateResponse = await updatePassword(updateData);
        console.log("비밀번호 변경 완료:", updateResponse);
        setUpdatePW(true);

        Swal.fire(
          "비밀번호 변경 완료",
          `로그인 창으로 전환됩니다.`,
          "success"
        ).then(() => {
          onClose();
        });
      } catch (error) {
        console.error(
          "비밀번호 변경 실패:",
          error.response ? error.response.data : error.message
        );
        Swal.fire("비밀번호 변경 실패", `다시 시도해주세요.`, "error");
        setEmailError("");
        setPasswordError("");
        setNewPasswordError("");
        setPwCheckError("");
      }
    }
  };

  const openLoginModal = () => {
    setTimeout(() => {
      onClose(false);
      setOpenLogin(true);
    }, 200);
  };

  return (
    <>
      <div
        className="pwfind-modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>비밀번호 찾기</h2>
        <form onSubmit={handleUpdatePW} className="form-box">
          <div className="input-box">
            <p className="input-info">이메일</p>
            <div className="input-button-container">
              <input
                className="email-input"
                type="email"
                placeholder="가입한 이메일을 입력해주세요."
                value={updateData.email}
                onChange={(e) =>
                  setUpdateData({ ...updateData, email: e.target.value })
                }
              />
              <button
                type="button"
                className="check-button"
                onClick={handleSendEmail}
              >
                비밀번호 재발급
              </button>
            </div>
            {emailError && (
              <p className={`input-error ${emailAvailable ? "available" : ""}`}>
                {emailError}
              </p>
            )}
          </div>
          <div className="input-box">
            <p className="input-info">재발급된 비밀번호</p>
            <div className="input-toggle-container">
              <input
                className="pw-input"
                type={showPassword ? "text" : "password"}
                placeholder="이메일로 재발급된 비밀번호를 입력해주세요."
                value={updateData.password}
                onChange={(e) =>
                  setUpdateData({ ...updateData, password: e.target.value })
                }
              />
              <TogglePassword
                isVisible={showPassword}
                toggleVisibility={togglePassword}
              />
            </div>
            {passwordError && <p className="input-error">{passwordError}</p>}
          </div>
          <div className="input-box">
            <div className="input-info-password">
              <p className="input-info-password-title">새로운 비밀번호</p>
              <p className="input-info-pw">
                (영문, 숫자, 특수문자 조합하여 8~16자)
              </p>
            </div>
            <div className="input-toggle-container">
              <input
                className="new-pw-input"
                type={showNewPassword ? "text" : "password"}
                placeholder="특수문자(‘~’, ‘^’, ‘,’) 제외"
                value={updateData.newPassword}
                onChange={(e) =>
                  setUpdateData({ ...updateData, newPassword: e.target.value })
                }
              />
              <TogglePassword
                isVisible={showNewPassword}
                toggleVisibility={toggleNewPassword}
              />
            </div>
            {newPasswordError && (
              <p className="input-error">{newPasswordError}</p>
            )}
          </div>
          <div className="input-box">
            <p className="input-info">비밀번호 확인</p>
            <div className="input-toggle-container">
              <input
                className="pw-check-input"
                type={showPwCheck ? "text" : "password"}
                placeholder="비밀번호 재입력"
                value={pwCheck}
                onChange={(e) => setPwCheck(e.target.value)}
              />
              <TogglePassword
                isVisible={showPwCheck}
                toggleVisibility={togglePwCheck}
              />
            </div>
            {pwCheckError && <p className="input-error">{pwCheckError}</p>}
          </div>
          <button className="pwchange-button" type="submit">
            비밀번호 변경하기
          </button>
        </form>
        <p className="signup-text">
          이미 계정이 있으신가요?{" "}
          <a className="signup-link" onClick={openLoginModal}>
            로그인
          </a>
        </p>
      </div>
      {openLogin && <LoginModal />}
    </>
  );
};

export default FinePWModal;
