import axios from "axios"
import {API_SERVER_HOST} from "./boardApi.js";

const prefix = `${API_SERVER_HOST}/api/signUp`;



export const addMember = async (id) => {
    console.log("Fetching data for ID:", id);
    try {
        const res = await axios.get(`${prefix}/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        throw error;
    }
}