import React from 'react';
import { useLocation } from 'react-router-dom';

import BasicLayout from "../../../layouts/BasicLayout";
import Sidebar from "../../../components/common/Sidebar";
import ListTitle from "../../../components/board/list/ListTitle";

const ListPage = () => {

    const location = useLocation();
    
    let sub= "";
    let info= "";

    switch (location.pathname) {
        case '/cs/':
            sub = "공지사항";
            info="우리는 함께 산다에서 알려드립니다."
            break;
        case '/cs/event/':
            sub = "이벤트";
            info="포인트를 받을 수 있는 기회!"
            break;
        default:
            sub = "공지사항";
            info="우리는 함께 산다에서 알려드립니다."
            break;
    }

    return (
        <BasicLayout>
            <Sidebar pageType="cs" />
            <div className="contents">
                <ListTitle main="고객지원" sub={sub} info={info}/>
                콘텐츠 부분
            </div>
        </BasicLayout>
    );
}

export default ListPage;