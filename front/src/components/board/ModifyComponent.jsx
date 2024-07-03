import React, { useState, useEffect } from "react";
import { modifyBoard, getOne } from "../../api/boardApi";
import "../../assets/styles/App.scss"; // SCSS 파일 가져오기
import { useParams, useNavigate } from "react-router-dom";
import useCustomMove from "../../hooks/useCustomMove"; // 경로에 맞게 수정

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
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("선택");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const { moveToList } = useCustomMove(); // useCustomMove 훅 사용

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getOne(id);
                const { categoryName, title, content, filePathUrl } = response;
                setSelectedCategory(categoryName);
                setTitle(title);
                setContent(content);
                setFiles(filePathUrl || []);
            } catch (error) {
                console.error("게시물 데이터를 불러오는데 실패했습니다.", error);
            }
        };
        fetchData();
    }, [id]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setShowDropdown(false);
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles([...files, ...selectedFiles]);
    };

    const handleFileRemove = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('categoryName', selectedCategory);
        formData.append('title', title);
        formData.append('content', content);

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

    const handleCancel = () => {
        navigate(-1); // 이전 페이지로 이동
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
                        <button className="dropdown-button">{selectedCategory}</button>
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
                </div>
                <div className="form-group">
                    <label>제목</label>
                    <input
                        type="text"
                        placeholder="제목을 입력해주세요."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>내용</label>
                    <textarea
                        placeholder="내용을 입력해주세요."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
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
                    <button className="remove-button" onClick={handleCancel}>삭제</button>
                </div>
            </div>
        </div>
    );
};

export default ModifyComponent;
