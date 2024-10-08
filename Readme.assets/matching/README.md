# Matching 모임 기능

## Overview
우산 프로젝트의 모임 기능입니다. 로그인 사용자들의 레벨에 따라 모임 기능을 사용 할 수 있습니다.

## APIs
### matchingBoardApi : 
  - 모든 모임 조회
  - 정기, 번개, 셀프 소개팅 조회
  - 정기, 번개, 셀프 소개팅 생성
  - 특정 사용자가 작성한 모임 조회
  - 모임 수정
  - 모임 삭제
  - 모임 조회수 관리

### matchingBoardReplyApi :
- 댓글 생성, 삭제
- 답글 생성, 삭제
- 특정 모임 댓글 답글 조회

### memberMatchingApi :
- 모임 가입 요청
- 모임 가입 요청 취소
- 가입 승인, 거절
- 모임 탈퇴
- 모임원 강퇴
- 모임원 리스트 조회
- 모임 가입 요청 리스트 조회

## Key Components
- KakaoMapModal / LocationField : 카카오맵 API를 활용 지도검색과 키워드검색을 결합하여 모임 장소 등록
- FilterBar / SelfFilterBar : 모임 분류를 위한 태그 필터와 셀프 소개팅 필터
- MemberManagement : 모임 가입신청관리와 모임원 관리 
  
## Hooks
- useRegularly : 정기 모임 불러오기
- useTemporary : 번개 불러오기
- useSelf : 셀프 소개팅 불러오기

## Features

- 공통
  - <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/matching/matching.md">**모임 조회**</a> : 로그인한 회원만 정기모임, 번개, 셀프 소개팅 조회
  - <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/matching/matching.md">**댓글&답글 등록, 삭제**</a> : 모임 댓글&답글 등록과 작성자만 삭제 가능
  
- 모임장
  - <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/matching/matching.md">**모임 생성, 수정, 삭제**</a> : 회원 레벨에 따른 모임 생성, 수정, 삭제 
  - <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/matching/matching.md">**가입 신청 승인, 거절**</a> : 모임 가입 신청과 승인, 거절 관리
  - <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/matching/matching.md">**모임원 강퇴**</a> : 해당 모임의 모임장만 모임원 강퇴 가능

- 모임원
  - <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/matching/matching.md">**가입 신청, 취소**</a> : 로그인한 회원만 가입신청과 취소가 가능
  - <a href="https://github.com/LuckyVickys/woosan-front/blob/main/Readme.assets/matching/matching.md">**모임 탈퇴**</a> : 모임에 가입한 회원만 모임 탈퇴 가능


## Key Features

- Kakao Map API
  - 지도 검색과 키워드 검색을 결합하여 모임 장소 등록 기능
  
  ![카카오맵](./gif/39.png)
  
- Redis를 이용한 조회수 관리
  - Redis에 키와 유효 기간을 설정하여 사용자의 조회 기록을 관리해서 조회수 중복과 조작을 방지하고,
  트래픽이 많아지고 다중 접속 시에도 조회수 업데이트가 실시간으로 정확하게 반영되도록 구현했습니다.

- 자바스크립트 객체를 이용한 모임 구분
  - 필터를 이용한 모임 구분  : 모임 태그 필드를 자바스크립트 객체로 사용하여 다중 필드를 사용하지 않고,
  모임을 대 분류 중 분류로 관리 할 수 있게 만들었습니다. 다중 필드를 사용하는 방식에 비해 데이터 구조의 단순성을 유지하면서,
  확장성과 유지 보수성을 높였습니다.
  
  ![필터](./gif/40.png)

 



