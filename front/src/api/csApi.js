import axios from "axios"
import { API_SERVER_HOST } from "./boardApi.js";

const host = `${API_SERVER_HOST}/api`

export const getNoticeList = async (pageParam) => {
    const { page, size } = pageParam;
    const params = { page, size };
    try {
        const res = await axios.get(`${host}/board/cs/notices`, { params });
        return res.data;
    } catch (error) {
        console.error('Error fetching list:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const getNotice = async (id) => {
    console.log("Fetching data for ID:", id);
    try {
        const res = await axios.get(`${host}/board/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const translateNotice = async (id, boardDTO) => {
    try {
        const response = await axios.post(`${host}/${id}/translate`, boardDTO);
        return response.data;
    } catch (error) {
        console.error('Error translating board:', error.response ? error.response.data : error.message);
        throw error;
    }
}



