import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../../api/kakaoApi";
import React, { useState, useEffect } from "react";
import "../../assets/styles/App.scss";
import SignUpModal from "./SignUpModal";
import FinePWModal from "./FindPWModal";
import { useDispatch } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";
import { login } from "../../slices/loginSlice";
import TogglePassword from "./TogglePassword";
import Swal from "sweetalert2";

const initState = {
  email: "",
  password: "",
};

const LoginModal = ({ onClose }) => {
  const link = getKakaoLoginLink();

  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isClosing, setIsClosing] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openFinePW, setOpenFinePW] = useState(false);

  const dispatch = useDispatch();
  const [loginParam, setLoginParam] = useState({ ...initState });
  const { doLogin, isLogin } = useCustomLogin();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginParam((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    let valid = true;

    if (loginParam.email.trim() === "") {
      setEmailError("이메일을 입력하세요.");
      valid = false;
    }

    if (loginParam.password.trim() === "") {
      setPasswordError("비밀번호를 입력하세요.");
      valid = false;
    }

    return valid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const data = await doLogin(loginParam);
        if (data) {
          console.log('data:', data);
          dispatch(login(data));
          Swal.fire({
            icon: 'success',
            title: '로그인 완료',
            text: '오늘도 즐거운 자취생활 되세요!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: '확인',
          }).then((result) => {
            if(result.isConfirmed) {
              window.location.replace("/");
            }
          })
          onClose();
        } else {

        }
      } catch (error) {
        console.error('Error message:', error.message);
        Swal.fire({
          icon: 'error',
          title: '로그인 실패',
          text: error.message,
          confirmButtonColor: '#3085d6',
        });
      }
    }
  };

  const openSignUpModal = () => {
    setTimeout(() => {
      setOpenSignUp(true);
    }, 200);
  };

  const closeSignUpModal = () => {
    setTimeout(() => {
      setOpenSignUp(false);
    }, 200);
  };

  const openFinePWModal = () => {
    setTimeout(() => {
      setOpenFinePW(true);
    }, 200);
  };

  const closeFinePWModal = () => {
    setTimeout(() => {
      setOpenFinePW(false);
    }, 200);
  };

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        {" "}
        {/*이벤트 버블링 방지*/}
        <h2>로그인</h2>
        <div className="form-box">
          <div className="input-box">
            <input
              className="email-input"
              name="email"
              type="email"
              placeholder="이메일"
              value={loginParam.email}
              onChange={handleChange}
            />
            {emailError && <p className="input-error">{emailError}</p>}
          </div>
          <div className="input-box">
            <div className="input-toggle-container">
              <input
                className="pw-input"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                value={loginParam.password}
                onChange={handleChange}
              />
              <TogglePassword
                isVisible={showPassword}
                toggleVisibility={togglePassword}
              />
            </div>
            {passwordError && <p className="input-error">{passwordError}</p>}
          </div>
          <div className="forgotPW" onClick={openFinePWModal}>
              비밀번호 찾기
          </div>
          <button className="login-button" onClick={handleLogin}>
            로그인
          </button>
        </div>
        <p className="socialLogin-text">SNS계정으로 간편 로그인/회원가입</p>
        <div className="socialLogin-button">
          <Link to={link}>
            <div className="kakao-icon"></div>
          </Link>
        </div>
        <p className="signup-text">
          아직 회원이 아니신가요?{" "}
          <a className="signup-link" onClick={openSignUpModal}>
            {" "}
            회원가입 하기
          </a>
        </p>
      </div>
      {openSignUp && <SignUpModal onClose={closeSignUpModal} />}
      {openFinePW && <FinePWModal onClose={closeFinePWModal} />}
    </div>
  );
};

export default LoginModal;
