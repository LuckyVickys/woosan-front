import axios from "axios";

export const API_SERVER_HOST = "http://localhost:80";

const prefix = `${API_SERVER_HOST}/api/message`;

export const addMessage = async (formData) => {
    try {
        const res = await axios.post(`${prefix}/add`, formData);
        return res.data;
    } catch(error) {
        console.error('Error adding message: ', error.response ? error.response.data : error.message);
        throw error;
    }
}
