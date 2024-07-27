import { useState, useEffect, useCallback } from 'react';
import { getSelf } from '../api/matchingBoardApi';
import { useSelector } from 'react-redux';

/**
 * 셀프 소개팅 데이터를 가져오는 커스텀 훅
 * @returns {object} self - 셀프 소개팅 데이터 배열
 * @returns {boolean} loading - 로딩 상태
 * @returns {string|null} error - 에러 메시지
 * @returns {Function} fetchSelf - 데이터를 가져오는 함수
 */
const useSelf = () => {
    const [self, setSelf] = useState([]); // 셀프 소개팅 데이터를 저장하는 상태
    const [loading, setLoading] = useState(true); // 로딩 상태를 관리하는 상태
    const [error, setError] = useState(null); // 에러 메시지를 저장하는 상태
    const loginState = useSelector((state) => state.loginSlice);
    const token = loginState.accessToken;

    const fetchSelf = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getSelf(token);
            // 내가 만든 셀프 소개팅을 맨 위에 오도록 정렬
            const mySelf = data.filter(item => item.memberId === loginState.id);
            const otherSelf = data.filter(item => item.memberId !== loginState.id);
            setSelf([...mySelf, ...otherSelf]);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [loginState.id , token]);

    useEffect(() => {
        fetchSelf();
    }, [fetchSelf]); // fetchSelf를 의존성 배열에 포함

    return { self, loading, error, fetchSelf };
};

export default useSelf;
