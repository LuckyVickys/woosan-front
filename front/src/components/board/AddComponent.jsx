import React, { useRef, useState, useEffect } from "react";
import { createBoard } from "../../api/boardApi"; // API 모듈에서 호출
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Redux의 useSelector 훅 사용
import "../../assets/styles/App.scss";
import { validateBoardInputs } from "../../util/validationUtil";

const categories = [
    "선택",
    "맛집",
    "청소",
    "요리",
    "재테크",
    "인테리어",
    "정책",
    "기타",
];

const initState = {
    writerId: null, // 초기 상태를 null로 설정
    categoryName: "선택",
    title: "",
    content: "",
    files: [], // 빈 파일 리스트 초기화
};

const AddComponent = ({ titleBarText, category }) => {
    const loginState = useSelector((state) => state.loginSlice);
    const [board, setBoard] = useState({
        ...initState,
        categoryName: category ? category : "선택",
    });
    const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 상태 관리
    const [files, setFiles] = useState([]); // 파일 상태 관리
    const [errors, setErrors] = useState({}); // 오류 메시지 상태 관리
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

        // 입력값 변경 시 해당 오류 메시지 초기화
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const handleCategorySelect = (categoryName) => {
        setBoard((prevBoard) => ({
            ...prevBoard,
            categoryName: categoryName,
        }));
        setShowDropdown(false); // 카테고리를 선택한 후 드롭다운 닫기
        setErrors((prevErrors) => ({ ...prevErrors, categoryName: "" })); // 카테고리 선택 시 오류 메시지 초기화
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
        formData.append("writerId", board.writerId);
        formData.append("categoryName", board.categoryName);
        formData.append("title", board.title);
        formData.append("content", board.content);

        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i]);
        }

        try {
            const response = await createBoard(formData);
            console.log("저장 성공", response);
            navigate("/board");
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
                <div className="title-bar-text">
                    {titleBarText || "게시글 작성"}
                </div>
            </div>
            <div className="form">
                <div className="form-group">
                    <label>카테고리</label>
                    <div
                        className="dropdown"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <button className="dropdown-button">
                            {board.categoryName}
                        </button>
                        {showDropdown && (
                            <ul className="dropdown-list">
                                {categories.map((category, index) => (
                                    <li
                                        key={index}
                                        onClick={() =>
                                            handleCategorySelect(category)
                                        }
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        )}
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

export default AddComponent;
