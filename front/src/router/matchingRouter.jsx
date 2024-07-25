import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>

const RegularlyPage = lazy(() => import("../pages/matching/RegularlyPage"));
const TemporaryPage = lazy(() => import("../pages/matching/TemporaryPage"));
const SelfPage = lazy(() => import("../pages/matching/SelfPage"));
const CreateMatchingPage = lazy(() => import("../pages/matching/CreateMatchingPage"));
const ModifyMatchingPage = lazy(() => import("../pages/matching/ModifyMatchingPage"));

const matchingRouter = ()=> {
    return [
        {
            path: "regularly",
            element: <Suspense fallback={Loading}><RegularlyPage/></Suspense>
        },
        {
            path: "temporary",
            element: <Suspense fallback={Loading}><TemporaryPage/></Suspense>
        },
        {
            path: "self",
            element: <Suspense fallback={Loading}><SelfPage/></Suspense>
        },
        {
            path: "create",
            element: <Suspense fallback={Loading}><CreateMatchingPage/></Suspense>
        },
        {
            path: "modify/:id",
            element: <Suspense fallback={Loading}><ModifyMatchingPage/></Suspense>
        }
    ]
}

export default matchingRouter;