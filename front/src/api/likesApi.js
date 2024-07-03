import axios from "axios"
import { API_SERVER_HOST } from "./boardApi.js";

const host = `${API_SERVER_HOST}/api/likes`

export const toggleLike = async (toogleRequest) => {
    try {
        const res = await axios.post(`${host}/toggle`, toogleRequest);
        return res.data;
    } catch (error) {
        console.error('Error toogling like:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const getLikes = async (toogleRequest) => {
    try {
        const res = await axios.post(`${host}/status`, toogleRequest);
        return res.data;
    } catch (error) {
        console.error('Error fetching like status:', error.response ? error.response.data : error.message);
        throw error;
    }
};