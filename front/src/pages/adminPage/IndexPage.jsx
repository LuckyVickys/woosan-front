import React from "react";
import { Outlet, useLocation } from "react-router-dom"; // 현재 경로 가져오기

import BasicLayout from "../../layouts/BasicLayout";
import SideBar from "../../components/common/SideBar";
import PageTitle from "../../components/common/PageTitle";

const IndexPage = () => {
    const location = useLocation();

    let sub = "";

    switch (location.pathname) {
        case "/adminPage/upload":
            sub = "배너 관리";
            break;
        case "/adminPage/report":
            sub = "신고 관리";
            break;
        case "/adminPage/notice":
            sub = "공지사항 관리";
            break;
        case "/adminPage/msg/send":
            sub = "보낸 쪽지함";
            break;
        case "/adminPage/msg/receive":
            sub = "받은 쪽지함";
            break;
        default:
            sub = "배너 관리";
            break;
    }

    return (
        <BasicLayout>
            <SideBar pageType="adminPage" />
            <div className="contents">
                <PageTitle main="관리자 페이지" sub={sub} />
                <Outlet />
            </div>
        </BasicLayout>
    );
};

export default IndexPage;
