import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import SideBar from "../../components/common/SideBar";
import PageTitle from "../../components/common/PageTitle";
import TopButton from "../../components/common/TopButton";

const IndexPage = () => {
    const location = useLocation();

    let sub = "";

    switch (location.pathname) {
        case "/myPage/info":
            sub = "회원 정보 수정";
            break;
        case "/myPage/board":
            sub = "작성한 게시글 조회";
            break;
        case "/myPage/reply":
            sub = "작성한 댓글 조회";
            break;
        case "/myPage/like":
            sub = "추천 게시글";
            break;
        case "/myPage/matching":
            sub = "모임 조회";
            break;
        case "/myPage/send-message":
            sub = "보낸 쪽지함";
            break;
        case "/myPage/receive-message":
            sub = "받은 쪽지함";
            break;
        default:
            sub = "회원 정보 수정";
            break;
    }

    const hideSubPaths = ["/myPage/message/:id"];

    const shouldHideSub = (pathname) => {
        return hideSubPaths.some((path) => {
            const regex = new RegExp(`^${path.replace(/:\w+/g, "\\w+")}$`);
            return regex.test(pathname);
        });
    };

    return (
        <>
            <BasicLayout>
                <SideBar pageType="myPage" />
                <div className="contents">
                    {!shouldHideSub(location.pathname) && (
                        <PageTitle main="마이페이지" sub={sub} />
                    )}
                    <Outlet />
                </div>
            </BasicLayout>
            <TopButton />
        </>
    );
};

export default IndexPage;
