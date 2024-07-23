import axios from "axios";
import { API_SERVER_HOST } from "./boardApi.js";

const host = `${API_SERVER_HOST}/api/matching`;

// 모든 매칭 가져오기
export const getAllMatching = async (token) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${host}/list`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('모든 매칭 데이터를 성공적으로 가져왔습니다:', res.data);
        return res.data;
    } catch (error) {
        console.error('모든 매칭을 가져오는 중 오류 발생:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 정기 모임 가져오기
export const getRegularly = async (token) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${host}/regularly`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('정기 모임 데이터를 성공적으로 가져왔습니다:', res.data);
        return res.data;
    } catch (error) {
        console.error('정기 모임을 가져오는 중 오류 발생:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 번개 가져오기
export const getTemporary = async (token) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${host}/temporary`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('번개 데이터를 성공적으로 가져왔습니다:', res.data);
        return res.data;
    } catch (error) {
        console.error('번개를 가져오는 중 오류 발생:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 셀프 소개팅 가져오기
export const getSelf = async (token) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${host}/self`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('셀프 소개팅 데이터를 성공적으로 가져왔습니다:', res.data);
        return res.data;
    } catch (error) {
        console.error('셀프 소개팅을 가져오는 중 오류 발생:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 정기모임 생성
export const createRegularly = async (formData, token) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${host}/regularly`,
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('정기 모임 생성 응답:', res.data);
        return res.data;
    } catch (error) {
        console.error('정기 모임 생성 중 오류 발생:', error.response ? error.response.data.message : error.message);
        throw error;
    }
}

// 번개 생성
export const createTemporary = async (formData, token) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${host}/temporary`,
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('번개 생성 응답:', res.data);
        return res.data;
    } catch (error) {
        console.error('번개 생성 중 오류 발생:', error.response ? error.response.data.message : error.message);
        throw error;
    }
}

// 셀프 소개팅 생성
export const createSelf = async (formData, token) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${host}/self`,
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('셀프 소개팅 생성 응답:', res.data);
        return res.data;
    } catch (error) {
        console.error('셀프 소개팅 생성 중 오류 발생:', error.response ? error.response.data.message : error.message);
        throw error;
    }
}

// 특정 사용자가 만든 매칭 보드 가져오기
export const getMatchingBoardsByMemberId = async (memberId, token) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${host}/user/${memberId}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('특정 사용자의 매칭 보드를 성공적으로 가져왔습니다:', res.data);
        return res.data;
    } catch (error) {
        console.error('특정 사용자의 매칭 보드를 가져오는 중 오류 발생:', error.response ? error.response.data.message : error.message);
        throw error;
    }
}

// 매칭 보드 수정
export const updateMatchingBoard = async (id, formData, token) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${host}/${id}`,
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('매칭 보드 수정 응답:', res.data);
        return res.data;
    } catch (error) {
        console.error('매칭 보드 수정 중 오류 발생:', error.response ? error.response.data.message : error.message);
        throw error;
    }
}

// 매칭 보드 삭제
export const deleteMatchingBoard = async (id, memberId, token) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `${host}/${id}`,
            params: { memberId },
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('매칭 보드 삭제 응답:', res.data);
        return res.data;
    } catch (error) {
        console.error('매칭 보드 삭제 중 오류 발생:', error.response ? error.response.data.message : error.message);
        throw error;
    }
}

// 조회수 증가
export const increaseViewCount = async (boardId, memberId, writerId, token) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${host}/increaseViewCount`,
            data: {
                boardId,
                memberId,
                writerId
            },
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('조회수 증가 응답:', res.data);
        return res.data;
    } catch (error) {
        console.error('조회수 증가 중 오류 발생:', error.response ? error.response.data.message : error.message);
        throw error;
    }
}
