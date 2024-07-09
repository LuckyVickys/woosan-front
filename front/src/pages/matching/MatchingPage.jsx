import React, { useState } from 'react';
import useRegularly from '../../hooks/useRegularly';
import useTemporary from '../../hooks/useTemporary';
import useSelf from '../../hooks/useSelf';
import MatchingList from '../../components/matching/MatchingList';
import MatchingModal from '../../components/matching/MatchingModal';
import Pagination from '../../components/matching/Pagination';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/styles/matching/MatchingPage.module.scss';
// import useCustomLogin from '../../hooks/useCustomLogin';        // 혜리 추가
// import LoginModal from '../../components/member/LoginModal';    // 혜리 추가

const MatchingPage = () => {
    const { regularly, loading: loadingRegularly, error: errorRegularly } = useRegularly();
    const { temporary, loading: loadingTemporary, error: errorTemporary } = useTemporary();
    const { self, loading: loadingSelf, error: errorSelf } = useSelf();
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const navigate = useNavigate();

    // 혜리 추가 - 로그인 하지 않았을 때 addPage로 이동하지 못하게
    // const { isLogin, moveToLoginReturn, isLoginModalOpen, closeLoginModal } = useCustomLogin();

    /**
     * 정기모임, 번개, 셀프 소개팅 데이터를 병합하여 페이지별로 나누는 함수
     * @param {Array} regularly - 정기모임 데이터 배열
     * @param {Array} temporary - 번개 데이터 배열
     * @param {Array} self - 셀프 소개팅 데이터 배열
     * @returns {Array} 페이지별 데이터 배열
     */
    const createPageData = (regularly, temporary, self) => {
        const result = [];
        const categories = [
            { items: [...regularly], count: 2 },
            { items: [...temporary], count: 2 },
            { items: [...self], count: 2 },
        ];

        while (categories.some(category => category.items.length > 0)) {
            const pageItems = [];
            categories.forEach(category => {
                for (let i = 0; i < category.count && category.items.length > 0; i++) {
                    pageItems.push(category.items.shift());
                }
            });

            const remainingItems = categories.flatMap(category => category.items);
            while (pageItems.length < itemsPerPage && remainingItems.length > 0) {
                pageItems.push(remainingItems.shift());
            }

            result.push(pageItems);
        }

        console.log("페이지 데이터:", result);
        return result;
    };

    // 전체 데이터를 불러와 페이지별 데이터 생성
    const pages = createPageData(
        (regularly || []).sort((a, b) => new Date(b.regDate) - new Date(a.regDate)),
        (temporary || []).sort((a, b) => new Date(b.regDate) - new Date(a.regDate)),
        (self || []).sort((a, b) => new Date(b.regDate) - new Date(a.regDate))
    );

    const totalPages = pages.length;
    const paginatedItems = pages[currentPage - 1] || [];

    // 아이템 클릭 시 호출되는 함수
    const handleItemClick = (id) => {
        const item = paginatedItems.find(item => item.id === id);
        setSelectedItem(item);
    };

    // 모달 창 닫기 함수
    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    // 페이지 변경 함수
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // 모임 만들기 버튼 클릭 시 호출되는 함수
    const handleCreateButtonClick = () => {

    // 혜리 추가 - 로그인 하지 않았을 때 addPage로 이동하지 못하게
        // if(!isLogin) {
        //     moveToLoginReturn();
        // } else {
            navigate('/matching/CreateMatching');
        // }
    };

    // 로딩 중일 때 표시할 내용
    if (loadingRegularly || loadingTemporary || loadingSelf) {
        console.log("로딩 중...");
        return <div className={styles.loading}>Loading...</div>;
    }

    // 데이터 가져오는 중 오류 발생 시 표시할 내용
    if (errorRegularly || errorTemporary || errorSelf) {
        console.error("데이터를 가져오는 중 오류 발생:", errorRegularly || errorTemporary || errorSelf);
        return <div className={styles.error}>데이터를 가져오는 중 오류 발생</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.createButton} onClick={handleCreateButtonClick}>모임 만들기</button>
            </div>
            {paginatedItems.length > 0 ? (
                <MatchingList items={paginatedItems} onItemClick={handleItemClick} gridColumns={2} />
            ) : (
                <div className={styles.noItems}>아직 생성된 모임이 없습니다</div>
            )}
            {selectedItem && (
                <MatchingModal item={selectedItem} onClose={handleCloseModal} />
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            {/* {isLoginModalOpen && <LoginModal onClose={closeLoginModal}/>} // 혜리 추가 */}
        </div>
    );
};

export default MatchingPage;
