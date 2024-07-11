import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import { checkEmail, checkNickname, signUp } from "../../api/memberApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import "../../assets/styles/App.scss";

const initState = {
  email: "",
  nickname: "",
  password: "",
};

const SignUpModal = ({ onClose }) => {
  const [signupData, setSignupData] = useState({ ...initState });

  const [showPassword, setShowPassword] = useState(false);
  const [pwCheck, setPwCheck] = useState("");

  const [emailError, setEmailError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pwCheckError, setPwCheckError] = useState("");

  const [signedUp, setSignedUp] = useState(false);
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

  const isValidEmail = (email) => {
    // '@'가 포함되어야 함
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidNickname = (nickname) => {
    // 한글 자모음 제외, 특수문자 제외 1~8자
    return /^[가-힣a-zA-Z0-9]{1,8}$/.test(nickname);
  };

  const isValidPassword = (password) => {
    // 특수문자 ('~', '^', ',')를 제외하고, 영문, 숫자, 특수문자 조합하여 8~16자
    return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(
      password
    );
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!signupData.email) {
      setEmailError("필수 입력 사항입니다.");
      valid = false;
    } else if (!isValidEmail(signupData.email)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
      valid = false;
    }

    if (!signupData.nickname) {
      setNicknameError("필수 입력 사항입니다.");
      valid = false;
    } else if (!isValidNickname(signupData.nickname)) {
      setNicknameError("닉네임은 1자 이상 8자 이하여야 합니다.");
      valid = false;
    }

    if (!signupData.password) {
      setPasswordError("필수 입력 사항입니다.");
      valid = false;
    } else if (!isValidPassword(signupData.password)) {
      setPasswordError("비밀번호 형식이 올바르지 않습니다.");
      valid = false;
    }

    if (!pwCheck) {
      setPwCheckError("필수 입력 사항입니다.");
      valid = false;
    } else if (signupData.password !== pwCheck) {
      setPwCheckError("비밀번호가 일치하지 않습니다.");
      valid = false;
    }

    const agreeTerms = document.getElementById("agreeTerms").checked;
    if (!agreeTerms) {
      Swal.fire("회원가입 실패", "필수 약관에 동의해주세요.", "error");
      return;
    }

    if (valid) {
      try {
        const emailResponse = await checkEmail(signupData.email);
        if (emailResponse.exists) {
          setEmailError("이미 가입된 이메일입니다.");
          return;
        }

        const nicknameResponse = await checkNickname(signupData.nickname);
        if (nicknameResponse.exists) {
          setNicknameError("이미 존재하는 닉네임입니다.");
          return;
        }

        const signUpResponse = await signUp(signupData);
        console.log("회원가입 완료:", signUpResponse);
        setSignedUp(true);

        Swal.fire("회원가입 완료", `로그인 창으로 전환됩니다.`, "success").then(
          () => {
            onClose();
          }
        );
      } catch (error) {
        console.error(
          "회원가입 실패:",
          error.response ? error.response.data : error.message
        );
        Swal.fire("회원가입 실패", `다시 시도해주세요.`, "error");
      }
    }
  };

  const handleEmailCheck = async () => {
    if (!signupData.email) {
      setEmailError("필수 입력 사항입니다.");
      return;
    } else if (!isValidEmail(signupData.email)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
      return;
    }
    try {
      const emailResponse = await checkEmail(signupData.email);
      if (emailResponse.exists) {
        setEmailError("이미 가입된 이메일입니다.");
      } else {
        setEmailError("사용 가능한 이메일입니다.");
      }
    } catch (error) {
      console.error(
        "이메일 중복 체크 오류:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleNicknameCheck = async () => {
    if (!signupData.nickname) {
      setNicknameError("필수 입력 사항입니다.");
      return;
    } else if (!isValidNickname(signupData.nickname)) {
      setNicknameError("닉네임 형식이 올바르지 않습니다.");
      return;
    }
    try {
      const nicknameResponse = await checkNickname(signupData.nickname);
      if (nicknameResponse.exists) {
        setNicknameError("이미 존재하는 닉네임입니다.");
      } else {
        setNicknameError("사용 가능한 닉네임입니다.");
      }
    } catch (error) {
      console.error(
        "닉네임 중복 체크 오류:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const openLoginModal = () => {
    onClose();
    setTimeout(() => {
      setOpenLogin(true);
    }, 200);
  };

  return (
    <>
      {/* <div className='modal-background'> */}
      <div
        className="signup-modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2>회원가입</h2>
        <form onSubmit={handleSignUp} className="form-box">
          <div className="input-box">
            <p className="input-info">이메일</p>
            <div className="input-button">
              <input
                className="email-input"
                type="email"
                placeholder="이메일을 입력해주세요."
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
              />
              <button
                type="button"
                className="check-button"
                onClick={handleEmailCheck}
              >
                중복체크
              </button>
            </div>
            {emailError && <p className="input-error">{emailError}</p>}
          </div>
          <div className="input-box">
            <p className="input-info">닉네임</p>
            <div className="input-button">
              <input
                className="nickname-input"
                type="nickname"
                placeholder="초성, 특수문자 제외 1~8자"
                value={signupData.nickname}
                onChange={(e) =>
                  setSignupData({ ...signupData, nickname: e.target.value })
                }
              />
              <button
                type="button"
                className="check-button"
                onClick={handleNicknameCheck}
              >
                중복체크
              </button>
            </div>
            {nicknameError && <p className="input-error">{nicknameError}</p>}
          </div>
          <div className="input-box">
            <div className="input-info-password">
              <p className="input-info-password-title">비밀번호</p>
              <p className="input-info-pw">(영문, 숫자, 특수문자 조합하여 8~16자)</p>
            </div>
            <input
              className="pw-input"
              type="password"
              placeholder="특수문자(‘~’, ‘^’, ‘,’) 제외"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
            />
            {passwordError && <p className="input-error">{passwordError}</p>}
          </div>
          <div className="input-box">
            <p className="input-info">비밀번호 확인</p>
            <input
              className="pw-check-input"
              type="pwCheck"
              placeholder="비밀번호 재입력"
              value={pwCheck}
              onChange={(e) => setPwCheck(e.target.value)}
            />
            {pwCheckError && <p className="input-error">{pwCheckError}</p>}
          </div>
          <div className="add-fucntion">
            <div className="agree-checkbox">
              <input className="checkbox" type="checkbox" id="agreeTerms" />
              <div className="checkbox-text">필수 약관 동의</div>
            </div>
          </div>
          <button className="signup-button" type="submit">
            회원가입
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
      {/* </div> */}
    </>
  );
};

export default SignUpModal;
