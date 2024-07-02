import axios from "axios"
import {API_SERVER_HOST} from "./boardApi.js";

const host = `${API_SERVER_HOST}/api`

export const getNotices = async () => {
    const res = await axios.get(`${host}/board/notices`);
    return res.data
}

export const getBest = async () => {
    const res = await axios.get(`${host}/board/best`);
    return res.data;
}

// 모임 API 부분 주석 처리
// export const getNewMatching = async () => {
//     const res = await axios.get(`${host}/matching/`);
//     return res.data;
// }