import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>

const ListPage = lazy(() => import("../pages/board/ListPage"))

const boardRouter = ()=> {
    return [
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