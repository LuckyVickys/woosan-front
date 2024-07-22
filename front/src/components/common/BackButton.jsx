import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // 뒤로 가기
    };

    return (
        <div className="movePostButton">
            <button button className="listButton" onClick={handleBack} > 뒤로가기
            </button >
        </div >
    );
};

export default BackButton;
