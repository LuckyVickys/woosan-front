import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import SideBar from "../../components/common/SideBar";
import PageTitle from "../../components/common/PageTitle";
import { Desktop, Tablet, Mobile } from '../../layouts/ResponsiveComponent';

const getSubTitle = (pathname) => {
    if (pathname.startsWith("/admin/report")) {
        return "신고 관리";
    } if (pathname.startsWith("/admin/message")) {
        return "쪽지";
    }
    switch (pathname) {
        case "/admin/upload":
            return "배너 관리";
        case "/admin/report":
            return "신고 관리";
        case "/admin/notice":
            return "공지사항 관리";
        case "/admin/send-message":
            return "보낸 쪽지함";
        case "/admin/receive-message":
            return "받은 쪽지함";
        default:
            return "배너 관리";
    }
};

const IndexPage = () => {
    const location = useLocation();
    const sub = getSubTitle(location.pathname);

    const hideSubAndInfoPaths = [
        "/admin/notice/add",
        "/admin/notice/modify/:id",
    ];

    const shouldHideSubAndInfo = (pathname) => {
        return hideSubAndInfoPaths.some((path) => {
            const regex = new RegExp(`^${path.replace(/:\w+/g, "\\w+")}$`);
            return regex.test(pathname);
        });
    };

    return (
        <>
            <Desktop>
                <BasicLayout>
                    <SideBar pageType="admin" />
                    <div className="contents">
                        {!shouldHideSubAndInfo(location.pathname) && (
                            <PageTitle main="관리자 페이지" sub={sub} />
                        )}
                        <Outlet />
                    </div>
                </BasicLayout>
            </Desktop>
            <Tablet>
                <BasicLayout>
                    <div className='dropdown-sidebar-contents'>
                        <SideBar pageType="admin" />
                        <div className="contents">
                            {!shouldHideSubAndInfo(location.pathname) && (
                                <PageTitle main="관리자 페이지" sub={sub} />
                            )}
                            <Outlet />
                        </div>
                    </div>
                </BasicLayout>
            </Tablet>
            <Mobile>
                <BasicLayout>
                    <div className='dropdown-sidebar-contents'>
                        <SideBar pageType="admin" />
                        <div className="contents">
                            {!shouldHideSubAndInfo(location.pathname) && (
                                <PageTitle main="관리자 페이지" sub={sub} />
                            )}
                            <Outlet />
                        </div>
                    </div>
                </BasicLayout>
            </Mobile>
        </>
    );
};

export default IndexPage;
