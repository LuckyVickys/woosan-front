# I. Member 회원 기능

## Overview
회원가입, 로그인, 비밀번호 찾기, 이메일 및 닉네임 중복 체크, 비밀번호 변경, 쪽지 전송, 마이페이지, 회원 탈퇴 등의 기능을 포함합니다.

## APIs
- memberApi
- kakaoApi
- memberProfileApi
- messageApi

## Components
- SignUpModal: 이메일, 닉네임, 비밀번호, 회원가입 확인 코드 검증 및 회원가입
- LoginModal: 일반 로그인과 소셜 로그인 제공
- FindPWModal: 이메일, 임시 비밀번호, 새로운 비밀번호 검증 및 비밀번호 변경
- ProfileDropdown: 드롭다운 형태로 로그인한 회원정보와 페이지 이동, 다크 모드 전환을 제공
- TogglePassword: 사용자 편의를 위해 비밀번호 보이기/숨기기 기능 제공
- CodeTimer: 회원가입 확인 코드의 남은 유효 시간 안내

## HookS
- useCustomLogin: 로그인 상태 관리, 로그인 및 로그아웃 처리, 페이지 이동, 로그인 모달 열기/닫기 기능 제공

## Slices
- loginSlice: Redux를 사용하여 로그인 상태 관리, 로그인 및 로그아웃 기능을 제공하며, 로그인 성공 시 쿠키에 사용자 정보를 저장하고, 실패 시 에러 메시지 처리

## Utils
- cookieUtil: cookie를 설정, 가져오고, 삭제하는 기능 제공
- jwtUtil: Axios 객체를 생성하고, 요청 및 응답 인터셉터를 설정하여 JWT 토큰 갱신과 인증 처리를 자동으로 관리

## Features
1. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/member/signup.md">**입력 검증**</a>: 입력받은 값의 형식 및 일치 여부와 필수 약관 동의 여부를 검증합니다.
2. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/member/signup.md">**이메일 및 닉네임 중복 확인**</a>: 입력받은 이메일 및 닉네임이 이미 등록되어 있는지 확인합니다.
3. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/member/signup.md">**회원가입 코드 메일 전송**</a>: 회원가입 확인 코드를 이메일로 전송하고 유효한지 확인합니다.
4. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/member/signup.md">**비밀번호 보이기 토글**</a>: 비밀번호를 입력할 때 입력된 내용을 보이거나 숨길 수 있게 합니다.
5. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/member/signup.md">**회원가입**</a>: 새로운 회원을 등록하고, 가입 성공 시 로그인 모달창으로 전환합니다.
6. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/member/login.md">**일반 로그인**</a>: 이메일과 비밀번호를 입력받아 로그인 처리를 합니다.
7. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/member/login.md">**소셜 로그인**</a>: 카카오 계정으로 인증을 요청하여 회원가입 및 로그인을 합니다.
8. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/member/UpdatePw.md">**임시 비밀번호 메일 전송**</a>: 임시 비밀번호를 생성하여 이메일로 전송합니다.
9. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/member/UpdatePw.md">**비밀번호 변경**</a>: 재발급된 비밀번호를 확인한 후 새로운 비밀번호로 변경합니다.
10. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/member/message.md">**쪽지 전송**</a>: 사용자가 다른 회원에게 쪽지를 전송할 수 있습니다.
<br>

---

# II. Mypage 마이페이지 기능

## Overview
회원 정보 수정, 작성한 게시글/댓글 조회, 추천한 게시글 조회, 모임 조회, 쪽지 조회 및 삭제 기능을 포함합니다.

## APIs
- myPageApi

## Components
- UpdateInfo: 회원 프로필 사진, 닉네임, 기타 정보 조회 및 변경
- UpdatePassword: 현재 비밀번호 변경
- MyBoardComponent: 작성한 게시글의 목록 조회
- MyReplyComponent: 작성한 댓글의 목록 조회
- MyLikedComponent: 추천한 게시글의 목록 조회
- MySendMsgComponent: 보낸 쪽지의 목록 조회 및 삭제 
- MyReceiveMsgComponent: 받은 쪽지의 목록 조회 삭제
- ReadMsgComponent: 쪽지 상세 조회 및 답장, 삭제, 신고

## Hooks
- useCustomMsgMove: 로그인 권한에 따라 마이페이지 또는 관리자 페이지의 보낸 쪽지함 / 받은 쪽지함 / 쪽지 상세 페이지로 이동

## Features
1. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/member/myPage.md">**작성한 게시글 조회**</a>: 로그인한 회원이 작성한 게시글 목록을 조회할 수 있습니다.
2. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/member/myPage.md">**작성한 댓글 조회**</a>: 작성한 댓글 목록을 조회할 수 있습니다.
3. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/member/myPage.md">**추천 게시글 조회**</a>: 추천한 게시글을 조회할 수 있습니다.
4. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/member/myPage.md">**보낸 쪽지함**</a>: 보낸 쪽지 목록을 조회합니다.
5. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/member/myPage.md">**받은 쪽지함**</a>: 받은 쪽지 목록을 조회합니다.
6. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/member/myPage.md">**쪽지 상세 조회**</a>: 쪽지 상세 페이지를 조회합니다.
