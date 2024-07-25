import axios from "axios";
import { API_SERVER_HOST } from "./boardApi.js";
import { getCookie } from '../util/cookieUtil.jsx';

const host = `${API_SERVER_HOST}/api/replies`;

export const getList = async (boardId, page = 1, size = 10) => {
    try {
        const res = await axios.get(`${host}/${boardId}`, {
            params: { page, size }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching replies:", error);
        throw error;
    }
};

export const createReply = async (ReplyDTO, token) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${host}/add`,
            data: ReplyDTO,
            headers: {
                Authorization: `Bearer ${token}`,
                Refresh: getCookie("member").refreshToken,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error adding reply:", error);
        throw error;
    }
}

export const deleteReply = async (removeDTO, token) => {
    try {
        const url = `${host}/delete`;
        const res = await axios.request({
            url: url,
            method: 'delete',
            data: removeDTO,
            headers: {
                Authorization: `Bearer ${token}`,
                Refresh: getCookie("member").refreshToken,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error deleting reply:", error);
    }
}