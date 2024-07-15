import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>

const UpdateInfoPage = lazy(()=> import("../pages/myPage/UpdateInfoPage"))
const MyBoardPage = lazy(()=> import("../pages/myPage/MyBoardPage"))
const MyReplyPage = lazy(()=> import("../pages/myPage/MyReplyPage"))
const LikePage = lazy(()=> import("../pages/myPage/LikePage"))
const MyMatchingPage = lazy(()=> import("../pages/myPage/MyMatchingPage"))
const MyMsgPage = lazy(()=> import("../pages/myPage/MyMsgPage"))

const myPageRouter = ()=> {
    return [
        {
            path: "/myPage",
            element: <Navigate replace to="/myPage/info"/>
        },
        {
            path: "info",
            element: <Suspense fallback={Loading}><UpdateInfoPage/></Suspense>
        },
        {
            path: "board",
            element: <Suspense fallback={Loading}><MyBoardPage/></Suspense>
        },
        {
            path: "reply",
            element: <Suspense fallback={Loading}><MyReplyPage/></Suspense>
        },
        {
            path: "like",
            element: <Suspense fallback={Loading}><LikePage/></Suspense>
        },
        {
            path: "matching",
            element: <Suspense fallback={Loading}><MyMatchingPage/></Suspense>
        },
        {
            path: "msg",
            element: <Suspense fallback={Loading}><MyMsgPage/></Suspense>
        }
    ]
}

export default myPageRouter;