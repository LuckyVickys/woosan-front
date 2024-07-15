import axios from 'axios';
import { API_SERVER_HOST } from './boardApi.js';

const host = `${API_SERVER_HOST}/api`;

export const getMyReplies = async (params) => {
    try {
        const response = await axios.post(`${host}/my/replies`, params);
        return response.data;
    } catch (error) {
        console.error('Error fetching my replies:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getMyBoard = async (params) => {
    try {
        const response = await axios.post(`${host}/my/board`, params);
        return response.data;
    } catch (error) {
        console.error('Error fetching my replies:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getLikedBoard = async (params) => {
    try {
        const response = await axios.post(`${host}/my/like`, params);
        return response.data;
    } catch (error) {
        console.error('Error fetching my replies:', error.response ? error.response.data : error.message);
        throw error;
    }
};
