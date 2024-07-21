import React from "react";
import { Outlet, useLocation } from "react-router-dom"; // 현재 경로 가져오기

import BasicLayout from "../../layouts/BasicLayout";
import SideBar from "../../components/common/SideBar";
import PageTitle from "../../components/common/PageTitle";

const getSubTitle = (pathname) => {
    if (pathname.startsWith("/adminPage/report")) {
        return "신고 관리";
    } if (pathname.startsWith("/adminPage/message")) {
        return "쪽지";
    }
    switch (pathname) {
        case "/adminPage/upload":
            return "배너 관리";
        case "/adminPage/report":
            return "신고 관리";
        case "/adminPage/notice":
            return "공지사항 관리";
        case "/adminPage/send-message":
            return "보낸 쪽지함";
        case "/adminPage/receive-message":
            return "받은 쪽지함";
        default:
            return "배너 관리";
    }
};

const IndexPage = () => {
    const location = useLocation();
    const sub = getSubTitle(location.pathname);

    const hideSubAndInfoPaths = [
        "/adminPage/notice/add",
        "/adminPage/notice/modify/:id",
    ];

    const shouldHideSubAndInfo = (pathname) => {
        return hideSubAndInfoPaths.some((path) => {
            const regex = new RegExp(`^${path.replace(/:\w+/g, "\\w+")}$`);
            return regex.test(pathname);
        });
    };

    return (
        <BasicLayout>
            <SideBar pageType="adminPage" />
            <div className="contents">
                {!shouldHideSubAndInfo(location.pathname) && (
                    <PageTitle main="관리자 페이지" sub={sub} />
                )}
                <Outlet />
            </div>
        </BasicLayout>
    );
};

export default IndexPage;
