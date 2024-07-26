import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import MyMsgPage from "../pages/myPage/MyMsgPage";
import AccessRoute from './AccessRoute';

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
            element: (
                <AccessRoute allowedRoles={['ADMIN']}>
                  <Navigate replace to="/admin/upload" />
                </AccessRoute>
            )
        },
        {
            path: "upload",
            element: (
                <AccessRoute allowedRoles={['ADMIN']}>
                  <Suspense fallback={Loading}><UploadPage /></Suspense>
                </AccessRoute>
            )
        },
        {
            path: "report",
            element: (
                <AccessRoute allowedRoles={['ADMIN']}>
                  <Suspense fallback={Loading}><ReportPage /></Suspense>
                </AccessRoute>
            )
        },
        {
            path: "report/:id",
            element: (
                <AccessRoute allowedRoles={['ADMIN']}>
                  <Suspense fallback={Loading}><ReportReadPage /></Suspense>
                </AccessRoute>
            )
        },
        {
            path: "notice",
            element: (
                <AccessRoute allowedRoles={['ADMIN']}>
                  <Suspense fallback={Loading}><NoticePage /></Suspense>
                </AccessRoute>
            )
        },
        {
            path: "notice/add",
            element: (
                <AccessRoute allowedRoles={['ADMIN']}>
                  <Suspense fallback={Loading}><AddNoticePage /></Suspense>
                </AccessRoute>
            )
            
        },
        {
            path: "notice/modify/:id",
            element: (
                <AccessRoute allowedRoles={['ADMIN']}>
                  <Suspense fallback={Loading}><ModifyNoticePage /></Suspense>
                </AccessRoute>
            )
        },
        {
            path: "send-message",
            element: (
                <AccessRoute allowedRoles={['ADMIN']}>
                  <Suspense fallback={Loading}><MySendMsgPage /></Suspense>
                </AccessRoute>
            )
        },
        {
            path: "receive-message",
            element: (
                <AccessRoute allowedRoles={['ADMIN']}>
                  <Suspense fallback={Loading}><MyReceiveMsgPage /></Suspense>
                </AccessRoute>
            )
        },
        {
            path: "message/:id",
            element: (
                <AccessRoute allowedRoles={['ADMIN']}>
                  <Suspense fallback={Loading}><MyMsgPage /></Suspense>
                </AccessRoute>
            )
        },
    ];
};

export default adminPageRouter;
