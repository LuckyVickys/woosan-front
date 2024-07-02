import React, { useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../../assets/styles/siderbar.scss"; // SCSS 파일 가져오기
import { FaUtensils, FaBroom, FaConciergeBell, FaMoneyBill, FaPaintRoller, FaRegFileAlt, FaTh, FaRegSmile } from 'react-icons/fa'; // react-icons에서 아이콘 가져오기

const SideBar = ({ pageType }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeCategory, setActiveCategory] = React.useState('');

    // URL의 검색 파라미터를 기반으로 activeCategory 상태를 설정
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryName = params.get('categoryName');
        setActiveCategory(categoryName || '');
    }, [location.search]);

    // 카테고리 클릭 시 URL을 변경하고 activeCategory 상태를 업데이트
    const handleNavigation = (categoryName) => {
        setActiveCategory(categoryName);
        navigate(`/board?page=1&size=10&categoryName=${categoryName}`);
    };

    return (
        <aside className="sidebar">
            <div className="catagory">
                {pageType === 'board' && (
                    <>
                        <div className="catagory-title">
                            꿀팁
                        </div>
                        <div className={`sub-category ${activeCategory === '' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('')} className={activeCategory === '' ? 'active' : ''}>
                                <FaTh className={`icon ${activeCategory === '' ? 'active' : ''}`} />전체
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === '맛집' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('맛집')} className={activeCategory === '맛집' ? 'active' : ''}>
                                <FaUtensils className={`icon ${activeCategory === '맛집' ? 'active' : ''}`} />맛집
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === '청소' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('청소')} className={activeCategory === '청소' ? 'active' : ''}>
                                <FaBroom className={`icon ${activeCategory === '청소' ? 'active' : ''}`} />청소
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === '요리' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('요리')} className={activeCategory === '요리' ? 'active' : ''}>
                                <FaConciergeBell className={`icon ${activeCategory === '요리' ? 'active' : ''}`} />요리
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === '재테크' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('재테크')} className={activeCategory === '재테크' ? 'active' : ''}>
                                <FaMoneyBill className={`icon ${activeCategory === '재테크' ? 'active' : ''}`} />재테크
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === '인테리어' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('인테리어')} className={activeCategory === '인테리어' ? 'active' : ''}>
                                <FaPaintRoller className={`icon ${activeCategory === '인테리어' ? 'active' : ''}`} />인테리어
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === '정책' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('정책')} className={activeCategory === '정책' ? 'active' : ''}>
                                <FaRegFileAlt className={`icon ${activeCategory === '정책' ? 'active' : ''}`} />정책
                            </button>
                        </div>
                        <div className={`sub-category ${activeCategory === '기타' ? 'active' : ''}`}>
                            <button onClick={() => handleNavigation('기타')} className={activeCategory === '기타' ? 'active' : ''}>
                                <FaRegSmile className={`icon ${activeCategory === '기타' ? 'active' : ''}`} />기타
                            </button>
                        </div>
                    </>
                )}
                {/* 다른 pageType에 대한 처리 */}
            </div>
        </aside>
    );
};

export default SideBar;
