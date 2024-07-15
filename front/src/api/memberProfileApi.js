import axios from "axios";
import { API_SERVER_HOST } from "./boardApi.js";

const host = `${API_SERVER_HOST}/api/member`;

export const getMember = async (id) => {
    console.log("Fetching data for ID:", id);
    try {
        const res = await axios.get(`${host}/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        throw error;
    }
}
export const modifyProfile = async (id, profileUpdateDTO) => {
    console.log("Modifying profile for ID:", id);
    try {
        const formData = new FormData();
        for (const key in profileUpdateDTO) {
            if (profileUpdateDTO.hasOwnProperty(key)) {
                if (Array.isArray(profileUpdateDTO[key])) {
                    profileUpdateDTO[key].forEach((item, index) => {
                        formData.append(key, item);
                    });
                } else {
                    formData.append(key, profileUpdateDTO[key]);
                }
            }
        }
        const res = await axios.patch(`${host}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        console.error('Error modifying profile:', error.response ? error.response.data : error.message);
        throw error;
    }
}