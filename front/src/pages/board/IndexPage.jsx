import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // 현재 경로 가져오기
import { NavLink } from "react-router-dom";

import BasicLayout from "../../layouts/BasicLayout";
import SideBar from "../../components/common/SideBar";
import PageTitle from "../../components/common/PageTitle";
import SearchBar from "../../components/common/SearchBar";

const IndexPage = () => {
    const location = useLocation();

    let sub = "";
    let info = "";

    switch (location.pathname) {
        case '/board':
            sub = "전체";
            info = "자취 고수들의 공유마당을 둘러보고 꿀팁을 얻어가세요!";
            break;
        case '/board/restaurants':
            sub = "맛집";
            info = "내 자취방 근처에 맛집이?";
            break;
        case '/board/clean':
            sub = "청소";
            info = "오늘도 열심히 깨끗하게! 자신있게!";
            break;
        case '/board/recipe':
            sub = "요리";
            info = "오늘은 내가 바로 셰프! 멋진 실력을 보여주세요!";
            break;
        case '/board/wealth':
            sub = "재테크";
            info = "텅장만 갖고 있지말고 불려보세요!";
            break;
        case '/board/interior':
            sub = "인테리어";
            info = "이왕이면 예쁘게 인테리어하고 싶다면?";
            break;
        case '/board/policy':
            sub = "정책";
            info = "나만 몰라, 청년정책! 도와줘요~";
            break;
        case '/board/etc':
            sub = "기타";
            info = "더 자세하고 다양한 꿀팁 집합소!";
            break;
        default:
            sub = "전체";
            info = "자취 고수들의 공유마당을 둘러보고 꿀팁을 얻어가세요!";
            break;
    }

    const categories = ['카테고리', '맛집', '청소', '요리', '재테크', '인테리어', '정책', '기타'];
    const filters = ['검색 필터', '제목', '작성자', '내용'];

    const hideSearchBarPaths = ['/board/add', '/board/modify', '/board/:id'];
    const hideSubAndInfoPaths = ['/board/add', '/board/modify', '/board/:id'];

    const shouldHideSearchBar = (pathname) => {
        return hideSearchBarPaths.some((path) => {
            const regex = new RegExp(`^${path.replace(/:\w+/g, '\\w+')}$`);
            return regex.test(pathname);
        });
    };

    const shouldHideSubAndInfo = (pathname) => {
        return hideSubAndInfoPaths.some((path) => {
            const regex = new RegExp(`^${path.replace(/:\w+/g, '\\w+')}$`);
            return regex.test(pathname);
        });
    };

    return (
        <BasicLayout>
            <SideBar pageType="board" />
            <div className="contents">


                {/* <button className='write-button'>
                    <NavLink to={'/board/read'} >게시글 읽기</NavLink>
                </button> */}
                {!shouldHideSubAndInfo(location.pathname) && (
                    <PageTitle main="꿀팁" sub={sub} info={info} />
                )}
                {!shouldHideSearchBar(location.pathname) && (
                    <SearchBar categories={categories} filters={filters} />
                )}
                <Outlet />
            </div>
        </BasicLayout>
    );
}

export default IndexPage;
