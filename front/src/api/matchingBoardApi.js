import axios from "axios";
import { API_SERVER_HOST } from "./boardApi.js";

const host = `${API_SERVER_HOST}/api/matching`;

// 모든 매칭 가져오기
export const getAllMatching = async () => {
    try {
        const res = await axios.get(`${host}/list`);
        console.log('모든 매칭 데이터를 성공적으로 가져왔습니다:', res.data);
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
        console.log('정기 모임 데이터를 성공적으로 가져왔습니다:', res.data);
        return res.data;
    } catch (error) {
        console.error('정기 모임을 가져오는 중 오류 발생:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 번개 가져오기
export const getTemporary = async () => {
    try {
        const res = await axios.get(`${host}/temporary`);
        console.log('번개 데이터를 성공적으로 가져왔습니다:', res.data);
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
        console.log('셀프 소개팅 데이터를 성공적으로 가져왔습니다:', res.data);
        return res.data;
    } catch (error) {
        console.error('셀프 소개팅을 가져오는 중 오류 발생:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 정기모임 생성
export const createRegularly = async (formData) => {
    try {
        const header = { headers: {'Content-Type': 'multipart/form-data'}}
        const res = await axios.post(`${host}/regularly`, formData,header);
        console.log('정기 모임 생성 응답:', res.data);
        return res.data;
    } catch (error) {
        console.error('정기 모임 생성 중 오류 발생:', error.response ? error.response.data.message : error.message);
        throw error;
    }
}

// 번개 생성
export const createTemporary = async (formData) => {
    try {
        const header = { headers: {'Content-Type': 'multipart/form-data'}}
        const res = await axios.post(`${host}/temporary`, formData, header);
        console.log('번개 생성 응답:', res.data);
        return res.data;
    } catch (error) {
        console.error('번개 생성 중 오류 발생:', error.response ? error.response.data.message : error.message);
        throw error;
    }
}

// 셀프 소개팅 생성
export const createSelf = async (formData) => {
    try {
        const header = { headers: {'Content-Type': 'multipart/form-data'}}
        const res = await axios.post(`${host}/self`, formData, header);
        console.log('셀프 소개팅 생성 응답:', res.data);
        return res.data;
    } catch (error) {
        console.error('셀프 소개팅 생성 중 오류 발생:', error.response ? error.response.data.message : error.message);
        throw error;
    }
}

// 특정 사용자가 만든 매칭 보드 가져오기
export const getMatchingBoardsByMemberId = async (memberId) => {
    try {
        const res = await axios.get(`${host}/user/${memberId}`);
        console.log('특정 사용자의 매칭 보드를 성공적으로 가져왔습니다:', res.data);
        return res.data;
    } catch (error) {
        console.error('특정 사용자의 매칭 보드를 가져오는 중 오류 발생:', error.response ? error.response.data.message : error.message);
        throw error;
    }
}

// 매칭 보드 수정
export const updateMatchingBoard = async (id, formData) => {
    try {
        const header = { headers: {'Content-Type': 'multipart/form-data'}}
        const res = await axios.put(`${host}/${id}`, formData, header);
        console.log('매칭 보드 수정 응답:', res.data);
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
        console.log('매칭 보드 삭제 응답:', res.data);
        return res.data;
    } catch (error) {
        console.error('매칭 보드 삭제 중 오류 발생:', error.response ? error.response.data.message : error.message);
        throw error;
    }
}