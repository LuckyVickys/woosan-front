import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;

const UploadPage = lazy(() => import("../pages/adminPage/UploadPage"));
const ReportPage = lazy(() => import("../pages/adminPage/ReportPage"));
const NoticePage = lazy(() => import("../pages/adminPage/NoticePage"));
const SendMsgPage = lazy(() => import("../pages/adminPage/SendMsgPage"));
const ReceiveMsgPage = lazy(() => import("../pages/adminPage/ReceiveMsgPage"));

const adminPageRouter = () => {
    return [
        {
            path: "",
            element: <Navigate replace to="/adminPage/upload" />,
        },
        {
            path: "upload",
            element: (<Suspense fallback={Loading}><UploadPage /></Suspense>),
        },
        {
            path: "reports",
            element: (<Suspense fallback={Loading}>ReportPage /></Suspense>),
        },
        {
            path: "notices",
            element: (<Suspense fallback={Loading}><NoticePage /></Suspense>),
        },
        {
            path: "msg/send",
            element: (<Suspense fallback={Loading}><SendMsgPage /></Suspense>),
        },
        {
            path: "msg/receive",
            element: (<Suspense fallback={Loading}><ReceiveMsgPage /></Suspense>),
        },
    ];
};

export default adminPageRouter;
