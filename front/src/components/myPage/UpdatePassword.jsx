import React, { useState } from "react";
import "../../assets/styles/App.scss";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    // Handle password change logic here
    console.log("Password changed");
  };

  return (
    <div className="update-password">
      <h2>비밀번호 변경</h2>
      <div className="form-group">
        <label>현재 비밀번호</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className="password-fields">
        <div className="form-group">
          <label>새로운 비밀번호</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <button className="update-button" onClick={handlePasswordChange}>변경하기</button>
    </div>
  );
};

export default UpdatePassword;