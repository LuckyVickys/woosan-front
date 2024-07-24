import axios from "axios";
import { API_SERVER_HOST } from "./boardApi.js";

const prefix = `${API_SERVER_HOST}/api/report`;

// 신고 추가 함수
export const addReport = async (formData) => {
    try {
        const header = { headers: { "Content-Type": "multipart/form-data" } };
        const res = await axios.post(`${prefix}/add`, formData, header);
        return res; 
    } catch (error) {
        console.error('Error adding report:', error.response ? error.response.data : error.message);
        throw error;
    }
};
