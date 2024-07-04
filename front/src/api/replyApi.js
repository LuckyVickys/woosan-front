import axios from "axios";

export const API_SERVER_HOST = "http://localhost:7777"; // 실제 서버 주소로 변경

const prefix = `${API_SERVER_HOST}/api/replies`;

export const getList = async (boardId, page = 1, size = 10) => {
    try {
        const res = await axios.get(`${prefix}/${boardId}`, {
            params: { page, size }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching replies:", error);
        throw error;
    }
};

export const addReply = async (ReplyDTO) => {
    try {
        const res = await axios.post(`${prefix}/add`);
        return res.data;
    } catch (error) {
        console.error("Error adding reply:", error);
        throw error;
    }
}

export const deleteReply = async (id) => {
    try {
        const res = await axios.delete(`${prefix}/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error deleting reply:", error);
    }
}