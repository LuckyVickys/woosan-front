import axios from 'axios';
import { API_SERVER_HOST } from './boardApi.js';
import { getCookie } from '../util/cookieUtil.jsx';

// const host = `${API_SERVER_HOST}/api/my`;
const host = `http://localhost:80/api/my`;

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
export const getSendMessage = async (params, token) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${host}/message/list/send`,
            data: params,
            headers: {
              Authorization: `Bearer ${token}`,
              Refresh: getCookie("member").refreshToken,
              'Content-Type': 'application/json'
            }
          });
        return response.data;
    } catch(error) {
        console.error('Error fetching my send messages: ', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 마이페이지 받은 쪽지함
export const getReceiveMessage = async (params, token) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${host}/message/list/receive`,
            data: params,
            headers: {
              Authorization: `Bearer ${token}`,
              Refresh: getCookie("member").refreshToken,
              'Content-Type': 'application/json'
            }
          });
        return response.data;
    } catch(error) {
        console.error('Error fetching my receive messages: ', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 보낸 쪽지 삭제
export const delSendMessage = async (id, token) => {
    try {
        const response = await axios({
            method: 'PUT',
            url: `${host}/message/del/send?id=${id}`,
            headers: {
              Authorization: `Bearer ${token}`,
              Refresh: getCookie("member").refreshToken,
              'Content-Type': 'application/json'
            }
          });
        // const response = await axios.put(`${host}/message/del/send?id=${id}`);
        console.log(response.data);
        return response.data;
    } catch(error) {
        console.error('Error fetching my receive messages: ', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 받은 쪽지 삭제
export const delReceiveMessage = async (id, token) => {
    try {
        const response = await axios({
            method: 'PUT',
            url: `${host}/message/del/receive?id=${id}`,
            headers: {
              Authorization: `Bearer ${token}`,
              Refresh: getCookie("member").refreshToken,
              'Content-Type': 'application/json'
            }
          });
        console.log(response.data);
        return response.data;
    } catch(error) {
        console.error('Error deleting my receive messsage: ', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 쪽지 상세 페이지
export const getMessage = async (id, token) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${host}/message/${id}`,
            headers: {
              Authorization: `Bearer ${token}`,
              Refresh: getCookie("member").refreshToken,
              'Content-Type': 'application/json'
            }
          });
        console.log(response.data);
        return response.data;
    } catch(error) {
        console.log('Error fetching my message: ', error.response ? error.response.data : error.message)
        throw error;
    }
}