import { useState, useEffect } from 'react';
import { getRegularly } from '../api/matchingApi';

/**
 * 정기 모임 데이터를 가져오는 커스텀 훅
 * @returns {object} regularly - 모임 데이터 배열
 * @returns {boolean} loading - 로딩 상태
 * @returns {string|null} error - 에러 메시지
 */
const useRegularly = () => {
    const [regularly, setRegularly] = useState([]); // 모임 데이터를 저장하는 상태
    const [loading, setLoading] = useState(true); // 로딩 상태를 관리하는 상태
    const [error, setError] = useState(null); // 에러 메시지를 저장하는 상태

    useEffect(() => {
        const fetchRegularly = async () => {
            try {
                // 정기 모임 데이터를 API에서 가져옴
                const data = await getRegularly();
                setRegularly(data); // 가져온 데이터를 상태에 저장
            } catch (error) {
                setError(error.message); // 에러가 발생하면 에러 메시지를 상태에 저장
            } finally {
                setLoading(false); // 데이터를 다 가져오면 로딩 상태를 false로 변경
            }
        };

        fetchRegularly(); // 데이터 가져오는 함수 호출
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    return { regularly, loading, error }; // 모임 데이터, 로딩 상태, 에러 메시지를 반환
};

export default useRegularly;
