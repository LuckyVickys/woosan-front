import axios from "axios";
import { API_SERVER_HOST } from "./boardApi";

const prefix = `${API_SERVER_HOST}/api/message`;

export const addMessage = async (formData, token) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${prefix}/add`,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return res.data;
  } catch (error) {
    console.error(
      "Error adding message: ",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
