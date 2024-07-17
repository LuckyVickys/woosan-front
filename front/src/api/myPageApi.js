import axios from 'axios';
import { API_SERVER_HOST } from './boardApi.js';

const host = `${API_SERVER_HOST}/api/my`;
// const host = `http://localhost:80/api/my`;

// 마이페이지 댓글 목록
export const getMyReplies = async (params) => {
    try {
        const response = await axios.post(`${host}/replies`, params);
        return response.data;
    } catch (error) {
        console.error('Error fetching my replies:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// 마이페이지 게시글 목록
export const getMyBoard = async (params) => {
    try {
        const response = await axios.post(`${host}/board`, params);
        return response.data;
    } catch (error) {
        console.error('Error fetching my replies:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// 마이페이지 추천 게시글 목록
export const getLikedBoard = async (params) => {
    try {
        const response = await axios.post(`${host}/like`, params);
        return response.data;
    } catch (error) {
        console.error('Error fetching my replies:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// 마이페이지 보낸 쪽지함
export const getSendMessage = async (params) => {
    try {
        const response = await axios.post(`${host}/message/list/send`, params);
        return response.data;
    } catch(error) {
        console.error('Error fetching my send messages: ', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 마이페이지 받은 쪽지함
export const getReceiveMessage = async (params) => {
    try {
        const response = await axios.post(`${host}/message/list/receive`, params);
        return response.data;
    } catch(error) {
        console.error('Error fetching my receive messages: ', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 보낸 쪽지 삭제
export const delSendMessage = async (id) => {
    try {
        const response = await axios.post(`${host}/message/del/send?id=${id}`);
        console.log(response.data);
        return response.data;
    } catch(error) {
        console.error('Error fetching my receive messages: ', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 받은 쪽지 삭제
export const delReceiveMessage = async (id) => {
    try {
        const response = await axios.put(`${host}/message/del/receive?id=${id}`);
        console.log(response.data);
        return response.data;
    } catch(error) {
        console.error('Error deleting my receive messsage: ', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 쪽지 상세 페이지
export const getMessage = async (id) => {
    try {
        const response = await axios.get(`${host}/message/${id}`);
        console.log(response.data);
        return response.data;
    } catch(error) {
        console.log('Error fetching my message: ', error.response ? error.response.data : error.message)
        throw error;
    }
}