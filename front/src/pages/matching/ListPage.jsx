import React from 'react';
import { useLocation } from 'react-router-dom';

import BasicLayout from "../../layouts/BasicLayout";
import Sidebar from "../../components/common/Sidebar";
import ListTitle from "../../components/board/list/ListTitle";

const ListPage = () => {

    const location = useLocation();
    
    let sub= "";
    let info= "";

    switch (location.pathname) {
        case '/matching/':
            sub = "전체";
            info="혼자서는 싫고 여럿이서 모이고 싶을 때, 확인해보세요!"
            break;
        case '/matching/regularly/':
            sub = "정기 모임";
            info="매달, 매주, 매일 함께 모이면 즐거움이 2배!"
            break;
        case '/matching/temporary/':
            sub = "번개";
            info="갑자기 사람이 필요해요!"
            break;
        case '/matching/self/':
            sub = "셀프 소개팅";
            info="새로운 인연을 만나는 소중한 순간, 특별한 소개팅!"
            break;
        default:
            sub = "전체";
            info="혼자서는 싫고 여럿이서 모이고 싶을 때, 확인해보세요!"
            break;
    }

    return (
        <BasicLayout>
            <Sidebar pageType="matching" />
            <div className="contents">
                <ListTitle main="모임" sub={sub} info={info}/>
                콘텐츠 부분
            </div>
        </BasicLayout>
    );
}

export default ListPage;