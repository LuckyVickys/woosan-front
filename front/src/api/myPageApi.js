import axios from 'axios';
import { API_SERVER_HOST } from './boardApi.js';

const host = `${API_SERVER_HOST}/api/my`;

export const getMyReplies = async (params) => {
    try {
        const response = await axios.post(`${host}/replies`, params);
        return response.data;
    } catch (error) {
        console.error('Error fetching my replies:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getMyBoard = async (params) => {
    try {
        const response = await axios.post(`${host}/board`, params);
        return response.data;
    } catch (error) {
        console.error('Error fetching my replies:', error.response ? error.response.data : error.message);
        throw error;
    }
};

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
export const sendMessage = async () => {
    try {
        const response = await axios.post(`${host}/message/list/send`);
        return response.data;
    } catch(error) {
        console.error('Error fetching my send messages: ', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 마이페이지 받은 쪽지함
export const receiveMessage = async () => {
    try {
        const response = await axios.post(`${host}/message/list/receive`);
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
export const messageDetail = async (id) => {
    try {
        const response = await axios.get(`${host}/message/${id}`);
        console.log(response.data);
        return response.data;
    } catch(error) {
        console.log('Error fetching my message: ', error.response ? error.response.data : error.message)
        throw error;
    }
}