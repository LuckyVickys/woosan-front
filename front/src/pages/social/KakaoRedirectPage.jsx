import { useSearchParams } from "react-router-dom";

const KakaoRedirectPage = () => {
    const [searchParams] = useSearchParams();
    const authCode = searchParams.get("code");

    return (
        <div>
            <div>Kakao Login</div>
            <div>{authCode}</div>
        </div>
    )
}

export default KakaoRedirectPage;