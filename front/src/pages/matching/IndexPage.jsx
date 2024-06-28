import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // 현재 경로 가져오기

import BasicLayout from "../../layouts/BasicLayout";
import SideBar from "../../components/common/SideBar";
import PageTitle from "../../components/common/PageTitle";


const IndexPage = () => {

  const location = useLocation();
  
  let sub= "";
  let info= "";

  switch (location.pathname) {
      case '/matching/':
          sub = "전체";
          info="혼자서는 싫고 여럿이서 모이고 싶을 때, 확인해보세요!"
          break;
      case '/matching/regularly/':
          sub = "정기 모임";
          info="매달, 매주, 매일 함께 모이면 즐거움이 2배!"
          break;
      case '/matching/temporary/':
          sub = "번개";
          info="갑자기 사람이 필요해요!"
          break;
      case '/matching/self/':
          sub = "셀프 소개팅";
          info="새로운 인연을 만나는 소중한 순간, 특별한 소개팅!"
          break;
      default:
          sub = "전체";
          info="혼자서는 싫고 여럿이서 모이고 싶을 때, 확인해보세요!"
          break;
  }

  return (
      <BasicLayout>
          <SideBar pageType="matching" />
          <div className="contents">
              <PageTitle main="모임" sub={sub} info={info}/>
              <Outlet />
          </div>
      </BasicLayout>
  );
}

export default IndexPage;