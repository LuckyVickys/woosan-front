import { Suspense, lazy } from "react";
import AccessRoute from './AccessRoute';

const Loading = <div>Loading....</div>

const MatchingPage = lazy(() => import("../pages/matching/MatchingPage"));
const RegularlyPage = lazy(() => import("../pages/matching/RegularlyPage"));
const TemporaryPage = lazy(() => import("../pages/matching/TemporaryPage"));
const SelfPage = lazy(() => import("../pages/matching/SelfPage"));
const CreateMatchingPage = lazy(() => import("../pages/matching/CreateMatchingPage"));
const ModifyMatchingPage = lazy(() => import("../pages/matching/ModifyMatchingPage"));

const matchingRouter = ()=> {
    return [
        {
            path: "",
            element: (
                <AccessRoute allowedRoles={['USER', 'ADMIN']}>
                  <Suspense fallback={Loading}><MatchingPage/></Suspense>
                </AccessRoute>
            )
            
        },
        {
            path: "regularly",
            element: (
                <AccessRoute allowedRoles={['USER', 'ADMIN']}>
                  <Suspense fallback={Loading}><RegularlyPage/></Suspense>
                </AccessRoute>
            )
        },
        {
            path: "temporary",
            element: (
                <AccessRoute allowedRoles={['USER', 'ADMIN']}>
                  <Suspense fallback={Loading}><TemporaryPage/></Suspense>
                </AccessRoute>
            )
        },
        {
            path: "self",
            element: (
                <AccessRoute allowedRoles={['USER', 'ADMIN']}>
                  <Suspense fallback={Loading}><SelfPage/></Suspense>
                </AccessRoute>
            )
            
        },
        {
            path: "create",
            element: (
                <AccessRoute allowedRoles={['USER', 'ADMIN']}>
                  <Suspense fallback={Loading}><CreateMatchingPage/></Suspense>
                </AccessRoute>
            )
        },
        {
            path: "modify/:id",
            element: (
                <AccessRoute allowedRoles={['USER', 'ADMIN']}>
                  <Suspense fallback={Loading}><ModifyMatchingPage/></Suspense>
                </AccessRoute>
            )
        }
    ]
}

export default matchingRouter;