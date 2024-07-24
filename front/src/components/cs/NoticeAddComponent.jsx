import React, { useRef, useState, useEffect } from "react";
import { createBoard } from "../../api/boardApi"; // API 모듈에서 호출
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Redux의 useSelector 훅 사용
import "../../assets/styles/App.scss";
import { validateBoardInputs } from "../../util/validationUtil";

const initState = {
    writerId: null,
    categoryName: "공지사항",
    title: "",
    content: "",
    files: [],
};

const NoticeAddComponent = () => {
    const loginState = useSelector((state) => state.loginSlice);
    const [board, setBoard] = useState(initState);

    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const uploadRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if (loginState.id) {
            setBoard((prevBoard) => ({
                ...prevBoard,
                writerId: loginState.id,
            }));
        }
    }, [loginState.id]);

    const handleChangeBoard = (e) => {
        const { name, value } = e.target;
        setBoard((prevBoard) => ({
            ...prevBoard,
            [name]: value,
        }));

        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleClickAdd = async (e) => {
        const validationErrors = validateBoardInputs(board);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData();
        formData.append(
            "boardDTO",
            new Blob([JSON.stringify(board)], { type: "application/json" })
        );

        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i]);
        }

        try {
            const header = {
                headers: { "Content-Type": "multipart/form-data" },
            };
            await createBoard(formData, header);
            navigate("/admin/notice");
        } catch (error) {
            console.error("저장 실패", error);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="add-component">
            <div className="title-bar">
                <div className="title-bar-line"></div>
                <div className="title-bar-text">공지사항 작성</div>
            </div>
            <div className="form">
                <div className="form-group">
                    <label>카테고리</label>
                    <div className="dropdown">
                        <div className="dropdown-button">
                            {board.categoryName}
                        </div>
                    </div>
                    {errors.categoryName && (
                        <div className="error-message">
                            {errors.categoryName}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label>제목</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="제목을 입력해주세요."
                        value={board.title}
                        onChange={handleChangeBoard}
                        maxLength={40}
                    />
                    {errors.title && (
                        <div className="error-message">{errors.title}</div>
                    )}
                </div>
                <div className="form-group">
                    <label>내용</label>
                    <textarea
                        name="content"
                        placeholder="내용을 입력해주세요."
                        value={board.content}
                        onChange={handleChangeBoard}
                        maxLength={1960}
                    ></textarea>
                    {errors.content && (
                        <div className="error-message">{errors.content}</div>
                    )}
                </div>
                <div className="form-group">
                    <label>첨부파일</label>
                    <input
                        type="file"
                        ref={uploadRef}
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-buttons">
                    <button className="save-button" onClick={handleClickAdd}>
                        저장
                    </button>
                    <button className="cancel-button" onClick={handleCancel}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoticeAddComponent;
