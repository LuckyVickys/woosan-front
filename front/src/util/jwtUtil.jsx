import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/boardApi";

const jwtAxios = axios.create();

const refreshJWT = async (accessToken, refreshToken) => {
    
    const host = `http://110.165.19.87:3000`;
    const header = {headers: {"Authorization":`Bearer ${accessToken}`}};
    const res = await axios.post(`${host}/api/auth/refresh`, {refreshToken}, header);
    return res.data;
}

// before request
const beforeReq = (config) => {
    const userInfo = getCookie("member");

    if(!userInfo) {
        console.log("MEMBER NOT FOUND");
        return Promise.reject(
            {response:
                {data:
                    {error:"REQUIRE_LOGIN"}
                }
            }
        )
    }

    const {accessToken} = userInfo;

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
}

// fail request
const requestFail = (err) => {
    console.log("request Error..........");
    return Promise.reject(err);
}

// before return response
const beforeRes = async (res) => {
    console.log("before return response..........");
    console.log(res);

    // 'ERROR_ACCESS_TOKEN'
    const data = res.data;

    if(data && data.error === 'ERROR_ACCESS_TOKEN') {

        const memberCookieValue = getCookie("member");
        const result = await refreshJWT( memberCookieValue.accessToken, memberCookieValue.refreshToken );
        console.log("refreshJWT RESULT: ", result);

        memberCookieValue.accessToken = result.accessToken;
        memberCookieValue.refreshToken = result.refreshToken;

        setCookie("member", JSON.stringify(memberCookieValue), 1);

        const originalRequest = res.config;

        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

        return await axios(originalRequest);
    }
    return res;
}

// fail response
const responseFail = (err) => {
    console.log("response fail error..........");
    return Promise.reject(err);
}

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.request.use(beforeRes, responseFail);

export default jwtAxios;