# 회원가입

## 입력 검증
![image](https://github.com/user-attachments/assets/f8cc5667-0b30-4a59-ab79-743c72783479)<br>
**이메일, 닉네임, 비밀번호의 형식 및 일치 여부와 필수 약관 동의 여부를 검증**합니다.<br>
- `useState 훅` 사용하여 입력 결과에 따라 사용자에게 에러 메시지 및 Swal 창를 제공합니다.
- (예: 필수 입력사항입니다. 이메일 형식이 올바르지 않습니다. 이미 존재하는 이메일입니다. 비밀번호와 일치하지 않습니다. 등)

## 이메일 및 닉네임 중복 확인
![image](https://github.com/user-attachments/assets/d87733b7-7a92-4ee6-8711-0e3bd2dc44a7)<br>
이메일 및 닉네임의 중복을 사전에 확인하여 **오류를 최소화**하고 **고유한 회원 정보**를 갖도록 합니다.
- `axios`의 `GET 메서드`를 사용한 `checkEmail` API와 `checkNickname` API를 구현하여 `중복 여부를 서버에 요청`합니다.
- 중복 체크 버튼을 클릭하면 서버에서 검증 결과를 오류 메시지를 통해 반환하고, 해당 결과에 따라 `UI를 업데이트`합니다.

## 이메일 인증 코드 전송
![image](https://github.com/user-attachments/assets/aad080dd-1489-42b9-9287-b8c40f96eac0)<br>
이메일 중복 체크 후 입력받은 이메일로 인증 코드를 전송하고, **5분 내에 인증 코드를 입력**하도록 유도하여 이메일 인증 절차를 진행합니다.
- 이메일이 유효하고 인증 코드가 성공적으로 전송되면, **인증 코드 입력란**을 나타나며 **타이머가 시작**합니다.
- CodeTimer 컴포넌트를 사용하여 남은 시간을 안내하며, 타이머가 종료되면 인증 실패 메시지가 Swal 창으로 뜹니다.

## 비밀번호 보이기 토글
![image](https://github.com/user-attachments/assets/6379964d-ed38-431e-84c4-214b0946f0f7)<br>
사용자가 비밀번호를 입력할 때 입력된 내용을 보이거나 숨길 수 있게 하여, **비밀번호 입력의 정확성을 향상**시킵니다.
- `TogglePassword 컴포넌트`에 react-icons 패키지의 아이콘을 사용하여 비밀번호의 보이기/숨기기 상태를 시각적으로 표시합니다.
- `toggleVisibility 함수`는  boolean 값인 `isVisible 함수`의 상태를 반전시켜 비밀번호의 보이기/숨기기 상태를 변경합니다.
 
## 회원가입
![image](https://github.com/user-attachments/assets/dc69c828-8af2-4269-9e22-a40b2ae8ecc0)<br>
이메일, 닉네임, 비밀번호, 필수 약관의 유효성 검사를 한 후에 **회원가입 API를 호출**하여 사용자를 **회원으로 등록**합니다.
- 모든 입력 검증을 통과한 경우, `axios`의 `POST 메서드`를 사용하여 `signUp 함수를 호출`하고 회원가입을 시도합니다.
- `회원가입 성공 여부`에 따라 Swal 창을 띄우고, 성공 시 `로그인 모달창으로 전환`합니다.
- `로그인 링크`를 클릭하면 해당 모달창이 열립니다.