import React, { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import '../../assets/styles/App.scss';

const SignUpModal = ({ onClose }) =>{
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [pwCheck, setPwCheck] = useState('');

  const [emailError, setEmailError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [pwCheckError, setPwCheckError] = useState('');
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

  const handleSignUp = (e) => {
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

    if (!nickname) {
      setNicknameError('닉네임 형식이 올바르지 않습니다.');
      valid = false;
    } else if (nickname === "") {
      setEmailError('필수 입력 사항입니다.');
    } else if (nickname === "") {
      setEmailError('이미 존재하는 닉네임입니다.');
    }

    if (!password) {
      setPasswordError('형식이 올바르지 않습니다.');
      valid = false;
    } else if (password === "") {
      setPasswordError('필수 입력 사항입니다.');
    }

    if (pwCheck !== pwCheck) {
      setPwCheckError('비밀번호와 일치하지 않습니다.');
      valid = false;
    } else if (pwCheck === "") {
      setPwCheckError('필수 입력 사항입니다.');
    }

    if (valid) {
      setSignedUp(true);
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
          <div className='signup-modal'  onClick={(e) => e.stopPropagation()}>
            <h2>회원가입</h2>
            <form onSubmit={handleSignUp} className='form-box' >
              <div className='input-box'>
                <p className='input-info'>이메일</p>
                <input className='email-input'
                  type="email"
                  placeholder="이메일을 입력해주세요."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <p className='input-error'>{emailError}</p>}
              </div>
              <div className='input-box'>
                <p className='input-info'>닉네임</p>
                <input className='nickname-input'
                  type="nickname"
                  placeholder="초성, 특수문자 제외 1~8자"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                {setNicknameError && <p className='input-error'>{nicknameError}</p>}
              </div>
              <div className='input-box'>
                <p className='input-info'>비밀번호</p>
                <input className='pw-input'
                  type="password"
                  placeholder="특수문자(‘~’, ‘^’, ‘,’) 제외"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <p className='input-error'>{passwordError}</p>}
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
              <div className='add-fucntion'>
                <div className='agree-checkbox'>
                  <input className='checkbox' type="checkbox" id="agreeTerms"/>
                  <div className="checkbox-text">필수 약관 동의</div>
                </div>
              </div>
              <button className='signup-button' type="submit">회원가입</button>
            </form>
            <p className='signup-text'>이미 계정이 있으신가요? <a className='signup-link' onClick={openLoginModal}>로그인</a></p>
          </div>
          {openLogin && <LoginModal />}
        {/* </div> */}
        </>
      );
    };

export default SignUpModal;