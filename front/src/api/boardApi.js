import axios from "axios";

export const API_SERVER_HOST = "http://localhost:80";
// export const API_SERVER_HOST = "http://223.130.139.24:7777";

const prefix = `${API_SERVER_HOST}/api/board`;

export const getBoard = async (id) => {
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
    const params = { page, size, ...(categoryName && { categoryName }) };
    try {
        const res = await axios.get(`${prefix}`, { params });
        return res.data;
    } catch (error) {
        console.error('Error fetching list:', error.response ? error.response.data : error.message);
        throw error;
    }
};



export const addBoard = async (formData) => {
    try {
        const header = { headers: { "Content-Type": "multipart/form-data" } }
        const res = await axios.post(`${prefix}/add`, formData, header);
        return res.data;
    } catch (error) {
        console.error('Error adding board:', error.response ? error.response.data : error.message);
        throw error;
    }
}


export const getOne = async (id) => {
    console.log("Fetching data for ID:", id);
    try {
        const res = await axios.get(`${prefix}/modify/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const modifyBoard = async (id, formData) => {
    try {
        const header = { headers: { "Content-Type": "multipart/form-data" } }
        const res = await axios.patch(`${prefix}/${id}`, formData, header);
        return res.data;
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



export const translate = async (id, boardDTO) => {
    try {
        const response = await axios.post(`${prefix}/${id}/translate`, boardDTO);
        return response.data;
    } catch (error) {
        console.error('Error translating board:', error.response ? error.response.data : error.message);
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
        console.error("Error fetching autocomplete data:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const searchBoard = async (category, filter, keyword) => {
    try {
        const params = { category, filter, keyword };
        const res = await axios.get(`${prefix}/search`, { params });
        return res.data;
    } catch (error) {
        console.error('Error searching board:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const searchWithSynonyms = async (keyword) => {
    try {
        const res = await axios.get(`${prefix}/search/synonyms`, {
            params: { keyword }
        });
        return res.data;
    } catch (error) {
        console.error('Error searching with synonyms:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const saveSearchKeyword = async (keyword) => {
    try {
        const timestamp = new Date().toISOString();  // 현재 시간을 ISO 형식의 타임스탬프로 설정
        const data = { keyword, timestamp };
        const res = await axios.post(`${prefix}/save`, data);
        return res.data;
    } catch (error) {
        console.error('Error saving search keyword:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const getRealTimeSearchRankings = async () => {
    try {
        const res = await axios.get(`${prefix}/ranking`);
        return res.data;
    } catch (error) {
        console.error('Error fetching real-time search rankings:', error.response ? error.response.data : error.message);
        throw error;
    }
};