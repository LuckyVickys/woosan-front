# 신고 접수

## I. 신고하기 버튼
![스크린샷 2024-08-10 114024](https://github.com/user-attachments/assets/b7ceb795-9806-4bf5-b0a9-196b65bf8998)
게시글과 댓글의 우측 상단 모서리에 위치한 **케밥 메뉴 아이콘을 클릭**하면, **드롭다운**이 열리고 **신고하기 버튼을 클릭**할 수 있습니다.
- 작성자가 사용자일 경우, 신고하기 버튼은 보이지 않습니다.
- 관리자는 신고할 수 없습니다.
<br>

## II. 내용 입력
![스크린샷 2024-08-10 113635](https://github.com/user-attachments/assets/c7a38e9f-61f6-4ff8-aa7c-43c3ecd91d39)<br>
사용자는 신고 모달창에 **신고 사유를 입력**하고 **관련된 첨부파일을 업로드**해서, **게시글, 댓글, 쪽지를 신고**할 수 있습니다.
- 신고 유형은 자동으로 입력됩니다.
- 신고 사유와 첨부파일은 `필수 입력값`으로, 입력하지 않을 시에 Swal창으로 에러 메세지를 표시합니다.
- `첨부파일은 1~3개`로,  `'png', 'jpg', 'jpeg'`만 첨부 가능합니다.
<br>

## III. 신고 접수
![스크린샷 2024-08-10 113754](https://github.com/user-attachments/assets/e0739770-4efc-4ca8-b8ad-8dc8d78b11a1)<br>
![스크린샷 2024-08-10 113857](https://github.com/user-attachments/assets/311a9ddd-9651-46a2-ab3d-323a80b270f2)<br>
내용 입력과 첨부파일 유효성 검사를 완료하면, **신고 접수 API를 요청하여 관리자에게 신고 내용을 전송**합니다.
- 신고를 제출하기 전에 Swal창으로 신고 유형을 안내함으로써 사용자가 `신고 내용을 검토하고 제출`할 수 있도록 합니다.
- `axios`의 `POST 메서드`를 사용하여, `addReport API`를 구현했습니다.
- 신고 유형, 신고 대상 ID, 신고자 ID, 신고 사유, 첨부된 이미지들을 FormData를 사용하여 서버에 전송합니다.
- 사용자는 본인이 보낸 신고 내용을 확인할 수 없습니다.
- 신고 완료 여부를 Swal 창으로 알립니다.
