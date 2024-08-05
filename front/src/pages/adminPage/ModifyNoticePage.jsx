import React from "react";
import NoticeModifyComponent from "../../components/cs/NoticeModifyComponent";
import "../../assets/styles/App.scss"; // SCSS 파일 가져오기

const ModifyNoticePage = ({ id }) => {
    return (
        <div className="contents">
            <NoticeModifyComponent />
        </div>
    );
};

export default ModifyNoticePage;
