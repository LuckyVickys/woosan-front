import { useState, useEffect } from 'react';
import { getTemporary } from '../api/matchingBoardApi';
import { useSelector } from 'react-redux';

/**
 * 번개 데이터를 가져오는 커스텀 훅
 * @returns {object} temporary - 번개 데이터 배열
 * @returns {boolean} loading - 로딩 상태
 * @returns {string|null} error - 에러 메시지
 */
const useTemporary = () => {
    const [temporary, setTemporary] = useState([]); // 번개 데이터를 저장하는 상태
    const [loading, setLoading] = useState(true); // 로딩 상태를 관리하는 상태
    const [error, setError] = useState(null); // 에러 메시지를 저장하는 상태
    const loginState = useSelector((state) => state.loginSlice);
    const token = loginState.accessToken;

    useEffect(() => {
        const fetchTemporary = async () => {
            try {
                // 번개 데이터를 API에서 가져옴
                const data = await getTemporary(token);
                setTemporary(data); // 가져온 데이터를 상태에 저장
            } catch (error) {
                setError(error.message); // 에러가 발생하면 에러 메시지를 상태에 저장
            } finally {
                setLoading(false); // 데이터를 다 가져오면 로딩 상태를 false로 변경
            }
        };

        fetchTemporary(); // 데이터 가져오는 함수 호출
    }, [token]); // 컴포넌트가 마운트될 때 한 번만 실행

    return { temporary, loading, error }; // 번개 데이터, 로딩 상태, 에러 메시지를 반환
};

export default useTemporary;
