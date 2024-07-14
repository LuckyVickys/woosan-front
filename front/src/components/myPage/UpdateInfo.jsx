import React, { useState } from "react";
import "../../assets/styles/App.scss";

const UpdateInfo = () => {
  const [nickname, setNickname] = useState("카카시");
  const [region, setRegion] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [mbti, setMbti] = useState("");

  const handleInfoChange = () => {
    // Handle info change logic here
    console.log("Information updated");
  };

  return (
    <div className="update-info">
      <h2>회원 정보 변경</h2>
      <div className="update-info-container">
        <div className="update-user-info-profile">
            <div className="update-user-info">
                <div className="form-group">
                    <label>닉네임</label>
                    <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    disabled
                    />
                </div>
                <div className="form-group">
                    <label>등급 / 포인트</label>
                    <div className="point-level">
                        <div className="level-point">
                            <span>Lv.3</span>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: "80%" }}></div>
                            </div>
                            <span>483/600 P</span>
                        </div>
                    </div>
                </div>
                <div className="location-gender">
                    <div className="form-group">
                        <label>지역</label>
                        <input
                        type="text"
                        value={region}
                        placeholder="입력해주세요"
                        onChange={(e) => setRegion(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>성별</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
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
                        value={age}
                        placeholder="입력해주세요"
                        onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>키</label>
                        <input
                        type="number"
                        value={height}
                        placeholder="입력해주세요"
                        onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>MBTI</label>
                    <select value={mbti} onChange={(e) => setMbti(e.target.value)}>
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
                <div className="user-profile" />
                <button className="update-profile-button" onClick={handleInfoChange}>사진 선택</button>
            </div>
        </div>
        <button className="update-button" onClick={handleInfoChange}>변경하기</button>
      </div>
    </div>
  );
};

export default UpdateInfo;