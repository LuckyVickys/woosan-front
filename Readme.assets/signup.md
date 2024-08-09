# 회원가입

## 입력 검증
![image](https://github.com/user-attachments/assets/f8cc5667-0b30-4a59-ab79-743c72783479)<br>
이메일, 닉네임, 비밀번호의 형식 및 일치 여부와 필수 약관 동의 여부를 검증하며, 결과에 따라 사용자에게 오류 메시지를 제공합니다.
- (예: 필수 입력사항입니다. 이메일 형식이 올바르지 않습니다. 이미 존재하는 이메일입니다. 비밀번호와 일치하지 않습니다. 등)

## 이메일 및 닉네임 중복 확인
![image](https://github.com/user-attachments/assets/d87733b7-7a92-4ee6-8711-0e3bd2dc44a7)<br>
이메일 및 닉네임의 중복을 사전에 확인하여 **오류를 최소화**하고 **고유한 회원 정보**를 갖도록 합니다.
- axios의 GET 메서드를 사용하여 checkEmail 함수와 checkNickname 함수를 구현하여 중복 여부를 서버에 요청합니다.
- 중복 체크 버튼을 클릭하면 서버에서 검증 결과를 오류 메시지를 통해 반환하고, 해당 결과에 따라 UI를 업데이트합니다.

## 이메일 인증 코드 전송
![image](https://github.com/user-attachments/assets/aad080dd-1489-42b9-9287-b8c40f96eac0)<br>

## 비밀번호 보이기 토글

## 회원가입




