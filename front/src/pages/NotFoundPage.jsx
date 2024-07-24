import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
import notFound from "../assets/image/notFound.png";
import Header from "../components/common/Header";
import Nav from "../components/common/Nav";
import Footer from "../components/common/Footer";
import "../assets/styles/App.scss";

const NotFoundPage = () => {
    const navigate = useNavigate();

    const moveToMain = () => {
        navigate('/');
    }

    return (
        <div className="wrapper">
            <Header />
            <Nav />
            <div className='notFound-container'>
                <img src={notFound} className='notFound' alt="not found" />
                <button className='notFoundBtn' onClick={moveToMain}>메인으로</button>
            </div>
            <Footer />
        </div>
    );
};

export default NotFoundPage;
