import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BasicLayout from "../../layouts/BasicLayout";
import SideBar from "../../components/common/SideBar";
import PageTitle from "../../components/common/PageTitle";
import { Desktop, Tablet, Mobile } from '../../layouts/ResponsiveComponent';

const IndexPage = () => {
    const location = useLocation();

    let sub = "";
    let info = "";

    switch (true) {
        case location.pathname.startsWith('/matching/regularly'):
            sub = "정기 모임";
            info = "매달, 매주, 매일 함께 모이면 즐거움이 2배!";
            break;
        case location.pathname.startsWith('/matching/temporary'):
            sub = "번개";
            info = "갑자기 사람이 필요해요!";
            break;
        case location.pathname.startsWith('/matching/self'):
            sub = "셀프 소개팅";
            info = "새로운 인연을 만나는 소중한 순간, 특별한 소개팅!";
            break;
        case location.pathname.startsWith('/matching'):
            sub = "전체";
            info = "혼자서는 싫고 여럿이서 모이고 싶을 때, 확인해보세요!";
            break;
        default:
            sub = "전체";
            info = "혼자서는 싫고 여럿이서 모이고 싶을 때, 확인해보세요!";
            break;
    }

    const hideTopBarPaths = ['/matching/CreateMatching'];

    const shouldHideTopBar = (pathname) => {
        return hideTopBarPaths.some((path) => {
            const regex = new RegExp(`^${path.replace(/:\w+/g, '\\w+')}$`);
            return regex.test(pathname);
        });
    };

    return (
        <>
            <Desktop>
                <BasicLayout>
                    <SideBar pageType="matching" />
                    <div className="contents">
                        {!shouldHideTopBar(location.pathname) && (
                            <PageTitle main="모임" sub={sub}/>
                        )}
                        <Outlet />
                    </div>
                </BasicLayout>
            </Desktop>
            <Tablet>
                <BasicLayout>
                    <div className='dropdown-sidebar-contents'>
                        <SideBar pageType="matching" />
                        <div className="contents">
                            {!shouldHideTopBar(location.pathname) && (
                                <PageTitle main="모임" sub={sub}/>
                            )}
                            <Outlet />
                        </div>
                    </div>
                </BasicLayout>
            </Tablet>
            <Mobile>
                <BasicLayout>
                    <div className='dropdown-sidebar-contents'>
                        <SideBar pageType="matching" />
                        <div className="contents">
                            {!shouldHideTopBar(location.pathname) && (
                                <PageTitle main="모임" sub={sub} />
                            )}
                            <Outlet />
                        </div>
                    </div>
                </BasicLayout>
            </Mobile>
        </>
    );
}

export default IndexPage;
