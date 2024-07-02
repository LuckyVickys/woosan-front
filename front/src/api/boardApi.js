import axios from "axios";

export const API_SERVER_HOST = "http://localhost:7777";

const prefix = `${API_SERVER_HOST}/api/board`;

export const getOne = async (id) => {
    console.log("Fetching data for ID:", id);
    try {
        const res = await axios.get(`${prefix}/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const getList = async (pageParam) => {
    const { page, size, categoryName } = pageParam;
    const params = { page, size };
    if (categoryName) {
        params.categoryName = categoryName;
    }
    const res = await axios.get(`${prefix}`, { params });
    return res.data;
};

export const addBoard = async (boardDTO) => {
    try {
        const res = await axios.post(`${prefix}/add`, boardDTO);
        return res.data;
    } catch (error) {
        console.error('Error adding board:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const modifyBoard = async (id, boardDTO) => {
    try {
        const res = await axios.put(`${prefix}/${id}`, boardDTO);
        return res.data
    } catch (error) {
        console.error('Error modifying board:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const deleteBoard = async (id) => {
    try {
        const res = await axios.patch(`${prefix}/delete/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error deleting board:', error.response ? error.response.data : error.message);
        throw error;
    }
}


