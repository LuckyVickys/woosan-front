import { Suspense, lazy } from "react";

const {createBrowserRouter} = require("react-router-dom");

const Loading = <div>Loading....</div>

const Main = lazy(() => import("../pages/main/MainPage"))
const Board = lazy(() => import("../pages/board/ListPage"))
const Matching = lazy(() => import("../pages/matchting/common/ListPage"))
const CS = lazy(() => import("../pages/cs/notices/ListPage"))
const MyPage = lazy(() => import("../pages/myPage/UpdateInfoPage"))
// const AdminMyPage = lazy(() => import("../pages/adminMyPage/ReportList"))

const root = createBrowserRouter([
    {
        path: "", 
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "board",
        element: <Suspense fallback={Loading}><Board/></Suspense>
    },
    {
        path: "matching",
        element: <Suspense fallback={Loading}><Matching/></Suspense>
    },
    {
        path: "cs",
        element: <Suspense fallback={Loading}><CS/></Suspense>
    },
    {
        path: "myPage",
        element: <Suspense fallback={Loading}><MyPage/></Suspense>
    },
    // {
    //     path: "adminMyPage",
    //     element: <Suspense fallback={Loading}><AdminMyPage/></Suspense>
    // }
])

export default root;