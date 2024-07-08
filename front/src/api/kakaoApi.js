const rest_api_key = `16087d2a0e3c11811566bbba566b3ad8`;
const redirect_uri = `http://localhost:3000/login/kakao`;

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;

export const getKakaoLoginLink = () => {
    
    const kakaoURL = `${auth_code_path}
                        ?client_id=${rest_api_key}
                        &redirect_uri=${redirect_uri}
                        &response_type=code`;

    return kakaoURL;
}
