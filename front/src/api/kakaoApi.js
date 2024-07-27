import axios from "axios";
import { API_SERVER_HOST } from "./boardApi";

const redirect_uri = `http://110.165.19.87:3000/kakao`;

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;

const acess_token_url = `https://kauth.kakao.com/oauth/token`;

export const getKakaoLoginLink = () => {
    
    const kakaoURL = `${auth_code_path}?response_type=code&client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=${redirect_uri}`;

    return kakaoURL;
}

export const getAccessToken = async (authCode) => {

    const header = {
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        }
    }

    const params = {
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_KAKAO_KEY,
        redirect_uri: redirect_uri,
        code: authCode
    }

    const res = await axios.post(acess_token_url, params, header);
    const accessToken = res.data.access_token;
    return accessToken;
}

export const getKakaoMemberWithAccessToken = async (accessToken) => {

    const res = await axios.get(`${API_SERVER_HOST}/api/oauth/kakao?accessToken=${accessToken}`);

    return res.data;
}

export const getKakaoUserData = async (token) => {
    const kakaoUser = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return await kakaoUser.data;
}
