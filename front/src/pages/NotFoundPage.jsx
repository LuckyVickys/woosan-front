import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
import notFound from "../assets/image/notFound.png";
import "../assets/styles/App.scss";

const NotFoundPage = () => {
    const navigate = useNavigate();

    const moveToMain = () => {
        navigate('/'); // 메인 페이지로 이동
    }

    return (
        <div>
            <div className='notFound-container'>
                <img src={notFound} className='notFound' alt="not found" />
                <button className='notFoundBtn' onClick={moveToMain}>메인으로</button>
            </div>
        </div>
    );
};

export default NotFoundPage;
