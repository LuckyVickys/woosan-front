# Board 기능

## Overview
게시글 번역·요약, 게시글 검색·추천, 신고 접수, 게시글 및 댓글 CRUD 등의 기능을 포함합니다.

## APIs
- boardApi
- replyApi
- likesApi
- summaryApi

## Key Components
- ListComponent / AddComponent / ModifyComponent: 게시글 목록 조회, 작성, 수정
- ReadComponent / ReplyComponent: 게시글 상세 조회 및 댓글 조회
- SearchListComponent: 기본 검색 결과 및 연관 검색 결과 제공
- SuggestedBoardList: 주간 인기글 제공
- BoardDropDown / ReplyDropDown: 게시글 및 댓글 드롭다운
- MsgModal / ReportModal: 쪽지 전송, 신고 접수

## Hooks
- useCustomMove: 게시글 관련 페이지간 이동, 페이지네이션, 카테고리 필터링 제공

## Utils
- DateUtil: 날짜 문자열을 다양한 형식으로 변환하고, 현재 시간과의 상대적인 시간을 계산
- convertUtil: 텍스트에서 줄바꿈 문자를 < br > HTML 태그로 변환하여 반환
- validationUtil: 게시글 작성 시 발생하는 예외 처리

## Features
1. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/board/board.md">**게시글 번역**</a>: Naver Papago API를 활용하여 한/영 번역을 할 수 있습니다. 
2. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/board/board.md">**게시글 요약**</a>: Naver Clova Summary API를 사용하여 긴 게시글을 핵심 내용으로 요약합니다.
3. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/board/board.md">**기본/연관 검색**</a>: 카테고리, 제목/작성자/내용, 키워드 기반의 기본 검색과 연관 검색을 제공합니다.
4. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/board/board.md">**검색어 자동 완성 (초성)**</a>: 검색어 자동 완성 기능과 초성 검색 기능을 지원합니다.
5. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/board/board.md">**일별 검색어 순위**</a>: 매일 인기 있는 검색어를 순위별로 제공합니다.
6. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/board/board.md">**연관 게시물 추천**</a>: 현재 조회 중인 게시글과 관련된 게시물을 추천합니다.
7. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/board/board.md">**주간 인기글**</a>: 주간 단위로 가장 많이 조회되거나 추천된 인기 게시글을 보여줍니다.
8. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/board/board.md">**게시글 목록**</a>: 모든 게시글을 한눈에 볼 수 있습니다.
9. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/board/board.md">**게시글 단건 조회**</a>: 특정 게시글의 상세 내용을 조회합니다. 
10. <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/board/board.md">**게시글 수정, 삭제**</a>: 게시글의 제목, 내용, 이미지 등을 수정할 수 있으며, 삭제 가능합니다.
<br>
