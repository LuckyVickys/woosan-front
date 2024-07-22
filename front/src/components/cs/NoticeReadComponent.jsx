import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../assets/styles/App.scss";
import { getNotice, translateNotice } from "../../api/csApi";
import BoardDropDown from "../../components/board/element/BoardDropDown.jsx";
import BackButton from "../../components/common/BackButton.jsx";
import { formatDate } from "../../util/DateUtil.jsx";
import LikeButton from "../../components/common/LikeButton";
import { FaComment } from "react-icons/fa";
import MsgModal from "../../components/board/element/MsgModal";
import { convertLineBreaks } from "../../util/convertUtil";
import defaultProfile from "../../assets/image/profile.png";
import { summary } from "../../api/summaryApi.js";
import Swal from "sweetalert2";

const initState = {
    id: 0,
    writerId: 0,
    nickname: "",
    title: "",
    content: "",
    regDate: "",
    views: 0,
    likesCount: 0,
    categoryName: "",
    images: null,
    filePathUrl: [],
    replyCount: 0, // 댓글 수 추가
};

const NoticeReadComponent = () => {
    const loginState = useSelector((state) => state.loginSlice);
    const [userId, setUserId] = useState(null);
    const { id } = useParams();

    const [notice, setNotice] = useState(initState);
    const [showBoardMenu, setShowBoardMenu] = useState(false);
    const [openMsgModal, setOpenMsgModal] = useState(false);
    const boardMenuRef = useRef(null);
    const [summarizedBoard, setSummarizedBoard] = useState(null);

    useEffect(() => {
        if (loginState.id) {
            setUserId(loginState.id);
        }
    }, [loginState.id]);

    useEffect(() => {
        getNotice(id)
            .then((data) => {
                const contentWithLineBreaks = convertLineBreaks(data.content);
                setNotice({ ...data, content: contentWithLineBreaks });
            })
            .catch((err) => {
                console.error("Failed to fetch notice data:", err);
            });
    }, [id]);

    const handlePapagoTranslate = async () => {
        try {
            const translated = await translateNotice(id, {
                title: notice.title,
                content: notice.content,
            });
            setNotice((prevNotice) => ({
                ...prevNotice,
                title: translated.title,
                content: convertLineBreaks(translated.content),
            }));
        } catch (error) {
            console.error("번역 중 오류 발생:", error);
        }
    };

    const handleClovaSummary = async () => {
        try {
            const summarized = await summary(id, {
                title: notice.title,
                content: notice.content,
            });
            setSummarizedBoard({ content: summarized });
            Swal.fire({
                icon: "success",
                title: "요약 완료",
                html: `게시글 요약이 완료되었습니다. <br> 게시글 하단을 확인해주세요.`,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "확인",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "요약 실패",
                text: "요약할 수 없는 게시글입니다.",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "확인",
            });
            console.error("요약 중 오류 발생:", error);
        }
    };

    const handleBoardMenuSelect = () => {
        setShowBoardMenu(!showBoardMenu);
    };

    const openMsg = () => {
        setOpenMsgModal(true);
        setShowBoardMenu(false);
    };

    const closeMsg = () => {
        setOpenMsgModal(false);
        setShowBoardMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (boardMenuRef.current && !boardMenuRef.current.contains(event.target)) {
                setShowBoardMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!notice.title) {
        return <div>로딩 중...</div>;
    }

    const profileSrc =
        notice.writerProfile && notice.writerProfile.length > 0
            ? notice.writerProfile
            : defaultProfile;

    return (
        <>
            <div className="post-title">
                <h1 className="post-title-text">{notice.title}</h1>
                <div className="api-button">
                    <button
                        className="papago-button"
                        onClick={handlePapagoTranslate}
                    ></button>
                    <button className="clova-button" onClick={handleClovaSummary}></button>
                </div>
            </div>
            <div className="board-header">
                <div className="left">
                    <img src={profileSrc} alt="프로필" className="profile-image" />
                    <div className="author-info">
                        <p className="post-author">
                            {notice.nickname} | &nbsp; 조회수 {notice.views} | 댓글 {notice.replyCount} | {formatDate(notice.regDate)}
                        </p>
                    </div>
                </div>
                <div className="right">
                    <LikeButton
                        className="likeIcon"
                        memberId={1}
                        type="게시물"
                        targetId={id}
                        initialLikesCount={notice.likesCount}
                    />
                    <FaComment className="replyIcon" /> {notice.replyCount}
                    <button
                        className="menu-button"
                        onClick={handleBoardMenuSelect}
                        ref={boardMenuRef}
                    >
                        ⋮
                        {showBoardMenu && (
                            <BoardDropDown
                                id={id}
                                onSelect={handleBoardMenuSelect}
                                openMsg={openMsg}
                                showReportButton={false}
                                showMsgButton={userId !== notice.writerId}
                                showModifyButton={userId === notice.writerId}
                            />
                        )}
                    </button>
                </div>
            </div>
            <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: notice.content }}
            ></div>
            <div className="image-container">
                {notice.filePathUrl.map((url, index) => (
                    <img key={index} src={url} alt={`image-${index}`} className="image" />
                ))}
            </div>
            <BackButton />
            {openMsgModal && (
                <MsgModal senderId={userId} receiver={notice.nickname} onClose={closeMsg} />
            )}
            {summarizedBoard && (
                <div className="summarized-content">
                    <h2>게시글 요약</h2>
                    <p>{summarizedBoard.content}</p>
                </div>
            )}
        </>
    );
};

export default NoticeReadComponent;
