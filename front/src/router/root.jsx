import { Suspense, lazy } from "react";
import boardRouter from "./boardRouter"
import matchingRouter from "./matchingRouter"
import csRouter from "./csRouter"
import myPageRouter from "./myPageRouter";
import adminPageRouter from "./adminPageRouter";
import AccessRoute from './AccessRoute';

import { createBrowserRouter } from "react-router-dom";

const Loading = <div>Loading....</div>

const Main = lazy(() => import("../pages/main/MainPage"))
const KakaoRedirect = lazy(() => import("../pages/social/KakaoRedirectPage"))

const Board = lazy(() => import("../pages/board/IndexPage"))
const Matching = lazy(() => import("../pages/matching/IndexPage"))
const CS = lazy(() => import("../pages/cs/IndexPage"))
const MyPage = lazy(() => import("../pages/myPage/IndexPage"))
const AdminPage = lazy(() => import("../pages/adminPage/IndexPage"))
const NotFoundPage = lazy(() => import("../pages/NotFoundPage")); // 추가

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },
    {
        path: "kakao",
        element: <Suspense fallback={Loading}><KakaoRedirect/></Suspense>
    },
    {
        path: "board",
        element: <Suspense fallback={Loading}><Board /></Suspense>,
        children: boardRouter()
    },
    {
        path: "matching",
        element: (
            <AccessRoute allowedRoles={['USER', 'ADMIN']}>
              <Suspense fallback={Loading}><Matching /></Suspense>
            </AccessRoute>
          ),
        children: matchingRouter()
    },
    {
        path: "cs",
        element: (
            <Suspense fallback={Loading}><CS /></Suspense>
        ),
        children: csRouter()
    },
    {
        path: "mypage",
        element: (
            <AccessRoute allowedRoles={['USER', 'ADMIN']}>
              <Suspense fallback={Loading}><MyPage /></Suspense>
            </AccessRoute>
        ),
        children: myPageRouter()
    },
    {
        path: "admin",
        element: (
            <AccessRoute allowedRoles={['ADMIN']}>
              <Suspense fallback={Loading}><AdminPage /></Suspense>
            </AccessRoute>
          ),
        children: adminPageRouter()
    },
    {
        path: "*",
        element: <Suspense fallback={Loading}><NotFoundPage /></Suspense>
    }
])

export default root;
