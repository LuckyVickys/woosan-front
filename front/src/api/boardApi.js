import axios from "axios";

// export const API_SERVER_HOST = "http://localhost:80";
export const API_SERVER_HOST = "http://223.130.147.56:7777";

const prefix = `${API_SERVER_HOST}/api/board`;

export const getBoard = async (id) => {
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
    try {
        const res = await axios.get(`${prefix}/${id}/modify`, header);
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

export const translate = async (id, boardApiDTO) => {
    try {
        const response = await axios.post(
            `${prefix}/${id}/translate`,
            boardApiDTO
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

export const summary = async (id, boardApiDTO) => {
    try {

        const response = await axios.post(`${prefix}/${id}/summary`, boardApiDTO);
        return response.data;
    } catch (error) {
        console.log('Error Summary board: ', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const autocomplete = async (keyword, searchType, category) => {
    const url = `${prefix}/autocomplete`;
    try {
        const response = await axios.get(url, {
            params: { keyword, searchType, category },
        });
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


export const getDailyBest = async () => {
    const res = await axios.get(`${prefix}/daily/best`);
    return res.data;
}