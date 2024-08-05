import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getKakaoMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";
import Swal from "sweetalert2";

const KakaoRedirectPage = () => {
    const loginState = useSelector((state) => state.loginSlice);
    const token = loginState.accessToken;

    const [searchParams] = useSearchParams();
    const { moveToPath } = useCustomLogin();
    const dispatch = useDispatch();
    const authCode = searchParams.get("code");

    // 액세스 토큰을 가져오기
    const fetchAccessToken = async (authCode) => {
        try {
            const accessToken = await getAccessToken(authCode);
            return accessToken;
        } catch (error) {
            console.error("Error fetching access token: ", error);
            throw error;
        }
    };

    // 카카오 회원 정보 가져오기
    const fetchKakaoMember = async (accessToken) => {
        try {
            const userInfo = await getKakaoMemberWithAccessToken(accessToken);
            return userInfo;
        } catch (error) {
            console.error("Error fetching Kakao member info: ", error);
            throw error;
        }
    };

    // 카카오 로그인 프로세스 처리
    const handleLoginProcess = async () => {
        try {
            const accessToken = await fetchAccessToken(authCode);
            const userInfo = await fetchKakaoMember(accessToken);

            dispatch(login({ ...userInfo }));

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
        } catch (error) {
            console.error("Login process error: ", error);
        }
    };

    useEffect(() => {
        if (authCode) {
            handleLoginProcess();
        }
    }, [authCode]);

    return (
        <div>
        </div>
    )
}

export default KakaoRedirectPage;
