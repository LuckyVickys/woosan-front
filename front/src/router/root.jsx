import { Suspense, lazy } from "react";
import boardRouter from "./boardRouter"
import matchingRouter from "./matchingRouter"
import csRouter from "./csRouter"
import myPageRouter from "./myPageRouter";

import {createBrowserRouter} from "react-router-dom";
// const {createBrowserRouter} = require("react-router-dom");

const Loading = <div>Loading....</div>

const Main = lazy(() => import("../pages/main/MainPage"))
const Board = lazy(() => import("../pages/board/ListPage"))
const Matching = lazy(() => import("../pages/matching/ListPage"))
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
        element: <Suspense fallback={Loading}><Board/></Suspense>,
        children: boardRouter()
    },
    {
        path: "matching",
        element: <Suspense fallback={Loading}><Matching/></Suspense>,
        children: matchingRouter()
    },
    {
        path: "cs",
        element: <Suspense fallback={Loading}><CS/></Suspense>,
        children: csRouter()
    },
    {
        path: "myPage",
        element: <Suspense fallback={Loading}><MyPage/></Suspense>,
        children: myPageRouter()
    },
    // {
    //     path: "adminMyPage",
    //     element: <Suspense fallback={Loading}><AdminMyPage/></Suspense>
    // }
])

export default root;