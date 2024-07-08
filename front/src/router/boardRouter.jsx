import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>

const ListPage = lazy(() => import("../pages/board/ListPage"))
const ReadPage = lazy(() => import("../pages/board/ReadPage"))
const AddPage = lazy(() => import("../pages/board/AddPage"));
const ModifyPage = lazy(() => import("../pages/board/ModifyPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage")); // 추가


const boardRouter = () => {
    return [
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
            element: <Suspense fallback={Loading}><ListPage /></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><AddPage /></Suspense>
        },
        {
            path: "modify/:id",
            element: <Suspense fallback={Loading}><ModifyPage /></Suspense>
        },
        {
            path: ":id",
            element: <Suspense fallback={Loading}><ReadPage /></Suspense>
        },
        {
            path: "*", // catch-all route
            element: <Suspense fallback={Loading}><NotFoundPage /></Suspense>
        }
    ];
};

export default boardRouter;
