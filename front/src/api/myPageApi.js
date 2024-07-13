import axios from 'axios';
import { API_SERVER_HOST } from './boardApi.js';

const host = `${API_SERVER_HOST}/api`;

// 댓글 데이터를 가져오는 함수 추가
export const getMyReplies = async (params) => {
    try {
        const response = await axios.post(`${host}/my/replies`, params);
        return response.data;
    } catch (error) {
        console.error('Error fetching my replies:', error.response ? error.response.data : error.message);
        throw error;
    }
};
