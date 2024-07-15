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
        case "/adminPage/reports":
            sub = "신고 관리";
            break;
        case "/adminPage/notices":
            sub = "공지사항 관리";
            break;
        case "/adminPage/msgs":
            sub = "쪽지함";
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
