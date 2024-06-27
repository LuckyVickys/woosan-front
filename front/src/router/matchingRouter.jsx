import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>

const ListPage = lazy(() => import("../pages/matching/ListPage"))

const matchingRouter = ()=> {
    return [
        {
            path: "",
            element: <Navigate replace to="/matching/total"/>
        },
        {
            path: "total",
            element: <Suspense fallback={Loading}><ListPage/></Suspense>
        },
        {
            path: "regularly",
            element: <Suspense fallback={Loading}><ListPage/></Suspense>
        },
        {
            path: "temporary",
            element: <Suspense fallback={Loading}><ListPage/></Suspense>
        },
        {
            path: "self",
            element: <Suspense fallback={Loading}><ListPage/></Suspense>
        }
    ]
}

export default matchingRouter;