import { useState, useEffect, useCallback } from 'react';
import { getSelf } from '../api/matchingBoardApi';
import { useSelector } from 'react-redux';

/**
 * 셀프 소개팅 데이터를 가져오는 커스텀 훅
 * @returns {object} self - 셀프 소개팅 데이터 배열
 * @returns {boolean} loading - 로딩 상태
 * @returns {string|null} error - 에러 메시지
 * @returns {Function} fetchMore - 더 많은 데이터를 가져오는 함수
 * @returns {boolean} hasMore - 더 많은 데이터가 있는지 여부
 */
const useSelf = () => {
    const [self, setSelf] = useState([]); // 셀프 소개팅 데이터를 저장하는 상태
    const [loading, setLoading] = useState(true); // 로딩 상태를 관리하는 상태
    const [error, setError] = useState(null); // 에러 메시지를 저장하는 상태
    const [page, setPage] = useState(1); // 현재 페이지 번호
    const [hasMore, setHasMore] = useState(true); // 더 많은 데이터가 있는지 여부
    const loginState = useSelector((state) => state.loginSlice); // 로그인 상태 가져오기

    const fetchSelf = useCallback(async (page) => {
        try {
            const data = await getSelf(page);
            if (data.length === 0) {
                setHasMore(false);
            } else {
                // 내가 만든 셀프 소개팅을 맨 위에 오도록 정렬
                const mySelf = data.filter(item => item.memberId === loginState.id);
                const otherSelf = data.filter(item => item.memberId !== loginState.id);
                setSelf(prev => [...prev, ...mySelf, ...otherSelf]);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [loginState.id]);

    useEffect(() => {
        fetchSelf(page);
    }, [page, fetchSelf]);

    const fetchMore = () => {
        if (hasMore && !loading) {
            setPage(prevPage => prevPage + 1);
        }
    };

    return { self, loading, error, fetchMore, hasMore };
};

export default useSelf;
