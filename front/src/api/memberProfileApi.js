import axios from "axios";
import { API_SERVER_HOST } from "./boardApi.js";
import { getCookie } from '../util/cookieUtil.jsx';

const host = `${API_SERVER_HOST}/api/member-profile`;

export const getMember = async (id) => {
  try {
    const res = await axios.get(`${host}/${id}`);
    return res.data;
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const modifyProfile = async (formDataObj, token) => {
    try {
      const res = await axios.patch(`${host}/modify`, formDataObj, {
        headers: {
          Authorization: `Bearer ${token}`,
          Refresh: getCookie("member").refreshToken,
          "Content-Type": "multipart/form-data",
        },
      });
  
      return res.data;
    } catch (error) {
      console.error(
        "Error modifying member Profile:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };