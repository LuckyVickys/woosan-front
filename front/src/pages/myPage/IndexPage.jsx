import React from "react";
import { Outlet, useLocation } from "react-router-dom"; // 현재 경로 가져오기

import BasicLayout from "../../layouts/BasicLayout";
import SideBar from "../../components/common/SideBar";
import PageTitle from "../../components/common/PageTitle";

const IndexPage = () => {
    const location = useLocation();

    let sub = "";

    switch (location.pathname) {
        case "/mypage/info":
            sub = "회원 정보 수정";
            break;
        case "/mypage/board":
            sub = "작성한 게시글 조회";
            break;
        case "/mypage/reply":
            sub = "작성한 댓글 조회";
            break;
        case "/mypage/like":
            sub = "추천 게시글";
            break;
        case "/mypage/matching":
            sub = "모임 조회";
            break;
        case "/mypage/send-message":
            sub = "보낸 쪽지함";
            break;
        case "/mypage/receive-message":
            sub = "받은 쪽지함";
            break;
        default:
            sub = "회원 정보 수정";
            break;
    }

    const hideSubPaths = ["/mypage/message/:id"];

    const shouldHideSub = (pathname) => {
        return hideSubPaths.some((path) => {
            const regex = new RegExp(`^${path.replace(/:\w+/g, "\\w+")}$`);
            return regex.test(pathname);
        });
    };

    return (
        <BasicLayout>
            <SideBar pageType="mypage" />
            <div className="contents">
                {!shouldHideSub(location.pathname) && (
                    <PageTitle main="마이페이지" sub={sub} />
                )}
                <Outlet />
            </div>
        </BasicLayout>
    );
};

export default IndexPage;
