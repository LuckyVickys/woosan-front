import React, { useState, useEffect } from 'react';
import '../../assets/styles/App.scss';
import SignUpModal from './SignUpModal';
import FinePWModal from './FinePWModal';

const LoginModal = ({ onClose }) =>{

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isClosing, setIsClosing] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openFinePW, setOpenFinePW] = useState(false);

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
      }, 200); 
      return () => clearTimeout(timer); 
    }
  }, [isClosing, onClose]);

  const handleLogin = (e) => {
    e.preventDefault();
    let valid = true;
    
    if (!email) {
      setEmailError('존재하지 않는 이메일입니다.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      onClose();
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
    <div className='modal-background' onClick={onClose}>
      <div className='login-modal' onClick={(e) => e.stopPropagation()}> {/*이벤트 버블링 방지*/}
        <h2>로그인</h2>
        <form onSubmit={handleLogin} className='form-box' >
          <div className='input-box'>
            <input className='email-input'
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className='input-error'>{emailError}</p>}
          </div>
          <div className='input-box'>
            <input className='pw-input'
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className='input-error'>{passwordError}</p>}
          </div>
          <div className='add-fucntion'>
            <div className='agree-checkbox'>
              <input className='checkbox' type="checkbox" id="keepLoggedIn"/>
              <div className="checkbox-text">로그인 상태 유지</div>
            </div>
            <div><a className='forgotPW' onClick={openFinePWModal}>비밀번호 찾기</a>
            </div>
          </div>
          <button className='login-button' type="submit">
            로그인
          </button>
        </form>
        <p className='socialLogin-text'>
          SNS계정으로 간편 로그인/회원가입
        </p>
        <div className='socialLogin-button'>
          <div className='kakao-Icon'></div>
          <div className='naver-Icon'></div>
          <div className='google-Icon'></div>
        </div>
        <p className='signup-text'>아직 회원이 아니신가요? <a className='signup-link' onClick={openSignUpModal} > 회원가입 하기</a></p>
      </div>
      {openSignUp && <SignUpModal onClose={closeSignUpModal}/>}
      {openFinePW && <FinePWModal onClose={closeFinePWModal}/>}
    </div>
  );
};

export default LoginModal;