import React from 'react';
import { useNavigate } from 'react-router-dom';
import ModifyComponent from '../../components/board/ModifyComponent';
import "../../assets/styles/App.scss"; // SCSS 파일 가져오기


const ModifyPage = ({ id }) => {

    return (
        <div className="contents">
            <ModifyComponent />

        </div>
    );
}

export default ModifyPage;