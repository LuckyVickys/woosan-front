import axios from "axios";

export const API_SERVER_HOST = "http://localhost:7777"; // 실제 서버 주소로 변경

const prefix = `${API_SERVER_HOST}/api/replies`;

export const getList = async (boardId, page = 1, size = 10) => {
    try {
        const response = await axios.get(`${prefix}/${boardId}`, {
            params: { page, size }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching replies:", error);
        throw error;
    }
};
