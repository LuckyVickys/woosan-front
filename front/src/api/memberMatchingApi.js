import axios from "axios";
import { API_SERVER_HOST } from "./boardApi.js";

const host = `${API_SERVER_HOST}/api/memberMatching`;

// 매칭 수락 요청 생성
export const applyMatching = async (requestDTO) => {
    try {
        const res = await axios.post(`${host}/apply`, requestDTO);
        console.log('매칭 요청이 성공적으로 생성되었습니다:', res.data);
        return res.data;
    } catch (error) {
        console.error('매칭 요청 생성 중 오류 발생:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// 매칭 수락 또는 거부 처리
export const updateMatching = async (id, isAccepted) => {
    try {
        const res = await axios.put(`${host}/update/${id}`, null, { params: { isAccepted } });
        const message = isAccepted ? '매칭 요청을 수락했습니다.' : '매칭 요청을 거절했습니다.';
        console.log(message, res.data);
        return res.data;
    } catch (error) {
        console.error('매칭 상태 업데이트 중 오류 발생:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// 모임원 탈퇴
export const leaveMatching = async (id, memberId) => {
    try {
        const res = await axios.delete(`${host}/leave/${id}`, { params: { memberId } });
        console.log('모임에서 성공적으로 탈퇴했습니다:', res.data);
        return res.data;
    } catch (error) {
        console.error('매칭 탈퇴 중 오류 발생:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// 모임원 강퇴
export const kickMember = async (id, memberId) => {
    try {
        const res = await axios.delete(`${host}/kick/${id}`, { params: { memberId } });
        console.log('회원이 성공적으로 강퇴되었습니다:', res.data);
        return res.data;
    } catch (error) {
        console.error('회원 강퇴 중 오류 발생:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// 모임원의 리스트 가져오기
export const getMembers = async (matchingId) => {
    try {
        const res = await axios.get(`${host}/list/${matchingId}`);
        console.log('모임원 목록을 성공적으로 가져왔습니다:', res.data);
        return res.data;
    } catch (error) {
        console.error('모임원 목록 조회 중 오류 발생:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// 특정 매칭 보드에 대한 가입 대기 중인 요청들을 가져오기
export const getPendingRequestsByBoardId = async (matchingId) => {
    try {
        const res = await axios.get(`${host}/pending/${matchingId}`);
        console.log('가입 대기 중인 요청을 성공적으로 가져왔습니다:', res.data);
        return res.data;
    } catch (error) {
        console.error('가입 대기 중인 요청 조회 중 오류 발생:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// 매칭 대기를 취소하는 메서드
export const cancelMatchingRequest = async (matchingId, memberId) => {
    try {
        const res = await axios.delete(`${host}/cancel/${matchingId}`, { params: { memberId } });
        console.log('매칭 대기가 성공적으로 취소되었습니다:', res.data);
        return res.data;
    } catch (error) {
        console.error('매칭 대기 취소 중 오류 발생:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// 특정 보드의 모든 멤버 매칭 데이터 삭제
export const deleteAllMembersByMatchingBoardId = async (matchingId) => {
    try {
        const res = await axios.delete(`${host}/deleteAllMembers/${matchingId}`);
        console.log('모든 멤버 매칭 데이터가 성공적으로 삭제되었습니다:', res.data);
        return res.data;
    } catch (error) {
        console.error('모든 멤버 매칭 데이터 삭제 중 오류 발생:', error.response ? error.response.data : error.message);
        throw error;
    }
};
