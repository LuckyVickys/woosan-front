import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;

const UploadPage = lazy(() => import("../pages/adminPage/UploadPage"));
const ReportPage = lazy(() => import("../pages/adminPage/ReportPage"));
const NoticePage = lazy(() => import("../pages/adminPage/NoticePage"));
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
            path: "reports",
            element: (
                <Suspense fallback={Loading}>
                    <ReportPage />
                </Suspense>
            ),
        },
        {
            path: "notices",
            element: (
                <Suspense fallback={Loading}>
                    <NoticePage />
                </Suspense>
            ),
        },
        {
            path: "msgs",
            element: (
                <Suspense fallback={Loading}>
                    <MsgPage />
                </Suspense>
            ),
        },
    ];
};

export default adminPageRouter;
