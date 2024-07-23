import axios from "axios";

import { API_SERVER_HOST } from "./boardApi.js";

const host = `${API_SERVER_HOST}/api`;
// const host = `http://localhost:80/api`;

// 로그인
export const loginPost = async (loginParam, token) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${host}/auth/login`,
      data: {
        email: loginParam.email,
        password: loginParam.password,
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// 이메일 중복 체크
export const checkEmail = async (email, token) => {
  console.log("Checking email:", email);
  try {
    const response = await axios({
      method: 'GET',
      url: `${host}/member/email/${email}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error checking email:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 닉네임 중복 체크
export const checkNickname = async (nickname, token) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${host}/member/nickname/${nickname}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error checking nickname:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 회원가입
export const signUp = async (signupData, token) => {
  console.log("Signing up with:", signupData);
  try {
    const response = await axios({
      method: 'POST',
      url: `${host}/member/signUp`,
      data: signupData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error signing up:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 임시비밀번호 메일 전송
export const sendEmail = async (email, token) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${host}/member/sendEmail?email=${email}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    throw error.response.data;
  }
};

// 비밀번호 변경
export const updatePassword = async (updateData, token) => {
  console.log("Checking Password:", updateData);
  try {
    const response = await axios({
      method: 'PUT',
      url: `${host}/member/updatePw`,
      data: updateData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// 멤버 정보 요청
export const getMemberWithEmail = async (email, token) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${host}/member/info`,
      params: { email },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
      console.error(
      "Error fetching data:",
      error.res ? error.res.data : error.message
    );
    throw error;
  }
};
