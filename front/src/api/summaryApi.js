import axios from "axios";
import { API_SERVER_HOST } from "./boardApi";

const prefix = `${API_SERVER_HOST}/api/board`;

export const summary = async (id, boardApiDTO) => {
    try {

        const response = await axios.post(`${prefix}/${id}/summary`, boardApiDTO);
        return response.data;
    } catch (error) {
        console.error('Error Summary board: ', error.response ? error.response.data : error.message);
        throw error;
    }
}