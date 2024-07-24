import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MatchingList from '../../components/matching/MatchingList';
import Pagination from '../../components/matching/Pagination';
import { getMatchingBoardsByMemberId } from '../../api/matchingBoardApi';

const MyMatchingPage = () => {
    const [myMatchings, setMyMatchings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // 페이지당 매칭 개수
    const navigate = useNavigate();
    const loginState = useSelector((state) => state.loginSlice); // 로그인된 상태 가져오기

    /**
     * 나의 매칭 정보를 가져오는 함수
     */
    useEffect(() => {
        const fetchMyMatchings = async () => {
            try {
                const matchings = await getMatchingBoardsByMemberId(loginState.id);
                // 정기모임(1), 번개(2), 셀프소개팅(3) 순서대로 정렬
                const sortedMatchings = matchings.sort((a, b) => a.matchingType - b.matchingType);
                setMyMatchings(sortedMatchings);
            } catch (error) {
                // 나의 매칭을 가져오는 중 오류 발생 시 처리
            }
        };

        if (loginState.id) {
            fetchMyMatchings();
        }
    }, [loginState.id]);

    /**
     * 매칭 클릭 시 호출되는 함수
     * @param {number} Id - 클릭된 매칭의 ID
     */
    const handleMatchingClick = (Id) => {
        navigate(`/matching/modify/${Id}`);
    };

    /**
     * 페이지 변경 시 호출되는 함수
     * @param {number} pageNumber - 변경된 페이지 번호
     */
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 현재 페이지에 해당하는 매칭 목록을 계산
    const paginatedItems = myMatchings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(myMatchings.length / itemsPerPage);

    return (
        <div className="my-matching-page">
            <MatchingList items={paginatedItems} onItemClick={handleMatchingClick} gridColumns={2} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

export default MyMatchingPage;
