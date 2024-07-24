import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import MyMsgPage from "../pages/myPage/MyMsgPage";

const Loading = <div>Loading....</div>;

const UploadPage = lazy(() => import("../pages/adminPage/UploadPage"));
const ReportPage = lazy(() => import("../pages/adminPage/ReportPage"));
const ReportReadPage = lazy(() => import("../pages/adminPage/ReportReadPage"));

const NoticePage = lazy(() => import("../pages/adminPage/NoticePage"));
const AddNoticePage = lazy(() => import("../pages/adminPage/AddNoticePage"));
const ModifyNoticePage = lazy(() => import("../pages/adminPage/ModifyNoticePage"));

const MySendMsgPage = lazy(() => import("../pages/myPage/MySendMsgPage"));
const MyReceiveMsgPage = lazy(() => import("../pages/myPage/MyReceiveMsgPage"));

const adminPageRouter = () => {
    return [
        {
            path: "",
            element: <Navigate replace to="/admin/upload" />,
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
            path: "report/:id",
            element: (
                <Suspense fallback={Loading}>
                    <ReportReadPage />
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
            path: "notice/add",
            element: (
                <Suspense fallback={Loading}>
                    <AddNoticePage />
                </Suspense>
            ),
        },
        {
            path: "notice/modify/:id",
            element: (
                <Suspense fallback={Loading}>
                    <ModifyNoticePage />
                </Suspense>
            ),
        },
        {
            path: "send-message",
            element: (
                <Suspense fallback={Loading}>
                    <MySendMsgPage />
                </Suspense>
            ),
        },
        {
            path: "receive-message",
            element: (
                <Suspense fallback={Loading}>
                    <MyReceiveMsgPage />
                </Suspense>
            ),
        },
        {
            path: "message/:id",
            element: (
                <Suspense fallback={Loading}>
                    <MyMsgPage />
                </Suspense>
            ),
        },
    ];
};

export default adminPageRouter;
