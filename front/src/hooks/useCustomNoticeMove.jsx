import { useState } from "react";
import {
    createSearchParams,
    useNavigate,
    useSearchParams,
} from "react-router-dom";

const getNum = (param, defaultValue) => {
    const num = parseInt(param, 10);
    return isNaN(num) ? defaultValue : num;
};

const useCustomNoticeMove = (defaultPath = "/adminPage/notice") => {
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const [queryParams] = useSearchParams();

    const page = getNum(queryParams.get("page"), 1);
    const size = getNum(queryParams.get("size"), 10);
    const categoryName = queryParams.get("categoryName") || "";

    const queryDefault = createSearchParams({
        page,
        size,
        categoryName,
    }).toString();

    const moveToList = (pageParam) => {
        const pageNum = getNum(pageParam?.page, page);
        const sizeNum = getNum(pageParam?.size, size);
        const category = pageParam?.categoryName || categoryName;

        const queryStr = createSearchParams({
            page: pageNum,
            size: sizeNum,
            categoryName: category,
        }).toString();

        console.log(`Navigating to ${defaultPath} with query: ${queryStr}`);

        navigate({
            pathname: defaultPath,
            search: queryStr,
        });

        setRefresh(!refresh);
    };

    const moveToRead = (num, customPath) => {
        const path = customPath || defaultPath;
        console.log(`Navigating to ${path}/${num}`);
        navigate({
            pathname: `${path}/${num}`,
            search: queryDefault,
        });
    };

    return {
        moveToList,
        moveToRead,
        page,
        size,
        categoryName,
        refresh,
    };
};

export default useCustomNoticeMove;
