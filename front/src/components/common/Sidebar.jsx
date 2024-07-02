// import { NavLink, useNavigate } from "react-router-dom";
// import "../../assets/styles/siderbar.scss"; // Import the SCSS file
// import { FaUtensils, FaBroom, FaConciergeBell, FaMoneyBill, FaPaintRoller, FaRegFileAlt, FaTh, FaRegSmile } from 'react-icons/fa'; // Importing icons from react-icons

// const SideBar = ({ pageType }) => {
//     const navigate = useNavigate();

//     const handleNavigation = (categoryName) => {
//         navigate(`/board?page=1&size=10&categoryName=${categoryName}`);
//     };

//     return (
//         <aside className="sidebar">
//             <div className="catagory">
//                 {pageType === 'board' && (
//                     <>
//                         <div className="catagory-title">
//                             꿀팁
//                         </div>
//                         <div className="sub-category">
//                             <button onClick={() => handleNavigation('')} className="active">
//                                 <FaTh className="icon active" />전체
//                             </button>
//                         </div>
//                         <div className="sub-category">
//                             <button onClick={() => handleNavigation('맛집')}>
//                                 <FaUtensils className="icon" />맛집
//                             </button>
//                         </div>
//                         <div className="sub-category">
//                             <button onClick={() => handleNavigation('청소')}>
//                                 <FaBroom className="icon" />청소
//                             </button>
//                         </div>
//                         <div className="sub-category">
//                             <button onClick={() => handleNavigation('요리')}>
//                                 <FaConciergeBell className="icon" />요리
//                             </button>
//                         </div>
//                         <div className="sub-category">
//                             <button onClick={() => handleNavigation('재테크')}>
//                                 <FaMoneyBill className="icon" />재테크
//                             </button>
//                         </div>
//                         <div className="sub-category">
//                             <button onClick={() => handleNavigation('인테리어')}>
//                                 <FaPaintRoller className="icon" />인테리어
//                             </button>
//                         </div>
//                         <div className="sub-category">
//                             <button onClick={() => handleNavigation('정책')}>
//                                 <FaRegFileAlt className="icon" />정책
//                             </button>
//                         </div>
//                         <div className="sub-category">
//                             <button onClick={() => handleNavigation('기타')}>
//                                 <FaRegSmile className="icon" />기타
//                             </button>
//                         </div>
//                     </>
//                 )}
//                 {pageType === 'matching' && (
//                     <>
//                         <div className="catagory-title">
//                             모임
//                         </div>
//                         <div className="sub-category">
//                             <NavLink to={'/matching/total'} activeClassName="active"><FaTh className="icon" />전체</NavLink>
//                         </div>
//                         <div className="sub-category">
//                             <NavLink to={'/matching/regularly/'} activeClassName="active"><FaUtensils className="icon" />정기 모임</NavLink>
//                         </div>
//                         <div className="sub-category">
//                             <NavLink to={'/matching/temporary/'} activeClassName="active"><FaBroom className="icon" />번개</NavLink>
//                         </div>
//                         <div className="sub-category">
//                             <NavLink to={'/matching/self/'} activeClassName="active"><FaConciergeBell className="icon" />셀프 소개팅</NavLink>
//                         </div>
//                     </>
//                 )}
//                 {pageType === 'cs' && (
//                     <>
//                         <div className="catagory-title">
//                             고객 지원
//                         </div>
//                         <div className="sub-category">
//                             <NavLink to={'/cs/notices'} activeClassName="active"><FaRegFileAlt className="icon" />공지사항</NavLink>
//                         </div>
//                         <div className="sub-category">
//                             <NavLink to={'/cs/event/'} activeClassName="active"><FaRegSmile className="icon" />이벤트</NavLink>
//                         </div>
//                     </>
//                 )}
//                 {pageType === 'myPage' && (
//                     <>
//                         <div className="catagory-title">
//                             마이페이지
//                         </div>
//                         <div className="sub-category">
//                             <NavLink to={'/myPage/info'} activeClassName="active"><FaRegSmile className="icon" />회원 정보 수정</NavLink>
//                         </div>
//                         <div className="sub-category">
//                             <NavLink to={'/myPage/board/'} activeClassName="active"><FaRegFileAlt className="icon" />작성한 게시글 조회</NavLink>
//                         </div>
//                         <div className="sub-category">
//                             <NavLink to={'/myPage/reply/'} activeClassName="active"><FaRegSmile className="icon" />작성한 댓글 조회</NavLink>
//                         </div>
//                         <div className="sub-category">
//                             <NavLink to={'/myPage/like/'} activeClassName="active"><FaRegSmile className="icon" />추천 게시글</NavLink>
//                         </div>
//                         <div className="sub-category">
//                             <NavLink to={'/myPage/matching/'} activeClassName="active"><FaRegSmile className="icon" />모임 조회</NavLink>
//                         </div>
//                         <div className="sub-category">
//                             <NavLink to={'/myPage/msg/'} activeClassName="active"><FaRegSmile className="icon" />쪽지함</NavLink>
//                         </div>
//                         <div className="sub-category">
//                             <NavLink to={'/myPage/logout/'}><FaRegSmile className="icon" />Log out</NavLink>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </aside>
//     )
// }

// export default SideBar;
import React from 'react';
import { useNavigate } from "react-router-dom";
import "../../assets/styles/siderbar.scss"; // SCSS 파일 가져오기
import { FaUtensils, FaBroom, FaConciergeBell, FaMoneyBill, FaPaintRoller, FaRegFileAlt, FaTh, FaRegSmile } from 'react-icons/fa'; // react-icons에서 아이콘 가져오기

const SideBar = ({ pageType }) => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = React.useState('');

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
            </div>
        </aside>
    );
};

export default SideBar;



// import React from 'react';
// import { NavLink, useNavigate } from "react-router-dom";
// import "../../assets/styles/siderbar.scss"; // SCSS 파일 가져오기
// import { FaUtensils, FaBroom, FaConciergeBell, FaMoneyBill, FaPaintRoller, FaRegFileAlt, FaTh, FaRegSmile } from 'react-icons/fa'; // react-icons에서 아이콘 가져오기

// const SideBar = ({ pageType }) => {
//     const navigate = useNavigate();
//     const [activeCategory, setActiveCategory] = React.useState('');

//     const handleNavigation = (categoryName) => {
//         setActiveCategory(categoryName);
//         navigate(`/board?page=1&size=10&categoryName=${categoryName}`);
//     };

//     return (
//         <aside className="sidebar">
//             <div className="catagory">
//                 {pageType === 'board' && (
//                     <>
//                         <div className="catagory-title">
//                             꿀팁
//                         </div>
//                         <div className={`sub-category ${activeCategory === '' ? 'active' : ''}`}>
//                             <button onClick={() => handleNavigation('')} className={activeCategory === '' ? 'active' : ''}>
//                                 <FaTh className={`icon ${activeCategory === '' ? 'active' : ''}`} />전체
//                             </button>
//                         </div>
//                         <div className={`sub-category ${activeCategory === '맛집' ? 'active' : ''}`}>
//                             <button onClick={() => handleNavigation('맛집')} className={activeCategory === '맛집' ? 'active' : ''}>
//                                 <FaUtensils className={`icon ${activeCategory === '맛집' ? 'active' : ''}`} />맛집
//                             </button>
//                         </div>
//                         <div className={`sub-category ${activeCategory === '청소' ? 'active' : ''}`}>
//                             <button onClick={() => handleNavigation('청소')} className={activeCategory === '청소' ? 'active' : ''}>
//                                 <FaBroom className={`icon ${activeCategory === '청소' ? 'active' : ''}`} />청소
//                             </button>
//                         </div>
//                         <div className={`sub-category ${activeCategory === '요리' ? 'active' : ''}`}>
//                             <button onClick={() => handleNavigation('요리')} className={activeCategory === '요리' ? 'active' : ''}>
//                                 <FaConciergeBell className={`icon ${activeCategory === '요리' ? 'active' : ''}`} />요리
//                             </button>
//                         </div>
//                         <div className={`sub-category ${activeCategory === '재테크' ? 'active' : ''}`}>
//                             <button onClick={() => handleNavigation('재테크')} className={activeCategory === '재테크' ? 'active' : ''}>
//                                 <FaMoneyBill className={`icon ${activeCategory === '재테크' ? 'active' : ''}`} />재테크
//                             </button>
//                         </div>
//                         <div className={`sub-category ${activeCategory === '인테리어' ? 'active' : ''}`}>
//                             <button onClick={() => handleNavigation('인테리어')} className={activeCategory === '인테리어' ? 'active' : ''}>
//                                 <FaPaintRoller className={`icon ${activeCategory === '인테리어' ? 'active' : ''}`} />인테리어
//                             </button>
//                         </div>
//                         <div className={`sub-category ${activeCategory === '정책' ? 'active' : ''}`}>
//                             <button onClick={() => handleNavigation('정책')} className={activeCategory === '정책' ? 'active' : ''}>
//                                 <FaRegFileAlt className={`icon ${activeCategory === '정책' ? 'active' : ''}`} />정책
//                             </button>
//                         </div>
//                         <div className={`sub-category ${activeCategory === '기타' ? 'active' : ''}`}>
//                             <button onClick={() => handleNavigation('기타')} className={activeCategory === '기타' ? 'active' : ''}>
//                                 <FaRegSmile className={`icon ${activeCategory === '기타' ? 'active' : ''}`} />기타
//                             </button>
//                         </div>
//                     </>
//                 )}
//                 {pageType === 'matching' && (
//                     <>
//                         <div className="catagory-title">
//                             모임
//                         </div>
//                         <div className={`sub-category ${activeCategory === 'total' ? 'active' : ''}`}>
//                             <NavLink to={'/matching/total'} className={activeCategory === 'total' ? 'active' : ''} onClick={() => setActiveCategory('total')}>
//                                 <FaTh className={`icon ${activeCategory === 'total' ? 'active' : ''}`} />전체
//                             </NavLink>
//                         </div>
//                         <div className={`sub-category ${activeCategory === 'regularly' ? 'active' : ''}`}>
//                             <NavLink to={'/matching/regularly'} className={activeCategory === 'regularly' ? 'active' : ''} onClick={() => setActiveCategory('regularly')}>
//                                 <FaUtensils className={`icon ${activeCategory === 'regularly' ? 'active' : ''}`} />정기 모임
//                             </NavLink>
//                         </div>
//                         <div className={`sub-category ${activeCategory === 'temporary' ? 'active' : ''}`}>
//                             <NavLink to={'/matching/temporary'} className={activeCategory === 'temporary' ? 'active' : ''} onClick={() => setActiveCategory('temporary')}>
//                                 <FaBroom className={`icon ${activeCategory === 'temporary' ? 'active' : ''}`} />번개
//                             </NavLink>
//                         </div>
//                         <div className={`sub-category ${activeCategory === 'self' ? 'active' : ''}`}>
//                             <NavLink to={'/matching/self'} className={activeCategory === 'self' ? 'active' : ''} onClick={() => setActiveCategory('self')}>
//                                 <FaConciergeBell className={`icon ${activeCategory === 'self' ? 'active' : ''}`} />셀프 소개팅
//                             </NavLink>
//                         </div>
//                     </>
//                 )}
//                 {pageType === 'cs' && (
//                     <>
//                         <div className="catagory-title">
//                             고객 지원
//                         </div>
//                         <div className={`sub-category ${activeCategory === 'notices' ? 'active' : ''}`}>
//                             <NavLink to={'/cs/notices'} className={activeCategory === 'notices' ? 'active' : ''} onClick={() => setActiveCategory('notices')}>
//                                 <FaRegFileAlt className={`icon ${activeCategory === 'notices' ? 'active' : ''}`} />공지사항
//                             </NavLink>
//                         </div>
//                         <div className={`sub-category ${activeCategory === 'event' ? 'active' : ''}`}>
//                             <NavLink to={'/cs/event'} className={activeCategory === 'event' ? 'active' : ''} onClick={() => setActiveCategory('event')}>
//                                 <FaRegSmile className={`icon ${activeCategory === 'event' ? 'active' : ''}`} />이벤트
//                             </NavLink>
//                         </div>
//                     </>
//                 )}
//                 {pageType === 'myPage' && (
//                     <>
//                         <div className="catagory-title">
//                             마이페이지
//                         </div>
//                         <div className={`sub-category ${activeCategory === 'info' ? 'active' : ''}`}>
//                             <NavLink to={'/myPage/info'} className={activeCategory === 'info' ? 'active' : ''} onClick={() => setActiveCategory('info')}>
//                                 <FaRegSmile className={`icon ${activeCategory === 'info' ? 'active' : ''}`} />회원 정보 수정
//                             </NavLink>
//                         </div>
//                         <div className={`sub-category ${activeCategory === 'board' ? 'active' : ''}`}>
//                             <NavLink to={'/myPage/board'} className={activeCategory === 'board' ? 'active' : ''} onClick={() => setActiveCategory('board')}>
//                                 <FaRegFileAlt className={`icon ${activeCategory === 'board' ? 'active' : ''}`} />작성한 게시글 조회
//                             </NavLink>
//                         </div>
//                         <div className={`sub-category ${activeCategory === 'reply' ? 'active' : ''}`}>
//                             <NavLink to={'/myPage/reply'} className={activeCategory === 'reply' ? 'active' : ''} onClick={() => setActiveCategory('reply')}>
//                                 <FaRegSmile className={`icon ${activeCategory === 'reply' ? 'active' : ''}`} />작성한 댓글 조회
//                             </NavLink>
//                         </div>
//                         <div className={`sub-category ${activeCategory === 'like' ? 'active' : ''}`}>
//                             <NavLink to={'/myPage/like'} className={activeCategory === 'like' ? 'active' : ''} onClick={() => setActiveCategory('like')}>
//                                 <FaRegSmile className={`icon ${activeCategory === 'like' ? 'active' : ''}`} />추천 게시글
//                             </NavLink>
//                         </div>
//                         <div className={`sub-category ${activeCategory === 'matching' ? 'active' : ''}`}>
//                             <NavLink to={'/myPage/matching'} className={activeCategory === 'matching' ? 'active' : ''} onClick={() => setActiveCategory('matching')}>
//                                 <FaRegSmile className={`icon ${activeCategory === 'matching' ? 'active' : ''}`} />모임 조회
//                             </NavLink>
//                         </div>
//                         <div className={`sub-category ${activeCategory === 'msg' ? 'active' : ''}`}>
//                             <NavLink to={'/myPage/msg'} className={activeCategory === 'msg' ? 'active' : ''} onClick={() => setActiveCategory('msg')}>
//                                 <FaRegSmile className={`icon ${activeCategory === 'msg' ? 'active' : ''}`} />쪽지함
//                             </NavLink>
//                         </div>
//                         <div className="sub-category">
//                             <NavLink to={'/myPage/logout'}>
//                                 <FaRegSmile className="icon" />Log out
//                             </NavLink>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </aside>
//     );
// };

// export default SideBar;
