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

// export const getLikeList = async (pageParam) => {
//     const {page,size} =pageParam

//     const res = await axios.get(`${prefix}/likeList`, {params: {page:page, size}})

//     return res.data
// }

// export const getNoticelist = async (pageParam) => {
//     const {page,size} =pageParam
    
//     const res = await axios.get(`${prefix}/noticelist`, {params: {page:page, size}})
    
//     return res.data
// }