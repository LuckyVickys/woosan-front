import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { updatePassword } from "../../api/memberApi";
import TogglePassword from "../member/TogglePassword";
import Swal from "sweetalert2";
import "../../assets/styles/App.scss";

const initState = {
    email: "",
    password: "",
    newPassword: "",
};

const UpdatePassword = () => {
    const loginState = useSelector((state) => state.loginSlice);

    const [updateData, setUpdateData] = useState({
        ...initState,
        email: loginState.email,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showPwCheck, setShowPwCheck] = useState(false);

    const [pwCheck, setPwCheck] = useState("");

    const [passwordError, setPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [pwCheckError, setPwCheckError] = useState("");

    const [updatePW, setUpdatePW] = useState(false);

    const isValidPassword = (password) => {
        // 특수문자 ('~', '^', ',')를 제외하고, 영문, 숫자, 특수문자 조합하여 8~16자
        return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/.test(
            password
        );
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const togglePwCheck = () => {
        setShowPwCheck(!showPwCheck);
    };

    const handleUpdatePW = async (e) => {
        e.preventDefault();

        let valid = true;

        if (!updateData.password) {
            setPasswordError("필수 입력 사항입니다.");
            valid = false;
        }

        if (!updateData.newPassword) {
            setNewPasswordError("필수 입력 사항입니다.");
            valid = false;
        } else if (!isValidPassword(updateData.newPassword)) {
            setNewPasswordError("비밀번호 형식이 올바르지 않습니다.");
            valid = false;
        }

        if (!pwCheck) {
            setPwCheckError("필수 입력 사항입니다.");
            valid = false;
        } else if (updateData.newPassword !== pwCheck) {
            setPwCheckError("비밀번호가 일치하지 않습니다.");
            valid = false;
        }

        if (valid) {
            console.log(loginState.email);
            try {
                const updateResponse = await updatePassword(updateData);
                console.log("비밀번호 변경 완료:", updateResponse);
                setUpdatePW(true);

                Swal.fire(
                    "비밀번호 변경 완료",
                    "원래 화면으로 돌아갑니다.",
                    "success"
                );
            } catch (error) {
                console.error(
                    "비밀번호 변경 실패:",
                    error.response ? error.response.data : error.message
                );
                Swal.fire("비밀번호 변경 실패", `다시 시도해주세요.`, "error");
                setPasswordError("");
                setNewPasswordError("");
                setPwCheckError("");
            }
        }
    };

    return (
        <div className="update-password">
            <h2>비밀번호 변경</h2>
            <form onSubmit={handleUpdatePW} className="form-box">
                <div className="form-group">
                    <label>현재 비밀번호</label>
                    <div className="input-toggle-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="현재 비밀번호를 입력해주세요."
                            value={updateData.password}
                            onChange={(e) => {
                                setUpdateData({
                                    ...updateData,
                                    password: e.target.value,
                                });
                                setPasswordError("");
                            }}
                        />
                        <TogglePassword
                            isVisible={showPassword}
                            toggleVisibility={togglePassword}
                        />
                    </div>
                    {passwordError && (
                        <p className="input-error">{passwordError}</p>
                    )}
                </div>
                <div className="password-fields">
                    <div className="form-group">
                        <label>새로운 비밀번호</label>
                        <div className="input-toggle-container">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                placeholder="특수문자(‘~’, ‘^’, ‘,’) 제외"
                                value={updateData.newPassword}
                                onChange={(e) => {
                                    setUpdateData({
                                        ...updateData,
                                        newPassword: e.target.value,
                                    });
                                    setNewPasswordError("");
                                }}
                            />
                            <TogglePassword
                                isVisible={showNewPassword}
                                toggleVisibility={toggleNewPassword}
                            />
                        </div>
                        {newPasswordError && (
                            <p className="input-error">{newPasswordError}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label>비밀번호 확인</label>
                        <div className="input-toggle-container">
                            <input
                                type={showPwCheck ? "text" : "password"}
                                placeholder="비밀번호 재입력"
                                value={pwCheck}
                                onChange={(e) => {
                                    setPwCheck(e.target.value);
                                    setPwCheckError("");
                                }}
                            />
                            <TogglePassword
                                isVisible={showPwCheck}
                                toggleVisibility={togglePwCheck}
                            />
                        </div>
                        {pwCheckError && (
                            <p className="input-error">{pwCheckError}</p>
                        )}
                    </div>
                </div>
                <button className="update-button" type="submit">
                    변경하기
                </button>
            </form>
        </div>
    );
};

export default UpdatePassword;
