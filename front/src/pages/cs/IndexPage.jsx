import React from "react";
import { Outlet, useLocation } from "react-router-dom"; // 현재 경로 가져오기

import BasicLayout from "../../layouts/BasicLayout";
import SideBar from "../../components/common/SideBar";
import PageTitle from "../../components/common/PageTitle";

const IndexPage = () => {
    const location = useLocation();

    let sub = "";
    let info = "";

    switch (location.pathname) {
        case "/cs/":
            sub = "공지사항";
            info = "우리는 함께 산다에서 알려드립니다.";
            break;
        default:
            sub = "공지사항";
            info = "우리는 함께 산다에서 알려드립니다.";
            break;
    }

    const hideSubAndInfoPaths = ["/cs/notices/:id"];

    const shouldHideSubAndInfo = (pathname) => {
        return hideSubAndInfoPaths.some((path) => {
            const regex = new RegExp(`^${path.replace(/:\w+/g, "\\w+")}$`);
            return regex.test(pathname);
        });
    };

    return (
        <BasicLayout>
            <SideBar pageType="cs" />
            <div className="contents">
                {!shouldHideSubAndInfo(location.pathname) && (
                    <PageTitle main="고객지원" sub={sub} />
                )}
                <Outlet />
            </div>
        </BasicLayout>
    );
};

export default IndexPage;
