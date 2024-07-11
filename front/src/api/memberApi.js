import axios from "axios";

const host = `http://localhost:80/api`;

// 로그인
export const loginPost = async (loginParam) => {
    const header = {headers: {"Content-Type": "application/json"}};
    const data = {
        email: loginParam.email,
        password: loginParam.password
    };
    try {
        const res = await axios.post(`${host}/auth/login`, data, header);
        return res.data;
    } catch (error) {
        throw error;
    }
}

// 이메일 중복 체크
export const checkEmail = async (email) => {
    console.log("Checking email:", email);
    try {
        const response = await axios.get(`${host}/member/email/{email}`);
        return response.data;
    } catch (error) {
        console.error('Error checking email:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 닉네임 중복 체크
export const checkNickname = async (nickname) => {
    console.log("Checking nickname:", nickname);
    try {
        const response = await axios.get(`${host}/member/nickname/{nickname}`);
        return response.data;
    } catch (error) {
        console.error('Error checking nickname:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 회원가입
export const signUp = async (signupData) => {
    console.log("Signing up with:", signupData);
    const header = { headers: { "Content-Type": "application/json" } };
    try {
        const response = await axios.post(`${host}/member/signUp`, signupData, header);
        return response.data;
    } catch (error) {
        console.error('Error signing up:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 임시비밀번호 메일 전송 및 임시비밀번호 변경
export const sendEmail = async (email) => {
    console.log("Fetching data for Email:", email);
    try {
        const response = await axios.get(`${host}/sendEmail`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// 멤버 정보 요청
export const getMemberWithEmail = async (email) => {

    try {
        const res = await axios.get(`${host}/member/info`, {
            params: {
                email: email
            }
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error('Error fetching data:', error.res ? error.res.data : error.message);
        throw error;
    }
}
