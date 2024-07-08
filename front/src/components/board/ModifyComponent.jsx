import React, { useState, useEffect } from "react";
import { modifyBoard, getOne, deleteBoard } from "../../api/boardApi";
import "../../assets/styles/App.scss"; // SCSS 파일 가져오기
import { useParams, useNavigate } from "react-router-dom";
import useCustomMove from "../../hooks/useCustomMove"; // 경로에 맞게 수정
import { validateBoardInputs } from "../../util/validationUtil"; // 유효성 검사 함수 가져오기

const categories = ["선택", "맛집", "청소", "요리", "재테크", "인테리어", "정책", "기타"];
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
    images: [],
    filePathUrl: [],
};

const ModifyComponent = () => {
    const { id } = useParams();
    const [board, setBoard] = useState(initState);
    const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 상태 관리
    const [files, setFiles] = useState([]); // 파일 상태 관리
    const [errors, setErrors] = useState({}); // 오류 메시지 상태 관리
    const navigate = useNavigate();
    const { moveToList } = useCustomMove(); // useCustomMove 훅 사용

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getOne(id);
                const { categoryName, title, content, filePathUrl } = response;
                setBoard((prevBoard) => ({
                    ...prevBoard,
                    categoryName,
                    title,
                    content,
                }));
                setFiles(filePathUrl || []);
            } catch (error) {
                console.error("게시물 데이터를 불러오는데 실패했습니다.", error);
            }
        };
        fetchData();
    }, [id]);

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

    const handleFileRemove = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const handleSave = async () => {
        const validationErrors = validateBoardInputs(board);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData();
        formData.append('id', id);
        formData.append('categoryName', board.categoryName);
        formData.append('title', board.title);
        formData.append('content', board.content);

        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }

        try {
            await modifyBoard(id, formData);
            console.log("수정 성공");
            navigate(`/board/${id}`);
        } catch (error) {
            console.error("수정 실패", error);
        }
    };

    const handleRemove = async () => {
        try {
            await deleteBoard(id);
            console.log("삭제 성공");
            moveToList();
        } catch (error) {
            console.error("삭제 실패", error);
        }
    };

    return (
        <div className="modify-component">
            <div className="title-bar">
                <div className="title-bar-line"></div>
                <div className="title-bar-text">게시글 수정</div>
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
                    {errors.categoryName && <div className="error-message">{errors.categoryName}</div>}
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
                    {errors.title && <div className="error-message">{errors.title}</div>}
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
                    {errors.content && <div className="error-message">{errors.content}</div>}
                </div>
                <div className="form-group">
                    <label>첨부파일</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        multiple
                    />
                    <div className="file-list">
                        {files.map((file, index) => (
                            <div key={index} className="file-item">
                                <span>{file.name || file}</span>
                                <button type="button" onClick={() => handleFileRemove(index)}>삭제</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-buttons">
                    <button className="cancel-button" onClick={() => moveToList()}>목록으로</button>
                    <button className="save-button" onClick={handleSave}>완료</button>
                    <button className="remove-button" onClick={handleRemove}>삭제</button>
                </div>
            </div>
        </div>
    );
};

export default ModifyComponent;
