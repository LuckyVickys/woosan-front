import axios from "axios";
import { API_SERVER_HOST } from "./boardApi.js";

const prefix = `${API_SERVER_HOST}/api/admin`;

export const getReportList = async (pageParam) => {
    const { page, size, categoryName } = pageParam;
    const params = { page, size, ...(categoryName && { categoryName }) };
    try {
        const res = await axios.get(`${prefix}/report`, { params });
        return res.data;
    } catch (error) {
        console.error(
            "Error fetching list:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const getReport = async (id) => {
    console.log("Fetching data for report:", id);
    try {
        const res = await axios.get(`${prefix}/report/${id}`);
        return res.data;
    } catch (error) {
        console.error(
            "Error fetching data:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const getTarget = async (id) => {
    console.log("Target for report:", id);
    try {
        const res = await axios.get(`${prefix}/report/target`, {
            params: { id: id }
    });
        return res.data;
    } catch (error) {
        console.error(
            "Error fetching data:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const checkReport = async (id) => {
    console.log("Checking data for report:", id);
    try {
        const res = await axios.post(`${prefix}/report/${id}`);
        return res.data;
    } catch (error) {
        console.error(
            "Error fetching data:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};
