import axios from 'axios';
import { API_SERVER_HOST } from './boardApi.js';

const host = `${API_SERVER_HOST}/api/matchingReply`;

// 댓글 생성
export const saveReply = async (requestDTO) => {
    try {
        const res = await axios.post(`${host}/save`, requestDTO);
        console.log('댓글이 성공적으로 저장되었습니다.');
        return res.data;
    } catch (error) {
        console.error('댓글 저장에 실패하였습니다:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// 댓글 삭제
export const deleteReply = async (id, memberId) => {
    try {
        const res = await axios.delete(`${host}/${id}`, { params: { memberId } });
        console.log('댓글이 성공적으로 삭제되었습니다.');
        return res.data;
    } catch (error) {
        console.error('댓글 삭제에 실패하였습니다:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// 특정 매칭 보드의 모든 댓글 가져오기 (페이지네이션 포함)
export const getReplies = async (matchingId, pageable) => {
    try {
        const res = await axios.get(`${host}/${matchingId}/replies`, { params: pageable });
        console.log('댓글 목록을 성공적으로 가져왔습니다.');
        return res.data;
    } catch (error) {
        console.error('댓글 목록을 가져오는데 실패하였습니다:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// 특정 부모 댓글의 모든 자식 댓글 가져오기
export const getRepliesByParentId = async (parentId) => {
    try {
        const res = await axios.get(`${host}/parent/${parentId}`);
        console.log('답글 목록을 성공적으로 가져왔습니다.');
        return res.data;
    } catch (error) {
        console.error('답글 목록을 가져오는데 실패하였습니다:', error.response ? error.response.data : error.message);
        throw error;
    }
};
