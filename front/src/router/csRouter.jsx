import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>

const Notices = lazy(() => import("../pages/cs/notices/ListPage"))
const Event = lazy(() => import("../pages/cs/EventPage"))

const csRouter = ()=> {
    return [
        {
            path: "event",
            element: <Suspense fallback={Loading}><Event/></Suspense>
        }
    ]
}

export default csRouter;