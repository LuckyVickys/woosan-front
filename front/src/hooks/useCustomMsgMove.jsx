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
    const userRole = loginState.memberType;

    const defaultPath = userRole === "ADMIN" ? "/admin/message" : "/mypage/message";
    const sendListPath = userRole === "ADMIN" ? "/admin/send-message" : "/mypage/send-message";
    const receiveListPath = userRole === "ADMIN" ? "/admin/receive-message" : "/mypage/receive-message";

    const page = getNum(queryParams.get('page'), 1);
    const size = getNum(queryParams.get('size'), 10);

    const queryDefault = createSearchParams({ page, size }).toString();

    const moveToSendList = (pageParam) => {
        const pageNum = getNum(pageParam?.page, page);
        const sizeNum = getNum(pageParam?.size, size);

        const queryStr = createSearchParams({ page: pageNum, size: sizeNum }).toString();

        console.log(`Navigating to ${sendListPath} with query: ${queryStr}`);

        navigate({
            pathname: sendListPath,
            search: queryStr
        });

        setRefresh(!refresh);
    };
    
    const moveToReceiveList = (pageParam) => {
        const pageNum = getNum(pageParam?.page, page);
        const sizeNum = getNum(pageParam?.size, size);

        const queryStr = createSearchParams({ page: pageNum, size: sizeNum }).toString();

        console.log(`Navigating to ${receiveListPath} with query: ${queryStr}`);

        navigate({
            pathname: receiveListPath,
            search: queryStr
        });

        setRefresh(!refresh);
    };

    const moveToRead = (num, customPath) => {
        const path = customPath || defaultPath;
        console.log(`Navigating to ${path}/${num}`);
        navigate({
            pathname: `${path}/${num}`,
            search: queryDefault
        });
    };

    return { moveToSendList, moveToReceiveList, moveToRead, page, size, refresh };
};

export default useCustomMsgMove;
