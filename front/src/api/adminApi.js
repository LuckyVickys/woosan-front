import axios from "axios";
import { API_SERVER_HOST } from "./boardApi.js";

const prefix = `${API_SERVER_HOST}/api/admin`;

export const getNoticeList = async (pageParam) => {
    const { page, size } = pageParam;
    const params = { page, size };
    try {
        const res = await axios.get(`${prefix}/notices`, { params });
        return res.data;
    } catch (error) {
        console.error(
            "Error fetching list:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const createNotice = async (formData) => {
    try {
        const header = { headers: { "Content-Type": "multipart/form-data" } };
        const res = await axios.post(`${prefix}/notices`, formData, header);
        return res.data;
    } catch (error) {
        console.error(
            "Error adding notice:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const getOne = async (id) => {
    console.log("Fetching data for ID:", id);
    try {
        const res = await axios.get(`${prefix}/notices/${id}/modify`);
        return res.data;
    } catch (error) {
        console.error(
            "Error fetching data:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const updateNotice = async (formData, header) => {
    try {
        const res = await axios.patch(`${prefix}/notice`, formData, header);
        return res.data;
    } catch (error) {
        console.error(
            "Error modifying notice:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const deleteNotice = async (removeDTO) => {
    try {
        const res = await axios.patch(`${prefix}/notices/delete`, removeDTO);
        return res.data;
    } catch (error) {
        console.error(
            "Error deleting notice:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

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

export const getTarget = async (id, type) => {
    console.log("Target for report:", id, type);
    try {
        const res = await axios.get(`${prefix}/report/target`, {
            params: { id: id, type: type },
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

export const getBannerList = async () => {
    try {
        const res = await axios.get(`${prefix}/myBanner`);
        return res.data;
    } catch (error) {
        console.error(
            "Error fetching banners:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const updateBanner = async (fileUpdateDTO) => {
    try {
        const formData = new FormData();
        fileUpdateDTO.existFiles.forEach((fileUrl, index) => {
            formData.append(`existFiles[${index}]`, fileUrl);
        });
        fileUpdateDTO.newFiles.forEach((file, index) => {
            formData.append(`newFiles`, file);
        });

        const res = await axios.post(`${prefix}/myBanner/modify`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (error) {
        console.error(
            "Error updating banner:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};
