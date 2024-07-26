import axios from "axios";
import { API_SERVER_HOST } from "./boardApi.js";
import Swal from "sweetalert2";

const host = `${API_SERVER_HOST}/api/memberMatching`;

// 매칭 수락 요청 생성
export const applyMatching = async (requestDTO, token) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `${host}/apply`,
            data: requestDTO,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// 매칭 수락 또는 거부 처리
export const updateMatching = async (id, isAccepted, token) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `${host}/update/${id}`,
            params: { isAccepted },
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// 모임원 탈퇴
export const leaveMatching = async (id, memberId, token) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `${host}/leave/${id}`,
            params: { memberId },
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// 모임원 강퇴
export const kickMember = async (id, memberId, token) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `${host}/kick/${id}`,
            params: { memberId },
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// 모임원의 리스트 가져오기
export const getMembers = async (matchingId, token) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${host}/list/${matchingId}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// 특정 매칭 보드에 대한 가입 대기 중인 요청들을 가져오기
export const getPendingRequestsByBoardId = async (matchingId, token) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${host}/pending/${matchingId}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// 매칭 대기를 취소하는 메서드
export const cancelMatchingRequest = async (matchingId, memberId, token) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `${host}/cancel/${matchingId}`,
            params: { memberId },
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// 특정 보드의 모든 멤버 매칭 데이터 삭제 - 구현 전
export const deleteAllMembersByMatchingBoardId = async (matchingId, token) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `${host}/deleteAllMembers/${matchingId}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        handleApiError(error);
    }
};

// API 에러를 처리하는 함수
const handleApiError = (error) => {
    if (error.response && error.response.data) {
        Swal.fire({
            title: 'Error',
            text: error.response.data.message || '서버 오류가 발생했습니다.',
            icon: 'error',
            confirmButtonText: '확인'
        });
    } else {
        Swal.fire({
            title: 'Error',
            text: '서버 오류가 발생했습니다.',
            icon: 'error',
            confirmButtonText: '확인'
        });
    }
    throw error;
};
