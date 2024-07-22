import React, { useState, useEffect } from 'react';
import { getBannerList } from '../../api/adminApi';
import '../../assets/styles/banner.scss';

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchBanners = async () => {
            const bannerUrls = await getBannerList();
            setBanners(bannerUrls);
        };

        fetchBanners();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [banners]);

    const handlePrevClick = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + banners.length) % banners.length);
    };

    const handleNextClick = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
    };

    return (
        <div className="main-banner">
            <button className="banner-slider-left" onClick={handlePrevClick}></button>
            {banners.length > 0 && (
                <div className="banner-image-wrapper">
                    <img src={banners[currentIndex]} alt="banner" className="banner-image" />
                </div>
            )}
            <button className="banner-slider-right" onClick={handleNextClick}></button>
        </div>
    );
};

export default Banner;
