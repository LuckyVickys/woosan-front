import React, { useState, useEffect } from "react";
import { updateBoard, getOne, deleteBoard } from "../../api/boardApi";
import "../../assets/styles/App.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useCustomMove from "../../hooks/useCustomMove";
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

const ModifyComponent = ({ titleBarText, category }) => {
    const { id } = useParams();
    const loginState = useSelector((state) => state.loginSlice);
    const [board, setBoard] = useState({
        ...initState,
        categoryName: category ? category : "선택",
    });
    const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 상태 관리
    const [files, setFiles] = useState([]); // 파일 상태 관리
    const [errors, setErrors] = useState({}); // 오류 메시지 상태 관리
    const navigate = useNavigate();
    const { moveToList } = useCustomMove();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getOne(id);
                if (response.writerId !== loginState.id) {
                    alert("접근 권한이 없습니다.");
                    navigate("/board");
                    return;
                }
                const { categoryName, title, content, filePathUrl } = response;
                setBoard((prevBoard) => ({
                    ...prevBoard,
                    categoryName,
                    title,
                    content,
                }));
                setFiles(filePathUrl || []);
            } catch (error) {
                console.error(
                    "게시물 데이터를 불러오는데 실패했습니다.",
                    error
                );
            }
        };
        fetchData();
    }, [id, loginState.id, navigate]);

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
        const selectedFiles = Array.from(e.target.files);
        setFiles([...files, ...selectedFiles]);
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

        const updatedBoard = { ...board, id, writerId: loginState.id, filePathUrl: files.filter(file => typeof file === "string") };

        const formData = new FormData();
        formData.append("boardDTO", new Blob([JSON.stringify(updatedBoard)], { type: "application/json" }));

        for (let i = 0; i < files.length; i++) {
            if (typeof files[i] !== "string") {
                formData.append("images", files[i]);
            }
        }

        try {
            const header = { headers: { "Content-Type": "multipart/form-data" } };
            await updateBoard(formData, header);
            console.log("수정 성공");
            navigate(`/board/${id}`);
        } catch (error) {
            console.error("수정 실패", error);
        }
    };



    const handleRemove = async () => {
        try {
            const removeDTO = {
                id: id,
                writerId: loginState.id,
            };
            await deleteBoard(removeDTO);
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
                <div className="title-bar-text">
                    {titleBarText || "게시글 수정"}
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
                        {!titleBarText && showDropdown && (
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
                    <input type="file" onChange={handleFileChange} multiple />
                    <div className="file-list">
                        {files.map((file, index) => (
                            <div key={index} className="file-item">
                                <span>{file.name || file}</span>
                                <button
                                    type="button"
                                    onClick={() => handleFileRemove(index)}
                                >
                                    삭제
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-buttons">
                    <button
                        className="cancel-button"
                        onClick={() => moveToList()}
                    >
                        목록으로
                    </button>
                    <button className="save-button" onClick={handleSave}>
                        완료
                    </button>
                    <button className="remove-button" onClick={handleRemove}>
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModifyComponent;
