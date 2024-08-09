# 패키지 구조
(첨부 예정)

# 라우터
모든 경로를 **컴포넌트**로 구현하였으며, `root`는 주요 경로를, 나머지 라우터들은 카테고리별 세부 경로를 설정했습니다.
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
<img src="https://github.com/user-attachments/assets/5bc1975a-1639-4b2e-94a2-cb06bb6790c5" width=550px height-300px/><br>
- `BasicLayout` 컴포넌트를 설계하여 모든 주요 페이지에 공통으로 적용되는 기본 레이아웃을 구현했습니다.<br>
- 상단의 `Header`, `HeaderBar`, `Nav`, `area 영역`('div' 태그 사용), 하단의 `Footer`, 그리고 페이지 상단으로 이동할 수 있는 `TopButton`으로 구성되어 있습니다.<br>
- `BasicLayout` 컴포넌트는 area 영역의 `{children}`을 통해 페이지별 해당 컴포넌트를 동적으로 렌더링할 수 있도록 설계했습니다.<br>
### 페이지별 레이아웃 설계
<img src="https://github.com/user-attachments/assets/73f15ac2-e5d3-45e8-98cd-4e22d057999f" width=500px height-300px/><br>
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

# 반응형 웹
**react-responsive 라이브러리**와 **Media Query**를 사용하여 화면 크기에 따라 조건부 렌더링을 구현했습니다.<br>
MainPage와 모든 IndexPage에서 `Desktop`, `Tablet`, `Mobile` 컴포넌트를 사용하여 각 디바이스에 맞는 레이아웃을 적용했습니다.
### 디바이스별 레이아웃
- **`Mobile`**: 767px 이하
- **`Tablet`**: 768px ~ 1024px
- **`Desktop`**: 1025px 이상
        import React from 'react';
        import { useMediaQuery } from 'react-responsive';
        
        export const Desktop = ({ children }) => {
          const isDesktop = useMediaQuery({ minWidth: 1025 });
          return isDesktop ? children : null;
        };
        
        export const Tablet = ({ children }) => {
          const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
          return isTablet ? children : null;
        };
        
        export const Mobile = ({ children }) => {
          const isMobile = useMediaQuery({ maxWidth: 767 });
          return isMobile ? children : null;
        };
<br>
        
