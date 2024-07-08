import axios from "axios";
import { API_SERVER_HOST } from "./boardApi";

const rest_api_key = `16087d2a0e3c11811566bbba566b3ad8`;
const redirect_uri = `http://localhost:3000/kakao`;

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;

const acess_token_url = `https://kauth.kakao.com/oauth/token`;

export const getKakaoLoginLink = () => {
    
    const kakaoURL = `${auth_code_path}?response_type=code&client_id=${rest_api_key}&redirect_uri=${redirect_uri}`;

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
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        code: authCode
    }

    const res = await axios.post(acess_token_url, params, header);
    const accessToken = res.data.access_token;
    return accessToken;
}

export const getMemberWithAccessToken = async (accessToken) => {

    // const res = await axios.get(`${API_SERVER_HOST}/api/oauth/kakao?accessToken=${accessToken}`);
    const res = await axios.get(`http://localhost:80/api/oauth/kakao?accessToken=${accessToken}`);

    return res.data;
}
