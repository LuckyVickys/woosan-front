// BasidLayout의 area에서 sidebar를 제외한 콘텐츠 영역의 헤더
import React from "react";
import "../../assets/styles/App.scss";

const PageTitle = ({ main, sub, info }) => {
  return (
    <div className="page-title">
      <div className="category-main-sub">
        <h1>{main}</h1>
        <div className="category-arrow"></div>
        <h1>{sub}</h1>
      </div>
      <div className="category-info">{info}</div>
    </div>
  );
};

export default PageTitle;
