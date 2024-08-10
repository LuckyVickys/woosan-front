# woosan-front
## I. 패키지 구조
```
📦src
 ┣ 📂api
 ┣ 📂assets
 ┃ ┣ 📂image
 ┃ ┗ 📂styles
 ┣ 📂components
 ┃ ┣ 📂adminPage
 ┃ ┣ 📂board
 ┃ ┣ 📂common
 ┃ ┣ 📂cs
 ┃ ┣ 📂main
 ┃ ┣ 📂matching
 ┃ ┣ 📂member
 ┃ ┗ 📂myPage
 ┣ 📂hooks
 ┣ 📂layouts
 ┣ 📂pages
 ┃ ┣ 📂adminPage
 ┃ ┣ 📂board
 ┃ ┣ 📂cs
 ┃ ┣ 📂main
 ┃ ┣ 📂matching
 ┃ ┣ 📂myPage
 ┃ ┣ 📂social
 ┃ ┗ 📜NotFoundPage.jsx
 ┣ 📂router
 ┣ 📂slices
 ┣ 📂util
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜App.test.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜logo.svg
 ┣ 📜reportWebVitals.js
 ┣ 📜setupTests.js
 ┗ 📜store.js
```
<br>

## II. 라우터
```
 ┣ 📂router
 ┃ ┣ 📜AccessRoute.jsx
 ┃ ┣ 📜adminPageRouter.jsx
 ┃ ┣ 📜boardRouter.jsx
 ┃ ┣ 📜csRouter.jsx
 ┃ ┣ 📜matchingRouter.jsx
 ┃ ┣ 📜myPageRouter.jsx
 ┃ ┗ 📜root.jsx
```
모든 경로를 **컴포넌트**로 구현하였으며, **root**는 주요 경로를, **나머지 라우터들**은 카테고리별 세부 경로를 설정했습니다.
### 1. 주요 경로
- **`/`** : `main` 폴더의 `MainPage` 컴포넌트
- **`/kakao`** : `social` 폴더의 `KakaoRedirectPage` 컴포넌트
- **`/board`** : `board` 폴더의 `IndexPage` 컴포넌트
- **`/matching`** : `matching` 폴더의 `IndexPage` 컴포넌트
- **`/cs`** : `cs` 폴더의 `IndexPage` 컴포넌트
- **`/mypage`** : `mypage` 폴더의 `IndexPage` 컴포넌트
- **`/admin`** : `admin` 폴더의 `IndexPage` 컴포넌트
- **`*`** : `NotFoundPage` 컴포넌트
### 2. 세부 경로
- `{children}`과 `Outlet`을 사용하여 세부 경로인 `boardRouter`, `matchingRouter`, `csRouter`, `myPageRouter`, `adminPageRouter`를 설정하였습니다.
<br>

## III. 레이아웃
```
 ┣ 📂layouts
 ┃ ┣ 📜BasicLayout.jsx
 ┃ ┗ 📜ResponsiveComponent.jsx
```
라우터의 세부 경로들은 **주요 경로의 레이아웃을 공유**하도록 구성하여, **페이지 간 일관된 사용자 경험**을 제공합니다.<br>
### 1. 기본 레이아웃 설계
<img src="https://github.com/user-attachments/assets/6ae98df6-9143-4951-a1b1-3bf90aa1ecec" width=550px height-300px/><br>
- `BasicLayout` 컴포넌트를 설계하여 모든 주요 페이지에 공통으로 적용되는 기본 레이아웃을 구현했습니다.<br>
- 상단의 `Header`, `HeaderBar`, `Nav`, `area 영역`('div' 태그 사용), 하단의 `Footer`, 그리고 스크롤 상단 버튼인 `TopButton`으로 구성되어 있습니다.<br>
- `BasicLayout` 컴포넌트는 area 영역의 `{children}`을 통해 페이지별 해당 컴포넌트를 동적으로 렌더링할 수 있도록 설계했습니다.<br>
### 2. 페이지별 레이아웃 설계
```
 ┣ 📂pages
 ┃ ┣ 📂board
 ┃ ┃ ┣ 📜AddPage.jsx
 ┃ ┃ ┣ 📜IndexPage.jsx
 ┃ ┃ ┣ 📜ListPage.jsx
 ┃ ┃ ┣ 📜ModifyPage.jsx
 ┃ ┃ ┣ 📜ReadPage.jsx
 ┃ ┃ ┗ 📜SearchListPage.jsx
```
<img src="https://github.com/user-attachments/assets/adb6290f-7608-4805-a347-0b22badc2e34" width=500px height-300px/><br>
- 모든`IndexPage`에 `BasicLayout`을 적용하여 페이지 구조를 통일성 있게 유지하였습니다.<br>
- 각 페이지에서 BasicLayout 내에 `SideBar`와 `contents 영역`('div' 태그 사용)을 배치하고, contents 영역에 `PageTitle`, `SearchBar`를 배치하여 페이지별 구성을 구현했습니다.<br>
- 각 경로에 맞는 컴포넌트를 `Outlet`을 통해 적절하게 배치했습니다.
- 이를 통해 페이지에 따라 다르게 표시되는 `SideBar`, `PageTitle`, `SearchBar` 등을 동적으로 렌더링할 수 있게 했습니다.
<br>

## IV. URL 접근 제어
**로그인 여부**와 **사용자 권한**에 따라 **페이지 접근을 제한**하여 **보안을 강화**하고 **사용자 경험을 개선**했습니다.
- `AccessRoute 컴포넌트`를 통해 `USER`, `ADMIN`의 여부에 따라 접근 가능한 페이지를 설정하였습니다.
- `useCustomLogin 훅`을 사용하여 사용자의 `로그인 상태(isLogin)`과 `권한(loginState.memberType)`을 확인합니다.
- 사용자가 로그인하지 않았거나 권한이 없을 경우, 사용자를 `이전 페이지(location.state?.from)` 또는 `메인 페이지`로 `리디렉션`합니다.
- 이를 통해 접근 권한이 없는 페이지로의 직접 접근을 방지합니다.
  
```javascript
import React from 'react';
import { Navigate, useLocation,  } from 'react-router-dom';
import useCustomLogin from '../hooks/useCustomLogin';

const AccessRoute = ({ children, allowedRoles }) => {
  const { isLogin, loginState } = useCustomLogin();
  const location = useLocation();

const fromPath = location.state?.from || '/'; 
  if (!isLogin) {
    return <Navigate to={fromPath} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(loginState.memberType)) {
    return <Navigate to={fromPath} replace />;
  }

  return children;
}; 

export default AccessRoute;
```
