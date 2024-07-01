import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // 현재 경로 가져오기

import BasicLayout from "../../layouts/BasicLayout";
import SideBar from "../../components/common/SideBar";
import PageTitle from "../../components/common/PageTitle";


const IndexPage = () => {

    const location = useLocation();
  
    let sub = "";
    let info = "";
  
    switch (location.pathname) {
      case '/cs/':
        sub = "공지사항";
        info = "우리는 함께 산다에서 알려드립니다."
        break;
      case '/cs/event/':
        sub = "이벤트";
        info = "포인트를 받을 수 있는 기회!"
        break;
      default:
        sub = "공지사항";
        info = "우리는 함께 산다에서 알려드립니다."
        break;
    }
  
    return (
      <BasicLayout>
        <SideBar pageType="cs" />
        <div className="contents">
          <PageTitle main="고객지원" sub={sub} info={info} />
          <Outlet />
        </div>
      </BasicLayout>
    );
  }


export default IndexPage;