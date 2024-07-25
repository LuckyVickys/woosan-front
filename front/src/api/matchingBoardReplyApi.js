import axios from 'axios';
import { API_SERVER_HOST } from './boardApi.js';

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
        throw error;
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
        throw error;
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
        throw error;
    }
};
