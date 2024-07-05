import axios from "axios";
import { API_SERVER_HOST } from "./boardApi";

const host = `${API_SERVER_HOST}`;

const prefix = `${API_SERVER_HOST}/api/board`;

export const summary = async (id, boardDTO) => {
    try {
        const response = await axios.post(`${prefix}/${id}/summary`, boardDTO);
    } catch (error) {
        console.log('Error Summary board: ', error.response ? error.response.data : error.message);
        throw error;
    }
}