import axios from "axios";
import { API_SERVER_HOST } from "./boardApi";

// export const API_SERVER_HOST = "http://223.130.139.24:7777";

const prefix = `${API_SERVER_HOST}/api/message`;

export const addMessage = async (formData) => {
  try {
    const res = await axios.post(`${prefix}/add`, formData);
    return res.data;
  } catch (error) {
    console.error(
      "Error adding message: ",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
