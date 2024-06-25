import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>

const MyBoardPage = lazy(()=> import("../pages/myPage/MyBoardPage"))
const MyReplyPage = lazy(()=> import("../pages/myPage/MyReplyPage"))
const LikePage = lazy(()=> import("../pages/myPage/LikePage"))
const MyMatchingPage = lazy(()=> import("../pages/myPage/MyMatchingPage"))
const MyMsgPage = lazy(()=> import("../pages/myPage/MyMsgPage"))

const myPageRouter = ()=> {
    return [
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