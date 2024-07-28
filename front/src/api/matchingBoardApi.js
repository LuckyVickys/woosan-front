import axios from "axios";
import { API_SERVER_HOST } from "./boardApi.js";

const host = `${API_SERVER_HOST}/api/matching`;

// 모든 매칭 가져오기
export const getAllMatching = async (token) => {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const res = await axios({
            method: 'GET',
            url: `${host}/list`,
            headers: headers
        });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data || '서버 오류가 발생했습니다.');
    }
};

// 정기 모임 가져오기
export const getRegularly = async (token) => {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const res = await axios({
            method: 'GET',
            url: `${host}/regularly/list`,
            headers: headers
        });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data || '서버 오류가 발생했습니다.');
    }
}

// 번개 가져오기
export const getTemporary = async (token) => {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const res = await axios({
            method: 'GET',
            url: `${host}/temporary/list`,
            headers: headers
        });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data || '서버 오류가 발생했습니다.');
    }
}

// 셀프 소개팅 가져오기
export const getSelf = async (token) => {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const res = await axios({
            method: 'GET',
            url: `${host}/self/list`,
            headers: headers
        });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data || '서버 오류가 발생했습니다.');
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
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data || '서버 오류가 발생했습니다.');
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
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data || '서버 오류가 발생했습니다.');
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
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data || '서버 오류가 발생했습니다.');
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
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data || '서버 오류가 발생했습니다.');
    }
}

// 매칭 보드 수정
export const updateMatchingBoard = async (id, formData, token) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${host}/${id}/update`,
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data || '서버 오류가 발생했습니다.');
    }
}

// 매칭 보드 삭제
export const deleteMatchingBoard = async (id, memberId, token) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `${host}/${id}/delete`,
            params: { memberId },
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data || '서버 오류가 발생했습니다.');
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
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data || '서버 오류가 발생했습니다.');
    }
}
