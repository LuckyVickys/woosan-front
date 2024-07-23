import axios from "axios";

// export const API_SERVER_HOST = "http://localhost:80";
export const API_SERVER_HOST = "http://223.130.147.56:7777";

const prefix = `${API_SERVER_HOST}/api/board`;

export const getBoard = async (id) => {
    console.log("Fetching data for ID:", id);
    try {
        const res = await axios.get(`${prefix}/${id}`);
        return res.data;
    } catch (error) {
        console.error(
            "Error fetching data:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const getList = async (pageParam) => {
    const { page, size, categoryName } = pageParam;
    const params = { page, size, ...(categoryName && { categoryName }) };
    try {
        const res = await axios.get(`${prefix}`, { params });
        return res.data;
    } catch (error) {
        console.error(
            "Error fetching list:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const createBoard = async (formData, header) => {
    try {
        const res = await axios.post(`${prefix}/add`, formData, header);
        return res.data;
    } catch (error) {
        console.error(
            "Error adding board:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const getOne = async (id) => {
    console.log("Fetching data for ID:", id);
    try {
        const res = await axios.get(`${prefix}/${id}/modify`);
        return res.data;
    } catch (error) {
        console.error(
            "Error fetching data:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const updateBoard = async (formData, header) => {
    try {
        const res = await axios.patch(`${prefix}/modify`, formData, header);
        return res.data;
    } catch (error) {
        console.error(
            "Error modifying board:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const deleteBoard = async (removeDTO) => {
    try {
        const res = await axios.patch(`${prefix}/delete`, removeDTO);
        return res.data;
    } catch (error) {
        console.error(
            "Error deleting board:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const translate = async (id, boardDTO) => {
    try {
        const response = await axios.post(
            `${prefix}/${id}/translate`,
            boardDTO
        );
        return response.data;
    } catch (error) {
        console.error(
            "Error translating board:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const autocomplete = async (keyword, searchType, category) => {
    const url = `${prefix}/autocomplete`;
    console.log(`Autocomplete request URL: ${url}`);
    try {
        const response = await axios.get(url, {
            params: { keyword, searchType, category },
        });
        console.log("Autocomplete API response:", response.data);
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching autocomplete data:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const getRankingChanges = async () => {
    try {
        const res = await axios.get(`${prefix}/ranking`);
        return res.data;
    } catch (error) {
        console.error(
            "Error fetching ranking changes:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

export const combinedSearch = async (
    category,
    filter,
    keyword,
    page = 1,
    rpage = 1,
    size = 10
) => {
    try {
        const params = { category, filter, keyword, page, rpage, size };
        console.log("Search Params:", params); // 확인용 로그
        const res = await axios.get(`${prefix}/search`, { params });
        return res.data;
    } catch (error) {
        console.error(
            "Error searching board:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};
