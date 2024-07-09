import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
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

            getMemberWithAccessToken(accessToken).then(userInfo => {

                console.log("--------------------");
                console.log(userInfo);

                dispatch(login(userInfo));

                // 소셜 회원이 아니라면
                if(userInfo && userInfo.socialType === 'NORMAL') {
                    moveToPath("/");
                } else {    // 소셜 회원이라면
                    moveToPath("/myPage/info"); // 정보 수정 페이지로 이동
                }
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