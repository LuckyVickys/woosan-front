import { Suspense, lazy } from "react";
import AccessRoute from './AccessRoute';

const Loading = <div>Loading....</div>

const UpdateInfoPage = lazy(()=> import("../pages/myPage/UpdateInfoPage"))
const MyBoardPage = lazy(()=> import("../pages/myPage/MyBoardPage"))
const MyReplyPage = lazy(()=> import("../pages/myPage/MyReplyPage"))
const LikePage = lazy(()=> import("../pages/myPage/LikePage"))
const MyMatchingPage = lazy(()=> import("../pages/myPage/MyMatchingPage"))
const MySendMsgPage = lazy(()=> import("../pages/myPage/MySendMsgPage"))
const MyReceiveMsgPage = lazy(()=> import("../pages/myPage/MyReceiveMsgPage"))
const MyMsgPage = lazy(()=> import("../pages/myPage/MyMsgPage"))

const myPageRouter = ()=> {
    return [
        {
            path: "",
            element: (
                <AccessRoute allowedRoles={['USER', 'ADMIN']}>
                    <Suspense fallback={Loading}><UpdateInfoPage/></Suspense>
                </AccessRoute>
            )
        },
        {
            path: "info",
            element: (
                <AccessRoute allowedRoles={['USER', 'ADMIN']}>
                    <Suspense fallback={Loading}><UpdateInfoPage/></Suspense>
                </AccessRoute>
            )
        },
        {
            path: "board",
            element: (
                <AccessRoute allowedRoles={['USER', 'ADMIN']}>
                    <Suspense fallback={Loading}><MyBoardPage/></Suspense>
                </AccessRoute>
            )
        },
        {
            path: "reply",
            element: (
                <AccessRoute allowedRoles={['USER', 'ADMIN']}>
                    <Suspense fallback={Loading}><MyReplyPage/></Suspense>
                </AccessRoute>
            )
        },
        {
            path: "like",
            element: (
                <AccessRoute allowedRoles={['USER', 'ADMIN']}>
                    <Suspense fallback={Loading}><LikePage/></Suspense>
                </AccessRoute>
            )
        },
        {
            path: "matching",
            element: (
                <AccessRoute allowedRoles={['USER', 'ADMIN']}>
                    <Suspense fallback={Loading}><MyMatchingPage/></Suspense>
                </AccessRoute>
            )
        },
        {
            path: "send-message",
            element: (
                <AccessRoute allowedRoles={['USER', 'ADMIN']}>
                    <Suspense fallback={Loading}><MySendMsgPage/></Suspense>
                </AccessRoute>
            )
        },
        {     
            path: "receive-message",
            element: (
                <AccessRoute allowedRoles={['USER', 'ADMIN']}>
                    <Suspense fallback={Loading}><MyReceiveMsgPage/></Suspense>
                </AccessRoute>
            )
        },
        {
            path: "message/:id",
            element: (
                <AccessRoute allowedRoles={['USER', 'ADMIN']}>
                    <Suspense fallback={Loading}><MyMsgPage/></Suspense>
                </AccessRoute>
            )
        }
    ]
}

export default myPageRouter;
