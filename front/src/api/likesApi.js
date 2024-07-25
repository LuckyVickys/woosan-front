import axios from "axios"
import { API_SERVER_HOST } from "./boardApi.js";
import { getCookie } from '../util/cookieUtil.jsx';

const host = `${API_SERVER_HOST}/api/likes`

export const toggleLike = async (toogleRequest, token) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${host}/toggle`,
            data: toogleRequest,
            headers: {
                Authorization: `Bearer ${token}`,
                Refresh: getCookie("member").refreshToken,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error toogling like:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const getLikes = async (toogleRequest, token) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${host}/status`,
            data: toogleRequest,
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