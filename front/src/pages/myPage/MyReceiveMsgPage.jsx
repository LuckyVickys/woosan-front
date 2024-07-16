import React, { useState } from "react";
import MyMsgComponent from "../../components/myPage/MyMsgComponent";
import ReadMsgComponent from "../../components/myPage/ReadMsgComponent";

const MyMsgPage = () => {
    const [selectedMsg, setSelectedMsg] = useState(null);

    const handleMsgClick = (id) => {
        console.log("Selected message ID:", id);

        setSelectedMsg({
          id: id,
          sender: "관리자",
          content: "[답변] 안녕하세요...",
          regDate: "2024-06-18 14:16",
          profileSrc: "URL",
          nickname: "관리자",
          role:"발신자",
          state: "받은 쪽지"
        });
      };

    return (
        <div className="contents">
            {selectedMsg ? (
                <ReadMsgComponent selectedMsg={selectedMsg} />
            ) : (
                <MyMsgComponent onMsgClick={handleMsgClick} />
            )}
        </div>
    );
}

export default MyMsgPage;