import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteMember, updatePassword } from "../../api/memberApi";
import TogglePassword from "../member/TogglePassword";
import Swal from "sweetalert2";
import "../../assets/styles/App.scss";
import { logout } from "../../slices/loginSlice";

const initState = {
    email: "",
    password: "",
    newPassword: "",
};

const UpdatePassword = () => {
    const loginState = useSelector((state) => state.loginSlice);
    const token = loginState.accessToken;
    const dispatch = useDispatch();

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
                const updateResponse = await updatePassword(updateData, token);
                console.log("비밀번호 변경 완료:", updateResponse);
                setUpdatePW(true);

                Swal.fire(
                    "비밀번호 변경 완료",
                    "원래 화면으로 돌아갑니다.",
                    "success"
                );
                window.location.reload();
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

    const handleMemberDelete = async (e) => {
        Swal.fire({
            icon: "warning",
            title:"정말 탈퇴하시겠습니까?",
            text: "탈퇴 후 같은 이메일로 재가입은 불가능합니다.",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "확인",
            cancelButtonText: "취소",
        }).then(async (result) => {
            if(result.isConfirmed) {
                const {value:password} = await Swal.fire({
                    title: "비밀번호를 입력해주세요.",
                    input: "password",
                    inputAttributes: {
                        autocapitalize: "off"
                    },
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "확인",
                    cancelButtonText: "취소"
                });

                if(password) {
                    try {
                        const deleteResponse = await deleteMember(
                            {
                            email: loginState.email,
                            password: password,
                            }, token
                        );
                        console.log("회원 탈퇴 성공: " + deleteResponse);
                        Swal.fire({
                            icon: "success",
                            title: "회원 탈퇴 성공",
                            text: "회원 탈퇴가 완료되었습니다."
                        }).then(() => {
                            dispatch(logout());
                        });
                    } catch(error) {
                        console.error(
                            "회원 탈퇴 실패: ",
                            error.response ? error.response.data : error.message
                        );
                        Swal.fire({
                            icon: "error",
                            title: "회원 탈퇴 실패",
                            text: "비밀번호가 일치하지 않습니다. 다시 시도해주세요."
                        });
                    }
                }
            }
        });
    }

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
                <div className="info-button-wrapper">
                    <button className="update-button" type="submit">
                        변경하기
                    </button>
                    <div className="delete-member-wrapper" onClick={handleMemberDelete}>회원 탈퇴</div>
                </div>
            </form>
        </div>
    );
};

export default UpdatePassword;
