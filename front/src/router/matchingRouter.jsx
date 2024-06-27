import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>

const ListPage = lazy(() => import("../pages/matching/ListPage"))

const matchingRouter = ()=> {
    return [
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