import { useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const getNum = (param, defaultValue) => {
    if (!param) {
        return defaultValue;
    }
    return parseInt(param);
};

const useCustomMove = (defaultPath = "/board") => {
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const [queryParams] = useSearchParams();

    const page = getNum(queryParams.get('page'), 1);
    const size = getNum(queryParams.get('size'), 10);
    const categoryName = queryParams.get('categoryName') || '';

    const queryDefault = createSearchParams({ page, size, categoryName }).toString();

    const moveToList = (pageParam) => {
        let queryStr = "";

        if (pageParam) {
            const pageNum = getNum(pageParam.page, 1);
            const sizeNum = getNum(pageParam.size, 10);
            const category = pageParam.categoryName || categoryName;

            queryStr = createSearchParams({ page: pageNum, size: sizeNum, categoryName: category }).toString();
        } else {
            queryStr = queryDefault;
        }

        console.log(`Navigating to ${defaultPath} with query: ${queryStr}`);

        navigate({
            pathname: defaultPath,
            search: queryStr
        });

        setRefresh(!refresh);
    };

    const moveToModify = (num) => {
        console.log(`Navigating to ${defaultPath}/modify/${num}`);
        navigate({
            pathname: `${defaultPath}/modify/${num}`,
            search: queryDefault
        });
    };

    const moveToRead = (num, serverData) => {
        console.log(`Navigating to ${defaultPath}/${num}`);
        navigate({
            pathname: `${defaultPath}/${num}`,
            search: queryDefault,
            state: { serverData }
        });
    };

    return { moveToList, moveToModify, moveToRead, page, size, categoryName, refresh };
};

export default useCustomMove;
