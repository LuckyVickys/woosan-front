import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../../assets/styles/App.scss";
import { getMember, modifyProfile } from "../../api/memberProfileApi";
import { checkNickname, getMemberWithEmail } from "../../api/memberApi";
import defaultProfile from "../../assets/image/profile.png";
import Swal from "sweetalert2";
import { Desktop, Tablet, Mobile } from '../../layouts/ResponsiveComponent';

const UpdateInfo = () => {
    const loginState = useSelector((state) => state.loginSlice);
    const memberId = loginState.id;
    const token = loginState.accessToken;
    const [userData, setUserData] = useState(null);
    const [updateNickname, setUpdateNickname] = useState(false);
    const [nicknameAvailable, setNicknameAvailable] = useState(false);
    const [nicknameError, setNicknameError] = useState("");
    const [nicknameChecked, setNicknameChecked] = useState(false);

    const [checkNickName, setCheckNickName] = useState(true);

    const [formData, setFormData] = useState({
        nickname: "",
        region: "",
        gender: "",
        age: "",
        height: "",
        mbti: "",
        introduce: "",
        point: loginState.point || 0,
        nextPoint: loginState.nextPoint || 0,
        fileImg: null,
        fileImgURL: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            if (loginState.email) {
                try {
                    const userData = await getMemberWithEmail(loginState.email, loginState.accessToken);
                    setUserData(userData);

                    const memberData = await getMember(userData.id);
                    setFormData((prevData) => ({
                        ...prevData,
                        nickname: memberData.nickname || "",
                        region: memberData.location || "",
                        gender: memberData.gender || "",
                        age: memberData.age || "",
                        height: memberData.height || "",
                        mbti: memberData.mbti || "",
                        introduce: memberData.introduce || "",
                        point: memberData.point || loginState.point || 0,
                        nextPoint: memberData.nextPoint || loginState.nextPoint || 0,
                        fileImg: null,
                        fileImgURL: memberData.fileImg?.[0] || "",
                    }));
                } catch (error) {
                    Swal.fire({
                        title: `로그인 에러`,
                        text: `다시 시도해주세요.`,
                        icon: "error",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "확인",
                    });
                    console.error("Error fetching user data: ", error);
                }
            } else {
            }
        };

        if (memberId) {
            fetchData();
        }
    }, [memberId, loginState.email, loginState.accessToken, loginState.point, loginState.nextPoint]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "nickname") {
            setNicknameError("");
            setNicknameAvailable(false);
            setNicknameChecked(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

            if (allowedTypes.includes(file.type)) {
                const fileURL = URL.createObjectURL(file);

                setFormData((prevData) => ({
                    ...prevData,
                    fileImg: file,
                    fileImgURL: fileURL,
                }));
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

    const handleInfoChange = async () => {
        if (!checkNickName && updateNickname) {
            setNicknameError("닉네임 중복 체크를 진행해주세요.");
            return;
        }
    
        try {
            const profileUpdateDTO = {
                memberId: memberId,
                nickname: formData.nickname || null,
                location: formData.region || null,
                gender: formData.gender || null,
                age: formData.age || null,
                height: formData.height || null,
                mbti: formData.mbti || null,
                introduce: formData.introduce || null,
                point: formData.point,
                nextPoint: formData.nextPoint,
            };
    
            const formDataObj = new FormData();
            formDataObj.append('profileUpdateDTO', new Blob([JSON.stringify(profileUpdateDTO)], { type: "application/json" }));
    
            if (formData.fileImg) {
                formDataObj.append('images', formData.fileImg);
            }
    
            const res = await modifyProfile(formDataObj, token);
    
            Swal.fire({
                title: "프로필 수정 완료",
                text: "회원 정보 수정 페이지로 돌아갑니다.",
                icon: "success",
                confirmButtonText: "확인",
                confirmButtonColor: "#3085d6",
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error("Error updating information:", error);
            Swal.fire({
                title: "프로필 수정 실패",
                text: `다시 시도해주세요.: ${error.message}`,
                icon: "error",
                confirmButtonText: "확인",
                confirmButtonColor: "#3085d6",
            });
        }
    };

    const progressBarWidth = formData.nextPoint > 0 ? `${(formData.point / formData.nextPoint) * 100}%` : "0%";

    const isValidNickname = (nickname) => {
        return /^[가-힣a-zA-Z0-9]{1,8}$/.test(nickname);
    };

    const handleCheckNickname = async () => {
        if (!formData.nickname) {
            setNicknameError("필수 입력 사항입니다.");
            return;
        } else if (!isValidNickname(formData.nickname)) {
            setNicknameError("닉네임 형식이 올바르지 않습니다.");
            return;
        }

        try {
            const nicknameResponse = await checkNickname(formData.nickname, token);
            if (nicknameResponse === false) {
                setNicknameError("사용 가능한 닉네임입니다.");
                setNicknameAvailable(true);
                setCheckNickName(true);
            }
        } catch (error) {
            setNicknameError("이미 존재하는 닉네임입니다.");
            setNicknameAvailable(false);
            setCheckNickName(false);
        } finally {
            setNicknameChecked(true);
        }
    };

    const handleNicknameChange = () => {
        setCheckNickName(false);
        if (!updateNickname) {
            setUpdateNickname(true);
        } else {
            handleCheckNickname();
        }
    };


    return (
        <>
            <Desktop>
                <div className="update-info">
                    <h2>회원 정보 변경</h2>
                    <div className="update-info-container">
                        <div className="update-user-info-profile">
                            <div className="update-user-info">
                                <div className="form-group">
                                    <label>닉네임</label>
                                    <div className="input-button-container">
                                        <input
                                            className="nickname-input"
                                            type="text"
                                            name="nickname"
                                            value={formData.nickname}
                                            onChange={handleChange}
                                            disabled={!updateNickname}
                                        />
                                        <button
                                            type="button"
                                            className="check-button"
                                            onClick={handleNicknameChange}
                                        >
                                            {updateNickname ? "중복체크" : "변경하기"}
                                        </button>
                                    </div>
                                    {nicknameError && (
                                        <p
                                            className={`input-error ${
                                                nicknameAvailable ? "available" : ""
                                            }`}
                                        >
                                            {nicknameError}
                                        </p>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>등급 / 포인트</label>
                                    <div className="point-level">
                                        <div className="level-point">
                                            <span>{loginState.level}</span>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress"
                                                    style={{ width: progressBarWidth }}
                                                ></div>
                                            </div>
                                            <span className="progress-point">
                                                {formData.point} / {formData.nextPoint}{" "}
                                                P
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="location-gender">
                                    <div className="form-group">
                                        <label>지역</label>
                                        <input
                                            type="text"
                                            name="region"
                                            value={formData.region}
                                            placeholder="입력해주세요"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>성별</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="">선택</option>
                                            <option value="male">남성</option>
                                            <option value="female">여성</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="age-height">
                                    <div className="form-group">
                                        <label>나이</label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            placeholder="입력해주세요"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>키</label>
                                        <input
                                            type="number"
                                            name="height"
                                            value={formData.height}
                                            placeholder="입력해주세요"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>MBTI</label>
                                    <select
                                        name="mbti"
                                        value={formData.mbti}
                                        onChange={handleChange}
                                    >
                                        <option value="">선택</option>
                                        <option value="INTJ">INTJ</option>
                                        <option value="INTP">INTP</option>
                                        <option value="ENTJ">ENTJ</option>
                                        <option value="ENTP">ENTP</option>
                                        <option value="INFJ">INFJ</option>
                                        <option value="INFP">INFP</option>
                                        <option value="ENFJ">ENFJ</option>
                                        <option value="ENFP">ENFP</option>
                                        <option value="ISTJ">ISTJ</option>
                                        <option value="ISFJ">ISFJ</option>
                                        <option value="ESTJ">ESTJ</option>
                                        <option value="ESFJ">ESFJ</option>
                                        <option value="ISTP">ISTP</option>
                                        <option value="ISFP">ISFP</option>
                                        <option value="ESTP">ESTP</option>
                                        <option value="ESFP">ESFP</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>한줄 자기소개</label>
                                    <input
                                        type="text"
                                        name="introduce"
                                        value={formData.introduce}
                                        placeholder="입력해주세요"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="update-profile">
                                <div className="user-profile">
                                    <img
                                        src={formData.fileImgURL || defaultProfile}
                                        alt="Profile"
                                    />
                                </div>
                                <input
                                    type="file"
                                    accept=".png .jpg .jpeg"
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                    id="file-input"
                                />
                                <label
                                    className="update-profile-button"
                                    htmlFor="file-input"
                                >
                                    사진 선택
                                </label>
                            </div>
                        </div>
                        <button className="update-button" onClick={handleInfoChange}>
                            변경하기
                        </button>
                    </div>
                </div>
            </Desktop>
            <Tablet>
                <div className="update-info">
                    <h2>회원 정보 변경</h2>
                    <div className="update-info-container">
                        <div className="update-user-info-profile">

                            
                            <div className="update-profile">
                                <div className="user-profile">
                                    <img
                                        src={formData.fileImgURL || defaultProfile}
                                        alt="Profile"
                                    />
                                </div>
                                <input
                                    type="file"
                                    accept=".png .jpg .jpeg"
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                    id="file-input"
                                />
                                <label
                                    className="update-profile-button"
                                    htmlFor="file-input"
                                >
                                    사진 선택
                                </label>
                            </div>
                            <div className="update-user-info">
                                <div className="form-group">
                                    <label>닉네임</label>
                                    <div className="input-button-container">
                                        <input
                                            className="nickname-input"
                                            type="text"
                                            name="nickname"
                                            value={formData.nickname}
                                            onChange={handleChange}
                                            disabled={!updateNickname}
                                        />
                                        <button
                                            type="button"
                                            className="check-button"
                                            onClick={handleNicknameChange}
                                        >
                                            {updateNickname ? "중복체크" : "변경하기"}
                                        </button>
                                    </div>
                                    {nicknameError && (
                                        <p
                                            className={`input-error ${
                                                nicknameAvailable ? "available" : ""
                                            }`}
                                        >
                                            {nicknameError}
                                        </p>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>등급 / 포인트</label>
                                    <div className="point-level">
                                        <div className="level-point">
                                            <span>{loginState.level}</span>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress"
                                                    style={{ width: progressBarWidth }}
                                                ></div>
                                            </div>
                                            <span className="progress-point">
                                                {formData.point} / {formData.nextPoint}{" "}
                                                P
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="location-gender">
                                    <div className="form-group">
                                        <label>지역</label>
                                        <input
                                            type="text"
                                            name="region"
                                            value={formData.region}
                                            placeholder="입력해주세요"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>성별</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="">선택</option>
                                            <option value="male">남성</option>
                                            <option value="female">여성</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="age-height">
                                    <div className="form-group">
                                        <label>나이</label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            placeholder="입력해주세요"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>키</label>
                                        <input
                                            type="number"
                                            name="height"
                                            value={formData.height}
                                            placeholder="입력해주세요"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>MBTI</label>
                                    <select
                                        name="mbti"
                                        value={formData.mbti}
                                        onChange={handleChange}
                                    >
                                        <option value="">선택</option>
                                        <option value="INTJ">INTJ</option>
                                        <option value="INTP">INTP</option>
                                        <option value="ENTJ">ENTJ</option>
                                        <option value="ENTP">ENTP</option>
                                        <option value="INFJ">INFJ</option>
                                        <option value="INFP">INFP</option>
                                        <option value="ENFJ">ENFJ</option>
                                        <option value="ENFP">ENFP</option>
                                        <option value="ISTJ">ISTJ</option>
                                        <option value="ISFJ">ISFJ</option>
                                        <option value="ESTJ">ESTJ</option>
                                        <option value="ESFJ">ESFJ</option>
                                        <option value="ISTP">ISTP</option>
                                        <option value="ISFP">ISFP</option>
                                        <option value="ESTP">ESTP</option>
                                        <option value="ESFP">ESFP</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>한줄 자기소개</label>
                                    <input
                                        type="text"
                                        name="introduce"
                                        value={formData.introduce}
                                        placeholder="입력해주세요"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <button className="update-button" onClick={handleInfoChange}>
                            변경하기
                        </button>
                    </div>
                </div>
            </Tablet>
            <Mobile>
                <div className="update-info">
                    <h2>회원 정보 변경</h2>
                    <div className="update-info-container">
                        <div className="update-user-info-profile">
                            <div className="update-profile">
                                <div className="user-profile">
                                    <img
                                        src={formData.fileImgURL || defaultProfile}
                                        alt="Profile"
                                    />
                                </div>
                                <input
                                    type="file"
                                    accept=".png .jpg .jpeg"
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                    id="file-input"
                                />
                                <label
                                    className="update-profile-button"
                                    htmlFor="file-input"
                                >
                                    사진 선택
                                </label>
                            </div>
                            <div className="update-user-info">
                                <div className="form-group">
                                    <label>닉네임</label>
                                    <div className="input-button-container">
                                        <input
                                            className="nickname-input"
                                            type="text"
                                            name="nickname"
                                            value={formData.nickname}
                                            onChange={handleChange}
                                            disabled={!updateNickname}
                                        />
                                        <button
                                            type="button"
                                            className="check-button"
                                            onClick={handleNicknameChange}
                                        >
                                            {updateNickname ? "중복체크" : "변경하기"}
                                        </button>
                                    </div>
                                    {nicknameError && (
                                        <p
                                            className={`input-error ${
                                                nicknameAvailable ? "available" : ""
                                            }`}
                                        >
                                            {nicknameError}
                                        </p>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>등급 / 포인트</label>
                                    <div className="point-level">
                                        <div className="level-point">
                                            <span>{loginState.level}</span>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress"
                                                    style={{ width: progressBarWidth }}
                                                ></div>
                                            </div>
                                            <span className="progress-point">
                                                {formData.point} / {formData.nextPoint}{" "}
                                                P
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="location-gender">
                                    <div className="form-group">
                                        <label>지역</label>
                                        <input
                                            type="text"
                                            name="region"
                                            value={formData.region}
                                            placeholder="입력해주세요"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>성별</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="">선택</option>
                                            <option value="male">남성</option>
                                            <option value="female">여성</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="age-height">
                                    <div className="form-group">
                                        <label>나이</label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            placeholder="입력해주세요"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>키</label>
                                        <input
                                            type="number"
                                            name="height"
                                            value={formData.height}
                                            placeholder="입력해주세요"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>MBTI</label>
                                    <select
                                        name="mbti"
                                        value={formData.mbti}
                                        onChange={handleChange}
                                    >
                                        <option value="">선택</option>
                                        <option value="INTJ">INTJ</option>
                                        <option value="INTP">INTP</option>
                                        <option value="ENTJ">ENTJ</option>
                                        <option value="ENTP">ENTP</option>
                                        <option value="INFJ">INFJ</option>
                                        <option value="INFP">INFP</option>
                                        <option value="ENFJ">ENFJ</option>
                                        <option value="ENFP">ENFP</option>
                                        <option value="ISTJ">ISTJ</option>
                                        <option value="ISFJ">ISFJ</option>
                                        <option value="ESTJ">ESTJ</option>
                                        <option value="ESFJ">ESFJ</option>
                                        <option value="ISTP">ISTP</option>
                                        <option value="ISFP">ISFP</option>
                                        <option value="ESTP">ESTP</option>
                                        <option value="ESFP">ESFP</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>한줄 자기소개</label>
                                    <input
                                        type="text"
                                        name="introduce"
                                        value={formData.introduce}
                                        placeholder="입력해주세요"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <button className="update-button" onClick={handleInfoChange}>
                            변경하기
                        </button>
                    </div>
                </div>
            </Mobile>
        </>
    );
};

export default UpdateInfo;