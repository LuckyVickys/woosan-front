import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import SideBar from "../../components/common/SideBar";
import PageTitle from "../../components/common/PageTitle";
import TopButton from "../../components/common/TopButton";

const IndexPage = () => {
    const location = useLocation();

    let sub = "";
    let info = "";

    switch (location.pathname) {
        case "/cs/":
            sub = "공지사항";
            info = "우리는 함께 산다에서 알려드립니다.";
            break;
        case "/cs/event/":
            sub = "이벤트";
            info = "포인트를 받을 수 있는 기회!";
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
        <>
            <BasicLayout>
                <SideBar pageType="cs" />
                <div className="contents">
                    {!shouldHideSubAndInfo(location.pathname) && (
                        <PageTitle main="고객지원" sub={sub} />
                    )}
                    <Outlet />
                </div>
            </BasicLayout>
            <TopButton/>
        </>
    );
};

export default IndexPage;
