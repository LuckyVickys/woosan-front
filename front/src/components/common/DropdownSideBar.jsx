import React, { useState, useEffect, useRef } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import "../../assets/styles/App.scss";

const DropdownSidebar = ({ pageType, activeCategory, handleNavigation, handleLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const sideBarRef = useRef(null);

    const handleCategoryClick = (category) => {
        handleNavigation(category);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
                setIsOpen(false); // 외부 클릭 시 드롭다운 닫기
            }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

    return (
        <div className={`dropdown-sidebar ${pageType === "admin" ? "admin" : ""}`} ref={sideBarRef}>
            <button className="dropdown-toggle" onClick={toggleDropdown}>
                카테고리 {isOpen ? <FaAngleUp /> : <FaAngleDown />}
            </button>
            {isOpen && (
                <div className="category">
                    {pageType === "board" && (
                        <>
                            <div className="category-title">꿀팁</div>
                            <button onClick={() => handleCategoryClick("")} className={activeCategory === "" ? "active" : ""}>전체</button>
                            <button onClick={() => handleCategoryClick("맛집")} className={activeCategory === "맛집" ? "active" : ""}>맛집</button>
                            <button onClick={() => handleCategoryClick("청소")} className={activeCategory === "청소" ? "active" : ""}>청소</button>
                            <button onClick={() => handleCategoryClick("요리")} className={activeCategory === "요리" ? "active" : ""}>요리</button>
                            <button onClick={() => handleCategoryClick("재테크")} className={activeCategory === "재테크" ? "active" : ""}>재테크</button>
                            <button onClick={() => handleCategoryClick("인테리어")} className={activeCategory === "인테리어" ? "active" : ""}>인테리어</button>
                            <button onClick={() => handleCategoryClick("정책")} className={activeCategory === "정책" ? "active" : ""}>정책</button>
                            <button onClick={() => handleCategoryClick("기타")} className={activeCategory === "기타" ? "active" : ""}>기타</button>
                        </>
                    )}
                    {pageType === "matching" && (
                        <>
                            <div className="category-title">모임</div>
                            <button onClick={() => handleCategoryClick("")} className={activeCategory === "" ? "active" : ""}>전체</button>
                            <button onClick={() => handleCategoryClick("regularly")} className={activeCategory === "regularly" ? "active" : ""}>정기 모임</button>
                            <button onClick={() => handleCategoryClick("temporary")} className={activeCategory === "temporary" ? "active" : ""}>번개</button>
                            <button onClick={() => handleCategoryClick("self")} className={activeCategory === "self" ? "active" : ""}>셀프 소개팅</button>
                        </>
                    )}
                    {pageType === "cs" && (
                        <>
                            <div className="category-title">고객 지원</div>
                            <button onClick={() => handleCategoryClick("notices")} className={activeCategory === "notices" || activeCategory === "" ? "active" : ""}>공지사항</button>
                        </>
                    )}
                    {pageType === "mypage" && (
                        <>
                            <div className="category-title">마이페이지</div>
                            <button onClick={() => handleCategoryClick("info")} className={activeCategory === "info" || activeCategory === "" ? "active" : ""}>회원 정보 수정</button>
                            <button onClick={() => handleCategoryClick("board")} className={activeCategory === "board" ? "active" : ""}>작성한 게시글 조회</button>
                            <button onClick={() => handleCategoryClick("reply")} className={activeCategory === "reply" ? "active" : ""}>작성한 댓글 조회</button>
                            <button onClick={() => handleCategoryClick("like")} className={activeCategory === "like" ? "active" : ""}>추천 게시글</button>
                            <button onClick={() => handleCategoryClick("matching")} className={activeCategory === "matching" ? "active" : ""}>모임 조회</button>
                            <button onClick={() => handleCategoryClick("send-message")} className={activeCategory === "send-message" ? "active" : ""}>보낸 쪽지함</button>
                            <button onClick={() => handleCategoryClick("receive-message")} className={activeCategory === "receive-message" ? "active" : ""}>받은 쪽지함</button>
                            <button onClick={handleLogout}>로그아웃</button>
                        </>
                    )}
                    {pageType === "admin" && (
                        <>
                            <div className="category-title">관리자 페이지</div>
                            <button onClick={() => handleCategoryClick("upload")} className={activeCategory === "upload" || activeCategory === "" ? "active" : ""}>배너 관리</button>
                            <button onClick={() => handleCategoryClick("report")} className={activeCategory === "report" || activeCategory === "" ? "active" : ""}>신고 관리</button>
                            <button onClick={() => handleCategoryClick("notice")} className={activeCategory === "notice" ? "active" : ""}>공지사항 관리</button>
                            <button onClick={() => handleCategoryClick("send-message")} className={activeCategory === "send-message" ? "active" : ""}>보낸 쪽지함</button>
                            <button onClick={() => handleCategoryClick("receive-message")} className={activeCategory === "receive-message" ? "active" : ""}>받은 쪽지함</button>
                            <button onClick={handleLogout}>Log out</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default DropdownSidebar;