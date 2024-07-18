import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../../assets/styles/App.scss";
import { getMember, modifyProfile } from "../../api/memberProfileApi";
import { checkNickname } from "../../api/memberApi";
import defaultProfile from "../../assets/image/profile.png";
const UpdateInfo = () => {
    const loginState = useSelector((state) => state.loginSlice);
    const memberId = loginState.id; // 로그인된 회원의 ID를 가져옴

    const [updateNickname, setUpdateNickname] = useState(false);
    const [nicknameAvailable, setNicknameAvailable] = useState(false);
    const [nicknameError, setNicknameError] = useState("");
    const [nicknameChecked, setNicknameChecked] = useState(false); // 닉네임 중복 체크 여부를 관리하는 상태

    const [checkNickName, setCheckNickName] = useState(true); // checkNickName을 상태로 변경

    const [formData, setFormData] = useState({
        nickname: "카카시",
        region: "",
        gender: "",
        age: "",
        height: "",
        mbti: "",
        point: loginState.point || 0, // 초기 point 값을 loginState에서 가져옴
        nextPoint: loginState.nextPoint || 0, // 초기 nextPoint 값을 loginState에서 가져옴
        fileImg: null, // 초기 fileImg 값을 null로 설정
        fileImgURL: "", // 이미지 URL을 저장하기 위한 필드
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const memberData = await getMember(memberId);
                console.log("Fetched member data:", memberData); // 콘솔에 데이터 출력
                setFormData((prevData) => ({
                    ...prevData,
                    nickname: memberData.nickname || "",
                    region: memberData.location || "",
                    gender: memberData.gender || "",
                    age: memberData.age || "",
                    height: memberData.height || "",
                    mbti: memberData.mbti || "",
                    point: memberData.point || loginState.point || 0,
                    nextPoint:
                        memberData.nextPoint || loginState.nextPoint || 0,
                    fileImg: null, // fileImg 값을 null로 설정
                    fileImgURL: memberData.fileImg?.[0] || "", // 이미지 URL 설정
                }));
            } catch (error) {
                console.error("Error fetching member data:", error);
            }
        };

        if (memberId) {
            fetchData();
        }
    }, [memberId, loginState.point, loginState.nextPoint]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // 닉네임 입력 중에는 에러 메시지 초기화
        if (name === "nickname") {
            setNicknameError("");
            setNicknameAvailable(false);
            setNicknameChecked(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setFormData((prevData) => ({
                ...prevData,
                fileImg: file, // 파일 객체 저장
                fileImgURL: fileURL, // 이미지 URL 설정
            }));
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
                nickname: formData.nickname,
                location: formData.region,
                gender: formData.gender,
                age: formData.age,
                height: formData.height,
                mbti: formData.mbti,
                point: formData.point,
                nextPoint: formData.nextPoint,
            };

            // 이미지 파일이 선택된 경우에만 profileUpdateDTO에 image 필드 추가
            if (formData.fileImg) {
                profileUpdateDTO.image = [formData.fileImg];
            }

            await modifyProfile(memberId, profileUpdateDTO);
            console.log("Information updated successfully");
            alert("프로필을 수정했습니다.");
            window.location.reload(); // 현재 페이지 리다이렉트
        } catch (error) {
            console.error("Error updating information:", error);
            alert("프로필 수정에 실패했습니다."); // 에러 발생 시 알림창
        }
    };

    const progressBarWidth =
        formData.nextPoint > 0
            ? `${(formData.point / formData.nextPoint) * 100}%`
            : "0%";

    const isValidNickname = (nickname) => {
        // 한글 자모음 제외, 특수문자 제외 1~8자
        return /^[가-힣a-zA-Z0-9]{1,8}$/.test(nickname);
    };

    // 닉네임 중복 체크
    const handleCheckNickname = async () => {
        if (!formData.nickname) {
            setNicknameError("필수 입력 사항입니다.");
            return;
        } else if (!isValidNickname(formData.nickname)) {
            setNicknameError("닉네임 형식이 올바르지 않습니다.");
            return;
        }

        try {
            const nicknameResponse = await checkNickname(formData.nickname);
            if (nicknameResponse === false) {
                setNicknameError("사용 가능한 닉네임입니다.");
                setNicknameAvailable(true);
                setCheckNickName(true); // 닉네임 체크 통과
            }
        } catch (error) {
            setNicknameError("이미 존재하는 닉네임입니다.");
            setNicknameAvailable(false);
            setCheckNickName(false); // 닉네임 체크 실패
        } finally {
            setNicknameChecked(true); // 중복 체크 완료 상태 설정
        }
    };

    const handleNicknameChange = () => {
        setCheckNickName(false); // 닉네임 변경 시 중복 체크 다시 필요
        if (!updateNickname) {
            setUpdateNickname(true);
        } else {
            handleCheckNickname();
        }
    };

    return (
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
                            accept="image/*"
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
    );
};

export default UpdateInfo;
