# 패키지 구조
(첨부 예정)

# 라우터
모든 경로를 **컴포넌트**로 구현하였으며, **root**는 주요 경로를, **나머지 라우터들**은 카테고리별 세부 경로를 설정했습니다.
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
- `{children}`과 `Outlet`을 사용하여 세부 경로인 `boardRouter`, `matchingRouter`, `csRouter`, `myPageRouter`, `adminPageRouter`를 설정하였습니다.

# 레이아웃
라우터의 세부 경로들은 **주요 경로의 레이아웃을 공유**하도록 구성하여, **페이지 간 일관된 사용자 경험**을 제공합니다.<br>
### 기본 레이아웃 설계
<img src="https://github.com/user-attachments/assets/6ae98df6-9143-4951-a1b1-3bf90aa1ecec" width=550px height-300px/><br>
- `BasicLayout` 컴포넌트를 설계하여 모든 주요 페이지에 공통으로 적용되는 기본 레이아웃을 구현했습니다.<br>
- 상단의 `Header`, `HeaderBar`, `Nav`, `area 영역`('div' 태그 사용), 하단의 `Footer`, 그리고 스크롤 상단 버튼인 `TopButton`으로 구성되어 있습니다.<br>
- `BasicLayout` 컴포넌트는 area 영역의 `{children}`을 통해 페이지별 해당 컴포넌트를 동적으로 렌더링할 수 있도록 설계했습니다.<br>
### 페이지별 레이아웃 설계
<img src="https://github.com/user-attachments/assets/adb6290f-7608-4805-a347-0b22badc2e34" width=500px height-300px/><br>
- 모든`IndexPage`에 `BasicLayout`을 적용하여 페이지 구조를 통일성 있게 유지하였습니다.<br>
- 각 페이지에서 BasicLayout 내에 `SideBar`와 `contents 영역`('div' 태그 사용)을 배치하고, contents 영역에 `PageTitle`, `SearchBar`를 배치하여 페이지별 구성을 구현했습니다.<br>
- 각 경로에 맞는 컴포넌트를 `Outlet`을 통해 적절하게 배치했습니다.
- 이를 통해 페이지에 따라 다르게 표시되는 `SideBar`, `PageTitle`, `SearchBar` 등을 동적으로 렌더링할 수 있게 했습니다.

# URL 접근 제어
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
<br>
# 반응형 웹
<img src="https://github.com/user-attachments/assets/5236c2ff-9966-41ea-ac33-e132ea000a08" /><br>
**react-responsive 라이브러리**와 **Media Query**를 사용하여 화면 크기에 따라 조건부 렌더링을 구현했습니다.<br>

### 디바이스별 레이아웃
MainPage와 모든 IndexPage에서 `Desktop`, `Tablet`, `Mobile` 컴포넌트를 사용하여 각 디바이스에 맞는 레이아웃을 적용했습니다.
- **`Mobile`**: 767px 이하
- **`Tablet`**: 768px ~ 1024px
- **`Desktop`**: 1025px 이상

# 라이크 모드 및 다크 모드
<img src="https://github.com/user-attachments/assets/37a63636-9fb0-4df8-8b83-4e5eee685c10" /><br>
깊이감과 대비를 제공하는 #333333 배경색과 회색 계열의 #d3d3d3 폰트 색상으로 **눈의 피로를 줄이고 가독성을 높여, 주요 콘텐츠를 강조**했습니다.
<br>
- `ProfileDropdow 컴포넌트`에서 `useState`, `useEffect`, `onClick 함수`를 활용하여 구현했습니다.
- common.scss에서 `CSS 변수`를 사용하여 기본 배경색과 폰트 색상을 설정하고, 다크 모드 활성화 시 `배경색과 폰트 색상을 동적으로 변경`되도록 했습니다.
- `display-theme='dark` 속성을 통해 전체 페이지의 색상 테마를 관리하며, 다양한 UI 요소(로고, 버튼, 입력 필드 등)에 다크 모드를 동일하게 적용했습니다.

# 스크롤 상단 버튼
<img src="https://github.com/user-attachments/assets/9ec5a36d-905c-4a7b-9718-e5cbef2710d5" /><br>
사용자가 페이지를 스크롤할 때 **버튼의 가시성**을 조절하여 **페이지 최상단으로 자연스럽게 이동**할 수 있도록 구현했습니다.

- `TopButton 컴포넌트`에서 `useState`와 `useEffect 훅`을 사용하여 스크롤 위치에 따른 버튼의 가시성을 제어합니다.
- `window.addEventListener`를 통해 스크롤 이벤트를 감지하고,  `window.scrollTo`를 사용하여 페이지 최상단으로 스크롤합니다.
- 항상 화면 오른쪽 하단에 고정되도록 기본 레이아웃에 배치했습니다.
