import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;

const UploadPage = lazy(() => import("../pages/adminPage/UploadPage"));
const ReportPage = lazy(() => import("../pages/adminPage/ReportPage"));
const NoticePage = lazy(() => import("../pages/adminPage/NoticePage"));
const MySendMsgPage = lazy(() => import("../pages/myPage/MySendMsgPage"));
const MyReceiveMsgPage = lazy(() => import("../pages/myPage/MyReceiveMsgPage"));
const MsgPage = lazy(() => import("../pages/adminPage/MsgPage"));

const adminPageRouter = () => {
    return [
        {
            path: "",
            element: <Navigate replace to="/adminPage/upload" />,
        },
        {
            path: "upload",
            element: (
                <Suspense fallback={Loading}>
                    <UploadPage />
                </Suspense>
            ),
        },
        {
            path: "report",
            element: (
                <Suspense fallback={Loading}>
                    <ReportPage />
                </Suspense>
            ),
        },
        {
            path: "notice",
            element: (
                <Suspense fallback={Loading}>
                    <NoticePage />
                </Suspense>
            ),
        },
        {
            path: "msg/send",
            element: (
                <Suspense fallback={Loading}>
                    <MySendMsgPage />
                </Suspense>
            ),
        },
        {
            path: "msg/receive",
            element: (
                <Suspense fallback={Loading}>
                    <MyReceiveMsgPage />
                </Suspense>
            ),
        },
    ];
};

export default adminPageRouter;
