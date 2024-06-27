import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>

const Notices = lazy(() => import("../pages/cs/notices/ListPage"))
const Event = lazy(() => import("../pages/cs/EventPage"))

const csRouter = ()=> {
    return [
        {
            path: "",
            element: <Navigate replace to="/cs/notices"/>
        },
        {
            path: "notices",
            element: <Suspense fallback={Loading}><Notices/></Suspense>
        },
        {
            path: "event",
            element: <Suspense fallback={Loading}><Event/></Suspense>
        }
    ]
}

export default csRouter;