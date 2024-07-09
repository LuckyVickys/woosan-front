import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // 현재 경로 가져오기
import BasicLayout from "../../layouts/BasicLayout";
import SideBar from "../../components/common/SideBar";
import PageTitle from "../../components/common/PageTitle";
import SearchBar from "../../components/common/SearchBar";

const IndexPage = () => {
    const location = useLocation();
    const [categoryName, setCategoryName] = useState('');
    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        const categoryNameParam = searchParams.get('categoryName') || '';
        setCategoryName(categoryNameParam);
    }, [location.search]);

    let sub = "";
    let info = "";

    switch (categoryName) {
        case '맛집':
            sub = "맛집";
            info = "내 자취방 근처에 맛집이?";
            break;
        case '청소':
            sub = "청소";
            info = "오늘도 열심히 깨끗하게! 자신있게!";
            break;
        case '요리':
            sub = "요리";
            info = "오늘은 내가 바로 셰프! 멋진 실력을 보여주세요!";
            break;
        case '재테크':
            sub = "재테크";
            info = "텅장만 갖고 있지말고 불려보세요!";
            break;
        case '인테리어':
            sub = "인테리어";
            info = "이왕이면 예쁘게 인테리어하고 싶다면?";
            break;
        case '정책':
            sub = "정책";
            info = "나만 몰라, 청년정책! 도와줘요~";
            break;
        case '기타':
            sub = "기타";
            info = "더 자세하고 다양한 꿀팁 집합소!";
            break;
        default:
            sub = "전체";
            info = "자취 고수들의 공유마당을 둘러보고 꿀팁을 얻어가세요!";
            break;
    }

    const categories = [
        { label: '전체', value: '' },
        { label: '맛집', value: '맛집' },
        { label: '청소', value: '청소' },
        { label: '요리', value: '요리' },
        { label: '재테크', value: '재테크' },
        { label: '인테리어', value: '인테리어' },
        { label: '정책', value: '정책' },
        { label: '기타', value: '기타' }
    ];

    const filters = [
        { label: '제목', value: 'title' },
        { label: '내용', value: 'content' },
        { label: '작성자', value: 'writer' },
        { label: '제목 + 내용', value: 'titleOrContent' },
        { label: '제목 + 작성자', value: 'titleOrWriter' },
        { label: '내용 + 작성자', value: 'contentOrWriter' },
        { label: '제목 + 내용 + 작성자', value: 'titleOrContentOrWriter' }
    ];

    const hideSearchBarPaths = ['/board/add', '/board/modify/:id', '/board/:id'];
    const hideSubAndInfoPaths = ['/board/add', '/board/modify/:id', '/board/:id'];

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
