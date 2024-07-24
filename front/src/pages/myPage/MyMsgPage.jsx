import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReadMsgComponent from "../../components/myPage/ReadMsgComponent";
import { getMessage } from "../../api/myPageApi";

const MyMsgPage = () => {
    const { id } = useParams();
    const loginState = useSelector((state) => state.loginSlice);
    const [selectedMsg, setSelectedMsg] = useState(null);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const messageData = await getMessage(id, loginState.accessToken);
                if (loginState && loginState.nickname) {
                    const role = loginState.nickname === messageData.senderNickname ? "발신자" : "수신자";
                    const nickname = (role === "발신자" ? messageData.receiverNickname : messageData.senderNickname);
                    setSelectedMsg({
                        ...messageData,
                        role,
                        nickname,
                    });
                } else {
                    console.error("loginState or loginState.nickname is undefined");
                }
            } catch (error) {
                console.error("Error fetching message:", error);
            }
        };

        fetchMessage();

    }, [id, loginState]);

    if (!selectedMsg) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <ReadMsgComponent selectedMsg={selectedMsg} />
        </>
    );
};

export default MyMsgPage;
