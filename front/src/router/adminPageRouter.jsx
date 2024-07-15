import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;

const Uploads = lazy(() => import("../pages/adminPage/UploadPage"));
const Reports = lazy(() => import("../pages/adminPage/ReportPage"));
const Notices = lazy(() => import("../pages/adminPage/NoticePage"));
const Msgs = lazy(() => import("../pages/adminPage/MsgPage"));

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
                <Uploads />
            </Suspense>
            ),
        },
        {
            path: "reports",
            element: (
            <Suspense fallback={Loading}>
                <Reports />
            </Suspense>
            ),
        },
        {
            path: "notices",
            element: (
                <Suspense fallback={Loading}>
                <Notices />
                </Suspense>
            ),
        },
        {
            path: "msgs",
            element: (
                <Suspense fallback={Loading}>
                <Msgs />
                </Suspense>
            ),
        },
    ];
};

export default adminPageRouter;
