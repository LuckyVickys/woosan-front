import React, { useEffect } from 'react';
import Header from "../components/common/Header";
import Nav from "../components/common/Nav";
import Footer from "../components/common/Footer";
import TopButton from "../components/common/TopButton";

const BasicLayout = ({children}) => {

    useEffect(() => {
        adjustAreaHeight();
        window.addEventListener('resize', adjustAreaHeight);

        return () => {
            window.removeEventListener('resize', adjustAreaHeight);
        };
    }, []);

    const adjustAreaHeight = () => {
        const windowHeight = window.innerHeight;
        const headerHeight = document.querySelector('header').offsetHeight;
        const navHeight = document.querySelector('.nav').offsetHeight;
        const footerHeight = document.querySelector('footer').offsetHeight;
        const area = document.querySelector('.area');

        const areaHeight = windowHeight - headerHeight - navHeight - footerHeight;
        area.style.minHeight = areaHeight + 'px';
    };

    return (
        <div className="wrapper">
            <Header />
            <Nav />
            <div className="area">
                {children}
            </div>
            <TopButton />
            <Footer />
        </div>
    );
}

export default BasicLayout;