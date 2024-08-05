import axios from 'axios';
import { API_SERVER_HOST } from './boardApi.js';
import Swal from 'sweetalert2';

const host = `${API_SERVER_HOST}/api/matchingReply`;

// 댓글 생성
export const saveReply = async (requestDTO, token) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${host}/save`,
            data: requestDTO,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// 댓글 삭제
export const deleteReply = async (id, memberId, token) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `${host}/${id}`,
            params: { memberId },
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// 특정 매칭 보드의 모든 댓글 가져오기 (페이지네이션 포함)
export const getReplies = async (matchingId, pageable, token) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${host}/${matchingId}/replies`,
            params: pageable,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// API 에러를 처리하는 함수
const handleApiError = (error) => {
    if (error.response && error.response.data) {
        Swal.fire({
            title: 'Error',
            text: error.response.data.message || '서버 오류가 발생했습니다.',
            icon: 'error',
            confirmButtonText: '확인'
        });
    } else {
        Swal.fire({
            title: 'Error',
            text: '서버 오류가 발생했습니다.',
            icon: 'error',
            confirmButtonText: '확인'
        });
    }
    throw error;
};
