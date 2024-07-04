import React, { useState } from 'react';

import '../../assets/styles/App.scss';

const LoginModal = () =>{

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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
      // Handle login
    }
  };

  return (
    <div className='login-modal-background'>
      <div className='login-modal' >
        <h2>로그인</h2>
        <form onSubmit={handleLogin} className='login-form' >
          <div className='login-input'>
            <input className='id-input'
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className='login-error'>{emailError}</p>}
          </div>
          <div className='login-input'>
            <input className='pw-input'
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className='login-error'>{passwordError}</p>}
          </div>
          <div className='keepLoggedIn-forgotPW'>
            <div className='keepLoggedIn-checkbox'>
              <input className='login-checkbox' type="checkbox" id="keepLoggedIn"/>
              <div className="keepLoggedIn">로그인 상태 유지</div>
            </div>
            <div><a href="#" className='forgotPW'> 비밀번호 찾기</a>
            </div>
          </div>
          <button className='login-Button' type="submit">로그인</button>
        </form>
        <p className='socialLogin-text'>
          SNS계정으로 간편 로그인/회원가입
        </p>
        <div className='socialLogin-button'>
          <div className='kakao-Icon'></div>
          <div className='naver-Icon'></div>
          <div className='google-Icon'></div>
        </div>
        <p className='signup-text'>아직 회원이 아니신가요? <a href="#" className='signup-link'> 회원가입 하기</a></p>
      </div>
    </div>
  );
};

export default LoginModal;