
import { Suspense, lazy } from "react";
import AccessRoute from './AccessRoute';

const Loading = <div>Loading....</div>

const ListPage = lazy(() => import("../pages/board/ListPage"))
const ReadPage = lazy(() => import("../pages/board/ReadPage"))
const AddPage = lazy(() => import("../pages/board/AddPage"));
const ModifyPage = lazy(() => import("../pages/board/ModifyPage"));
const SearchListPage = lazy(() => import("../pages/board/SearchListPage"));


const boardRouter = () => {
    return [
        {
            path: "search",
            element: <Suspense fallback={Loading}><SearchListPage /></Suspense>
        },
        {
            path: "",
            element: <Suspense fallback={Loading}><ListPage /></Suspense>
        },
        {
            path: "restaurants",
            element: <Suspense fallback={Loading}><ListPage /></Suspense>
        },
        {
            path: "clean",
            element: <Suspense fallback={Loading}><ListPage /></Suspense>
        },
        {
            path: "recipe",
            element: <Suspense fallback={Loading}><ListPage /></Suspense>
        },
        {
            path: "wealth",
            element: <Suspense fallback={Loading}><ListPage /></Suspense>
        },
        {
            path: "interior",
            element: <Suspense fallback={Loading}><ListPage /></Suspense>
        },
        {
            path: "policy",
            element: <Suspense fallback={Loading}><ListPage /></Suspense>
        },
        {
            path: "etc",
            element: <Suspense fallback={Loading}><ListPage /></Suspense>
        },
        {
            path: "add",
            element: (
                <AccessRoute allowedRoles={['USER', 'ADMIN']}>
                    <Suspense fallback={Loading}><AddPage /></Suspense>
                </AccessRoute>
            )
        },
        {
            path: "modify/:id",
            element: (
                <AccessRoute allowedRoles={['USER', 'ADMIN']}>
                    <Suspense fallback={Loading}><ModifyPage /></Suspense>
                </AccessRoute>
            )
        },
        {
            path: ":id",
            element: <Suspense fallback={Loading}><ReadPage /></Suspense>
        },
    ];
};

export default boardRouter;