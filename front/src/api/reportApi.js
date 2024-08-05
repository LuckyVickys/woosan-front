import axios from "axios";
import { API_SERVER_HOST } from "./boardApi.js";
import { getCookie } from '../util/cookieUtil.jsx';

const prefix = `${API_SERVER_HOST}/api/report`;

export const addReport = async (formData, token) => {
    try {
        const res = await axios.post(`${prefix}/add`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                Refresh: getCookie("member").refreshToken,
                "Content-Type": "multipart/form-data",
            },
        });
        return res;
    } catch (error) {
        console.error('Error adding report:', error.response ? error.response.data : error.message);
        throw error;
    }
};