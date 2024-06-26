import React from 'react';
import { useLocation } from 'react-router-dom';

import BasicLayout from "../../layouts/BasicLayout";
import Sidebar from "../../components/common/Sidebar";
import ListTitle from "../../components/board/list/ListTitle";

const UpdateInfoPage = () => {

    const location = useLocation();
    
    let sub= "";

    switch (location.pathname) {
        case '/myPage/':
            sub = "회원 정보 수정";
            break;
        case '/myPage/board/':
            sub = "작성한 게시글 조회";
            break;
        case '/myPage/reply/':
            sub = "작성한 댓글 조회";
            break;
        case '/myPage/like/':
            sub = "추천 게시글";
            break;
        case '/myPage/matching/':
            sub = "모임 조회";
            break;
        case '/myPage/msg/':
            sub = "쪽지함";
            break;
        default:
            sub = "회원 정보 수정";
            break;
    }

    return (
        <BasicLayout>
            <Sidebar pageType="myPage" />
            <div className="contents">
                <ListTitle main="마이페이지" sub={sub}/>
                콘텐츠 부분
            </div>
        </BasicLayout>
    );
}

export default UpdateInfoPage;