import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getKakaoMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getMemberWithEmail } from "../../api/memberApi";
import Swal from "sweetalert2";

const KakaoRedirectPage = () => {
    const loginState = useSelector((state) => state.loginSlice);
    const token = loginState.accessToken;

    const [searchParams] = useSearchParams();
    const {moveToPath} = useCustomLogin();
    const dispatch = useDispatch();
    const authCode = searchParams.get("code");

    useEffect(() => {
        
        getAccessToken(authCode).then(accessToken => {
            getKakaoMemberWithAccessToken(accessToken).then(userInfo => {

                console.log("--------------------");
                console.log(userInfo);

                getMemberWithEmail(userInfo.email, accessToken).then(memberInfo => {
                    const {level, point, nextPoint} = memberInfo;
                    dispatch(login({ ...userInfo, level, point, nextPoint, accessToken, isKakao: true }));

                    Swal.fire({
                        title: `카카오 회원은 닉네임을 변경해주세요.`,
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "확인",
                    }).then((result) => {
                        if(result.isConfirmed) {
                            moveToPath("/mypage/info");
                        }
                    });
                }).catch(error => {
                    console.err("Error: ", error);
                });
            })
        });
    }, [authCode]);

    return (
        <div>
        </div>
    )
}

export default KakaoRedirectPage;