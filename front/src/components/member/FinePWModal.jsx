import React, { useState } from 'react';
import LoginModal from './LoginModal';
import '../../assets/styles/App.scss';

const FinePWModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwCheck, setPwCheck] = useState('');

  const [emailError, setEmailError] = useState('');
  const [emailPasswordError, setEmailPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [pwCheckError, setPwCheckError] = useState('');

  const [openLogin, setOpenLogin] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    let valid = true;
    
    if (!email) {
      setEmailError('이메일이 형식이 올바르지 않습니다.');
      valid = false;
    } else if (email=== "") {
      setEmailError('필수 입력 사항입니다.');
    } else if (email=== "") {
      setEmailError('이미 가입된 이메일입니다.');
    }

    if (!emailPassword) {
      setEmailPasswordError('일치하지 않습니다.');
      valid = false;
    } else if (emailPassword === "") {
      setEmailPasswordError('필수 입력 사항입니다.');
    } 

    if (!newPassword) {
      setNewPasswordError('형식이 올바르지 않습니다.');
      valid = false;
    } else if (newPassword === "") {
      setNewPasswordError('필수 입력 사항입니다.');
    }

    if (pwCheck !== pwCheck) {
      setPwCheckError('비밀번호와 일치하지 않습니다.');
      valid = false;
    } else if (pwCheck === "") {
      setPwCheckError('필수 입력 사항입니다.');
    }

    if (valid) {
      // Handle login
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
        {/* <div className='modal-background'> */}
          <div className='pwfind-modal'  onClick={(e) => {e.stopPropagation(); onClose();}}>
            <h2>비밀번호 찾기</h2>
            <form onSubmit={handleLogin} className='form-box' >
              <div className='input-box'>
                <p className='input-info'>이메일</p>
                <input className='email-input'
                  type="email"
                  placeholder="가입한 이메일을 입력해주세요."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <p className='input-error'>{emailError}</p>}
              </div>
              <div className='input-box'>
                <p className='input-info'>재발급된 비밀번호</p>
                <input className='emailPassword-input'
                  type="emailPassword"
                  placeholder="이메일로 재발급된 비밀번호를 입력해주세요."
                  value={emailPassword}
                  onChange={(e) => setEmailPassword(e.target.value)}
                />
                {emailPasswordError && <p className='input-error'>{emailPasswordError}</p>}
              </div>
              <div className='input-box'>
                <p className='input-info'>새로운 비밀번호</p>
                <input className='pw-input'
                  type="newPassword"
                  placeholder="특수문자(‘~’, ‘^’, ‘,’) 제외"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {newPasswordError && <p className='input-error'>{newPasswordError}</p>}
              </div>
              <div className='input-box'>
                <p className='input-info'>비밀번호 확인</p>
                <input className='pw-check-input'
                  type="pwCheck"
                  placeholder="비밀번호 재입력"
                  value={pwCheck}
                  onChange={(e) => setPwCheck(e.target.value)}
                />
                {pwCheckError && <p className='input-error'>{pwCheckError}</p>}
              </div>
              <button className='pwchange-button' type="submit">비밀번호 변경하기</button>
            </form>
            <p className='signup-text'>이미 계정이 있으신가요? <a className='signup-link' onClick={openLoginModal}>로그인</a></p>
          </div>
          {openLogin && <LoginModal />}
        {/* </div> */}
      </>
      );
    };

export default FinePWModal;