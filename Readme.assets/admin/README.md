# 관리자 기능 

## Overview
배너 번경, 신고 관리, 공지사항 관리, 쪽지함 등의 기능을 포함합니다.

## APIs
- adminApi

## Key Components
- ReportListComponent / ReportReadComponent: 신고 목록 및 상세 조회, 신고글 삭제 등의 신고 처리 

## Hooks
- useCustomReportMove: 신고 관리 관련 페이지 이동, 페이지네이션 제공
- useCustomNoticeMove: 공지사 관리 관련 페이지 이동, 페이지네이션 제공

## Features

### 1. 배너 변경
![스크린샷 2024-07-29 104909](https://github.com/user-attachments/assets/0a8a7719-903b-42aa-a49d-d5317fd36732)
 - 기존 메인페이지 배너에 등록된 사진 파일 목록을 가져옵니다.
  - 기존 사진 파일 삭제가 가능합니다.
  - 파일 선택 버튼을 클릭하여 사진파일 추가가 가능합니다.
  - 저장을 클릭하여 변경사항을 저장합니다.
<br>

### 2. 신고 관리
- **신고 목록 조회**
![스크린샷 2024-07-28 163150](https://github.com/user-attachments/assets/a5a35439-35c2-49d4-8146-35c359e7b7f3)
  - 등록된 신고 내용(내용, 유형 등)이 확인 가능합니다.
  - 관리자 확인 여부 확인 가능합니다.
<br>

- **신고 상세 조회**
![스크린샷 2024-07-28 163150](https://github.com/user-attachments/assets/7502f64a-5f40-4586-b423-f010b3b313b5)
![스크린샷 2024-08-10 065920](https://github.com/user-attachments/assets/516f01f0-08e1-478e-8c66-032395dd6bcf)
![스크린샷 2024-08-10 065906](https://github.com/user-attachments/assets/5838c4dc-5267-4921-9a68-02b327684619)
  - 바로가기를 통해 신고 대상으로 이동이 가능합니다. (댓글, 게시글 -> 해당 게시글) (쪽지 -> 쪽지 Modal)
  - 신고 대상자 탈퇴를 통해 사용자가 로그인 하지 못하게 정지처리가 가능합니다.
  - 신고글 삭제를 통해 신고 대상을 삭제합니다.
  - 처리 완료를 통해 신고 확인처리합니다.
<br>

### 3.공지사항 관리
![스크린샷 2024-07-28 170406](https://github.com/user-attachments/assets/85a02a2a-0578-4224-8221-5b2634646981)
  - 등록된 공지사항 목록 확인 가능합니다.
  - 공지사항 쓰기 클릭 시 작성 폼으로 이동합니다.
  - 제목 클릭시 상세내용 조회가 가능합니다.
<br>

### 4.쪽지함
![스크린샷 2024-07-28 170513](https://github.com/user-attachments/assets/40c2d910-3941-4723-81f3-0ad8ef066c58)
  - 보낸쪽지 및 받은 쪽지 내용확인이 가능합니다.
  - 삭제 버튼 클릭시 받은 쪽지 삭제가 가능합니다.
  - 내용을 클릭하여 쪽지 확인이 가능하고 답장이 가능합니다.
