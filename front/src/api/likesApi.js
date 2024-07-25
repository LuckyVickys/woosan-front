import axios from "axios";
import { API_SERVER_HOST } from "./boardApi.js";
import { getCookie } from '../util/cookieUtil.jsx';

const host = `${API_SERVER_HOST}/api/likes`;

export const toggleLike = async (toggleRequest, token) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${host}/toggle`,
            data: toggleRequest,
            headers: {
                Authorization: `Bearer ${token}`,
                Refresh: getCookie("member").refreshToken,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error toggling like:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getLikes = async (toggleRequest, token) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${host}/status`,
            data: toggleRequest,
            headers: {
                Authorization: `Bearer ${token}`,
                Refresh: getCookie("member").refreshToken,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error fetching like status:', error.response ? error.response.data : error.message);
        throw error;
    }
};
