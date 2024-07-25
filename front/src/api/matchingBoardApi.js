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
        return res.data;
    } catch (error) {
        throw new Error('서버 오류가 발생했습니다.');
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
        return res.data;
    } catch (error) {
        throw new Error('서버 오류가 발생했습니다.');
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
        return res.data;
    } catch (error) {
        throw new Error('서버 오류가 발생했습니다.');
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
        return res.data;
    } catch (error) {
        throw new Error('서버 오류가 발생했습니다.');
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
        throw new Error('서버 오류가 발생했습니다.');
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
        throw new Error('서버 오류가 발생했습니다.');
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
        throw new Error('서버 오류가 발생했습니다.');
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
        throw new Error('서버 오류가 발생했습니다.');
    }
}

// 매칭 보드 수정
export const updateMatchingBoard = async (id, formData, token) => {
    console.log("업데이트 시작");
    console.log("ID:", id);
    console.log("formData:", formData);
    
    // FormData의 키와 값을 로그로 출력
    for (let key of formData.keys()) {
        console.log("FormData 키:", key);
    }

    for (let value of formData.values()) {
        console.log("FormData 값:", value);
    }

    console.log("Token:", token);

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
        console.log("응답 데이터:", res.data);
        return res.data;
    } catch (error) {
        if (error.response) {
            // 서버에서 응답을 받았으나 2xx 범위에 들지 않는 상태 코드
            console.error("에러 응답 데이터:", error.response.data);
            console.error("에러 상태 코드:", error.response.status);
            console.error("에러 헤더:", error.response.headers);
        } else if (error.request) {
            // 요청이 만들어졌으나 응답을 받지 못함
            console.error("요청 데이터:", error.request);
        } else {
            // 요청 설정 중에 발생한 에러
            console.error("에러 메시지:", error.message);
        }
        console.error("에러 설정:", error.config);
        throw new Error('서버 오류가 발생했습니다.');
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
        return res.data;
    } catch (error) {
        throw new Error('서버 오류가 발생했습니다.');
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
        throw new Error('서버 오류가 발생했습니다.');
    }
}
