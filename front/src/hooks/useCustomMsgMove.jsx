import { useState } from "react";
import { useSelector } from "react-redux";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const getNum = (param, defaultValue) => {
    const num = parseInt(param, 10);
    return isNaN(num) ? defaultValue : num;
};

const useCustomMsgMove = () => {
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const [queryParams] = useSearchParams();
    const loginState = useSelector((state) => state.loginSlice);
    const userRole = loginState.role;

    const defaultPath = userRole === "ADMIN" ? "/adminPage/message" : "/myPage/message";

    const page = getNum(queryParams.get('page'), 1);
    const size = getNum(queryParams.get('size'), 10);

    const queryDefault = createSearchParams({ page, size }).toString();

    const moveToList = (pageParam) => {
        const pageNum = getNum(pageParam?.page, page);
        const sizeNum = getNum(pageParam?.size, size);

        const queryStr = createSearchParams({ page: pageNum, size: sizeNum }).toString();

        console.log(`Navigating to ${defaultPath} with query: ${queryStr}`);

        navigate({
            pathname: defaultPath,
            search: queryStr
        });

        setRefresh(!refresh);  // 강제로 리렌더링
    };

    const moveToRead = (num, customPath) => {
        const path = customPath || defaultPath;
        console.log(`Navigating to ${path}/${num}`);
        navigate({
            pathname: `${path}/${num}`,
            search: queryDefault
        });
    };

    return { moveToList, moveToRead, page, size, refresh };
};

export default useCustomMsgMove;
