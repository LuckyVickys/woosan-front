import React, { useRef, useState } from "react";
import { addBoard } from "../../api/boardApi"; // API 모듈에서 호출
import { useNavigate } from "react-router-dom";
import "../../assets/styles/App.scss";

const categories = ["선택", "맛집", "청소", "요리", "재테크", "인테리어", "정책", "기타"];

const initState = {
    writerId: 1, // 하드코딩된 writerId
    categoryName: "선택",
    title: "",
    content: "",
    files: [] // 빈 파일 리스트 초기화
};

const AddComponent = () => {
    const [board, setBoard] = useState({ ...initState });
    const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 상태 관리
    const [files, setFiles] = useState([]); // 파일 상태 관리
    const [errorCategory, setErrorCategory] = useState(""); // 카테고리 오류 메시지 상태 관리
    const [errorTitle, setErrorTitle] = useState(""); // 제목 오류 메시지 상태 관리
    const [errorContent, setErrorContent] = useState(""); // 내용 오류 메시지 상태 관리
    const uploadRef = useRef();
    const navigate = useNavigate();

    const handleChangeBoard = (e) => {
        const { name, value } = e.target;
        setBoard((prevBoard) => ({
            ...prevBoard,
            [name]: value,
        }));

        // 입력값 변경 시 해당 오류 메시지 초기화
        if (name === "title") {
            setErrorTitle("");
        } else if (name === "content") {
            setErrorContent("");
        }
    };

    const handleCategorySelect = (categoryName) => {
        setBoard((prevBoard) => ({
            ...prevBoard,
            categoryName: categoryName,
        }));
        setShowDropdown(false); // 카테고리를 선택한 후 드롭다운 닫기
        setErrorCategory(""); // 카테고리 선택 시 오류 메시지 초기화
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleClickAdd = async (e) => {
        // 유효성 검사
        let hasError = false;
        if (board.categoryName === "선택") {
            setErrorCategory("카테고리를 선택해주세요.");
            hasError = true;
        }
        if (!board.title.trim()) {
            setErrorTitle("제목을 입력해주세요.");
            hasError = true;
        }
        if (!board.content.trim()) {
            setErrorContent("내용을 입력해주세요.");
            hasError = true;
        }

        if (hasError) return;

        const formData = new FormData();
        formData.append('writerId', board.writerId);
        formData.append('categoryName', board.categoryName);
        formData.append('title', board.title);
        formData.append('content', board.content);

        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }

        try {
            const response = await addBoard(formData);
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
                <div className="title-bar-text">게시글 작성</div>
            </div>
            <div className="form">
                <div className="form-group">
                    <label>카테고리</label>
                    <div className="dropdown" onClick={() => setShowDropdown(!showDropdown)}>
                        <button className="dropdown-button">{board.categoryName}</button>
                        {showDropdown && (
                            <ul className="dropdown-list">
                                {categories.map((category, index) => (
                                    <li key={index} onClick={() => handleCategorySelect(category)}>
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {errorCategory && <div className="error-message">{errorCategory}</div>}
                </div>
                <div className="form-group">
                    <label>제목</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="제목을 입력해주세요."
                        value={board.title}
                        onChange={handleChangeBoard}
                    />
                    {errorTitle && <div className="error-message">{errorTitle}</div>}
                </div>
                <div className="form-group">
                    <label>내용</label>
                    <textarea
                        name="content"
                        placeholder="내용을 입력해주세요."
                        value={board.content}
                        onChange={handleChangeBoard}
                    ></textarea>
                    {errorContent && <div className="error-message">{errorContent}</div>}
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
                    <button className="save-button" onClick={handleClickAdd}>저장</button>
                    <button className="cancel-button" onClick={handleCancel}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default AddComponent;
