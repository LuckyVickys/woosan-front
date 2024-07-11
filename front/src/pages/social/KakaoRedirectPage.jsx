import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getKakaoMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from 'react-redux';
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const KakaoRedirectPage = () => {

    const [searchParams] = useSearchParams();
    const {moveToPath} = useCustomLogin();
    const dispatch = useDispatch();
    const authCode = searchParams.get("code");

    useEffect(() => {
        
        getAccessToken(authCode).then(accessToken => {
            console.log(accessToken);

            getKakaoMemberWithAccessToken(accessToken).then(userInfo => {

                console.log("--------------------");
                console.log(userInfo);
                dispatch(login({ ...userInfo, accessToken, isKakao: true })); // isKakao 추가
                moveToPath("/");
            })
        });
    }, [authCode]);

    return (
        <div>
            <div>Kakao Login Redirect</div>
            <div>{authCode}</div>
        </div>
    )
}

export default KakaoRedirectPage;