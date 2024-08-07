import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>

const Notices = lazy(() => import("../pages/cs/notices/ListPage"))
const ReadPage = lazy(() => import("../pages/cs/notices/ReadPage"))

const csRouter = () => {
    return [
        {
            path: "",
            element: <Navigate replace to="/cs/notices" />
        },
        {
            path: "notices",
            element: <Suspense fallback={Loading}><Notices /></Suspense>
        },
        {
            path: "notices/:id",
            element: <Suspense fallback={Loading}><ReadPage /></Suspense>
        },
    ]
}

export default csRouter;
