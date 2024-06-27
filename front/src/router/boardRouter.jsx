import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>

const ListPage = lazy(() => import("../pages/board/ListPage"))

const boardRouter = ()=> {
    return [
        {
            path: "",
            element: <Navigate replace to="/board/total"/>
        },
        {
            path: "total",
            element: <Suspense fallback={Loading}><ListPage/></Suspense>
        },
        {
            path: "restaurants",
            element: <Suspense fallback={Loading}><ListPage/></Suspense>
        },
        {
            path: "clean",
            element: <Suspense fallback={Loading}><ListPage/></Suspense>
        },
        {
            path: "recipe",
            element: <Suspense fallback={Loading}><ListPage/></Suspense>
        },
        {
            path: "wealth",
            element: <Suspense fallback={Loading}><ListPage/></Suspense>
        },
        {
            path: "interior",
            element: <Suspense fallback={Loading}><ListPage/></Suspense>
        },
        {
            path: "policy",
            element: <Suspense fallback={Loading}><ListPage/></Suspense>
        },
        {
            path: "etc",
            element: <Suspense fallback={Loading}><ListPage/></Suspense>
        }
    ]
}

export default boardRouter;