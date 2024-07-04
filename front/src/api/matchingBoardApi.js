import axios from "axios";
import { API_SERVER_HOST } from "./boardApi.js";

const host = `${API_SERVER_HOST}/api/matching`;

// 모든 매칭 가져오기
export const getAllMatching = async () => {
    try {
        const res = await axios.get(`${host}/list`);
        return res.data;
    } catch (error) {
        console.error('모든 매칭을 가져오는 중 오류 발생:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 정기 모임 가져오기
export const getRegularly = async () => {
    try {
        const res = await axios.get(`${host}/regularly`);
        return res.data;
    } catch (error) {
        console.error('정기 모임을 가져오는 중 오류 발생:', error.response? error.response.data : error.message);
        throw error;
    }
}

// 번개 가져오기
export const getTemporary = async () => {
    try {
        const res = await axios.get(`${host}/temporary`);
        return res.data;
    } catch (error) {
        console.error('번개를 가져오는 중 오류 발생:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 셀프 소개팅 가져오기
export const getSelf = async () => {
    try {
        const res = await axios.get(`${host}/self`);
        return res.data;
    } catch (error) {
        console.error('셀프 소개팅을 가져오는 중 오류 발생:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 정기모임 생성
export const createRegularly = async (data) => {
    try {
        const res = await axios.post(`${host}/regularly`, data);
        return res.data;
    } catch (error) {
        console.error('정기 모임 생성 중 오류 발생:', error.response ? error.response.data.message : error.message);
        throw error;
    }
}

// 번개 생성
export const createTemporary = async (data) => {
    try {
        const res = await axios.post(`${host}/temporary`, data);
        return res.data;
    } catch (error) {
        console.error('번개 생성 중 오류 발생:', error.response ? error.response.data.message : error.message);
        throw error;
    }
}

// 셀프 소개팅 생성
export const createSelf = async (data) => {
    try {
        const res = await axios.post(`${host}/self`, data);
        return res.data;
    } catch (error) {
        console.error('셀프 소개팅 생성 중 오류 발생:', error.response ? error.response.data.message : error.message);
        throw error;
    }
}

// 특정 매칭 보드 가져오기
export const getMatchingBoardById = async (id) => {
    try {
        const res = await axios.get(`${host}/${id}`);
        return res.data;
    } catch (error) {
        console.error('특정 매칭 보드를 가져오는 중 오류 발생:', error.response ? error.response.data.message : error.message);
        throw error;
    }
}

// 매칭 보드 수정
export const updateMatchingBoard = async (id, data) => {
    try {
        const res = await axios.put(`${host}/${id}`, data);
        return res.data;
    } catch (error) {
        console.error('매칭 보드 수정 중 오류 발생:', error.response ? error.response.data.message : error.message);
        throw error;
    }
}

// 매칭 보드 삭제
export const deleteMatchingBoard = async (id, memberId) => {
    try {
        const res = await axios.delete(`${host}/${id}?memberId=${memberId}`);
        return res.data;
    } catch (error) {
        console.error('매칭 보드 삭제 중 오류 발생:', error.response ? error.response.data.message : error.message);
        throw error;
    }
}
