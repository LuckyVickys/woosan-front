import React, { useState, useEffect } from 'react';
import { BiSolidToTop } from "react-icons/bi";

const TopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const moveToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <button
            className={`move-to-top ${isVisible ? 'visible' : ''}`}
            onClick={moveToTop}
        >
            <BiSolidToTop className="topbutton" />
        </button>
    );
}

export default TopButton;