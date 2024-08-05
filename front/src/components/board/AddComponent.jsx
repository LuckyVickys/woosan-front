import React, { useRef, useState, useEffect } from "react";
import { createBoard } from "../../api/boardApi";
import { getMemberWithEmail } from "../../api/memberApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import "../../assets/styles/App.scss";
import { validateBoardInputs } from "../../util/validationUtil";
import { getCookie } from '../../util/cookieUtil';

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
  writerId: null,
  categoryName: "선택",
  title: "",
  content: "",
  files: [],
};

const AddComponent = ({ titleBarText, category }) => {
  const loginState = useSelector((state) => state.loginSlice);
  const [board, setBoard] = useState({
    ...initState,
    categoryName: category ? category : "선택",
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const uploadRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (loginState.email) {
        try {
          const userData = await getMemberWithEmail(
            loginState.email,
            loginState.accessToken
          );
          setBoard((prevBoard) => ({
            ...prevBoard,
            writerId: userData.id,
          }));
        } catch (error) {
          Swal.fire({
            title: `로그인 에러`,
            text: `다시 시도해주세요.`,
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "확인",
          });
        }
      }
    };
    fetchData();
  }, [loginState.email, loginState.accessToken]);

  const handleChangeBoard = (e) => {
    const { name, value } = e.target;
    setBoard((prevBoard) => ({
      ...prevBoard,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));   // 입력값 변경 시 해당 오류 메시지 초기화
  };

  const handleCategorySelect = (categoryName) => {
    setBoard((prevBoard) => ({
      ...prevBoard,
      categoryName: categoryName,
    }));
    setShowDropdown(false);
    setErrors((prevErrors) => ({ ...prevErrors, categoryName: "" })); // 카테고리 선택 시 오류 메시지 초기화
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
      if (file) {

          const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

          if (allowedTypes.includes(file.type)) {
            setFiles(e.target.files);
          } else {
              Swal.fire({
                  title: "업로드 실패",
                  text: `jpg, jpeg, png 파일만 업로드 가능합니다.`,
                  icon: "error",
                  confirmButtonText: "확인",
              });
          }
      }
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
        headers: {
          Authorization: `Bearer ${loginState.accessToken}`,
          Refresh: getCookie("member").refreshToken,
          "Content-Type": "multipart/form-data"
        }
      };
      await createBoard(formData, header);
      navigate("/board");
    } catch (error) {
      Swal.fire({
        title: `저장 실패`,
        text: `다시 시도해주세요.`,
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      });
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="add-component">
      <div className="title-bar">
        <div className="title-bar-line"></div>
        <div className="title-bar-text">{titleBarText || "게시글 작성"}</div>
      </div>
      <div className="form">
        <div className="form-group">
          <label>카테고리</label>
          <div
            className="dropdown"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <button className="dropdown-button">{board.categoryName}</button>
            {showDropdown && (
              <ul className="dropdown-list">
                {categories.map((category, index) => (
                  <li
                    key={index}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {errors.categoryName && (
            <div className="error-message">{errors.categoryName}</div>
          )}
        </div>
        <div className="form-group">
          <label>제목</label>
          <input
            type="text"
            name="title"
            placeholder="제목을 입력해주세요.(최대 40자)"
            value={board.title}
            onChange={handleChangeBoard}
            maxLength={40}
            className="title"
          />
          {errors.title && <div className="error-message">{errors.title}</div>}
        </div>
        <div className="form-group">
          <label>내용</label>
          <textarea
            name="content"
            placeholder="내용을 입력해주세요.(최대 1960자)"
            value={board.content}
            onChange={handleChangeBoard}
            maxLength={1960}
            className="textarea"
          ></textarea>
          {errors.content && (
            <div className="error-message">{errors.content}</div>
          )}
        </div>
        <div className="form-group">
          <label>첨부파일</label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
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
