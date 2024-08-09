# 패키지 구조
(첨부 예정)

# 라우터
### 주요 경로
- **`/`** : `main` 폴더의 `MainPage` 컴포넌트
- **`/kakao`** : `social` 폴더의 `KakaoRedirectPage` 컴포넌트
- **`/board`** : `board` 폴더의 `IndexPage` 컴포넌트
- **`/matching`** : `matching` 폴더의 `IndexPage` 컴포넌트
- **`/cs`** : `cs` 폴더의 `IndexPage` 컴포넌트
- **`/mypage`** : `mypage` 폴더의 `IndexPage` 컴포넌트
- **`/admin`** : `admin` 폴더의 `IndexPage` 컴포넌트
- **`*`** : `NotFoundPage` 컴포넌트
### 세부 경로
- `{children}`과 `Outlet`을 사용하여 주요 경로의 세부 경로인 `boardRouter`, `matchingRouter`, `csRouter`, `myPageRouter`, `adminPageRouter`를 설정하였습니다.

# 레이아웃
라우터의 세부 경로들은 주요 경로의 레이아웃을 공유하도록 구성하여, 페이지 간 일관된 사용자 경험을 제공합니다.<br>
### 기본 레이아웃 설계
<img src="https://github.com/user-attachments/assets/5bc1975a-1639-4b2e-94a2-cb06bb6790c5"/><br>
- `BasicLayout` 컴포넌트를 설계하여 모든 주요 페이지에 공통으로 적용되는 기본 레이아웃을 구현했습니다.<br>
- 상단의 `Header`, `HeaderBar`, `Nav`, `area 영역`('div' 태그 사용), 하단의 `Footer`, 그리고 페이지 상단으로 이동할 수 있는 `TopButton`으로 구성되어 있습니다.<br>
- `BasicLayout` 컴포넌트는 area 영역의 `{children}`을 통해 페이지별 해당 컴포넌트를 동적으로 렌더링할 수 있도록 설계했습니다.<br>

### 페이지별 레이아웃 설계
<img src="https://github.com/user-attachments/assets/73f15ac2-e5d3-45e8-98cd-4e22d057999f"/><br>
- 모든`IndexPage`에 `BasicLayout`을 적용하여 페이지 구조를 통일성 있게 유지하였습니다.<br>
- 각 페이지에서 BasicLayout 내에 `SideBar`와 `contents 영역`('div' 태그 사용)을 배치하고, contents 영역에 `PageTitle`, `SearchBar`를 배치하여 페이지별 구성을 구현했습니다.<br>
- 각 경로에 맞는 컴포넌트를 `Outlet`을 통해 적절하게 배치했습니다.
- 이를 통해 페이지에 따라 다르게 표시되는 사이드 바, 검색 바, 페이지 제목 등을 동적으로 렌더링할 수 있게 했습니다.
