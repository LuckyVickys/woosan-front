import defaultProfile from '../../assets/image/profile.png';
import React, { useReducer, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { applyMatching, cancelMatchingRequest, leaveMatching, getMembers, getPendingRequestsByBoardId } from '../../api/memberMatchingApi';
import { increaseViewCount } from '../../api/matchingBoardApi';
import ReplySection from './ReplySection';
import MatchingDropDown from '../matching/element/MatchingDropDown.jsx';
import styles from '../../assets/styles/matching/MatchingModal.module.scss';
import { formatDate } from "../../util/DateUtil.jsx";
import { useSelector } from 'react-redux';
import { BsThreeDotsVertical } from "react-icons/bs";
import ReportModal from "../board/element/ReportModal.jsx";
import MsgModal from "../board/element/MsgModal.jsx";
import { PiGenderIntersexFill } from "react-icons/pi";
import useCustomLogin from '../../hooks/useCustomLogin.jsx';

// 초기 상태
const initialState = {
    isApplied: false,
    isMember: false,
    isManager: false,
    membersCount: 0,
    commentCount: 0,
    views: 0,
    isDropdownOpen: false,
    isReportModalOpen: false,
    isMsgModalOpen: false,
};

// 리듀서 함수
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_APPLIED':
            return { ...state, isApplied: action.payload };
        case 'SET_MEMBER':
            return { ...state, isMember: action.payload };
        case 'SET_MANAGER':
            return { ...state, isManager: action.payload };
        case 'SET_MEMBERS_COUNT':
            return { ...state, membersCount: action.payload };
        case 'SET_COMMENT_COUNT':
            return { ...state, commentCount: action.payload };
        case 'INCREMENT_VIEWS':
            return { ...state, views: state.views + 1 };
        case 'SET_DROPDOWN_OPEN':
            return { ...state, isDropdownOpen: action.payload };
        case 'SET_REPORT_MODAL_OPEN':
            return { ...state, isReportModalOpen: action.payload };
        case 'SET_MSG_MODAL_OPEN':
            return { ...state, isMsgModalOpen: action.payload };
        default:
            return state;
    }
};

const MatchingModal = ({ item = {}, onClose }) => {
    const loginState = useSelector((state) => state.loginSlice);
    const memberId = loginState.id;
    const { isLogin, moveToLoginReturn } = useCustomLogin();

    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        views: item.views || 0,
    });

    const dropdownRef = useRef(null);
    const modalRef = useRef(null);

    const fetchMatchingStatus = useCallback(async () => {
        if (!item.id) return;

        try {
            const members = await getMembers(item.id);
            const pendingRequests = await getPendingRequestsByBoardId(item.id);

            const acceptedMembersCount = members.filter(member => member.isAccepted).length;

            dispatch({ type: 'SET_APPLIED', payload: pendingRequests.some(request => request.memberId === memberId) });
            dispatch({ type: 'SET_MEMBER', payload: members.some(member => member.memberId === memberId && member.isAccepted) });
            dispatch({ type: 'SET_MANAGER', payload: item.memberId === memberId });
            dispatch({ type: 'SET_MEMBERS_COUNT', payload: acceptedMembersCount });

        } catch (error) {
            Swal.fire('오류!', '매칭 상태를 가져오는 중 문제가 발생했습니다.', 'error');
        }
    }, [item.id, item.memberId, memberId]);

    const handleIncreaseViewCount = async (boardId, memberId, writerId) => {
        try {
            await increaseViewCount(boardId, memberId, writerId);
            dispatch({ type: 'INCREMENT_VIEWS' });
        } catch (error) {
            Swal.fire('오류!', '조회수 증가 중 문제가 발생했습니다.', 'error');
        }
    };

    useEffect(() => {
        fetchMatchingStatus();
        handleIncreaseViewCount(item.id, memberId, item.memberId);
    }, [item.id, memberId, item.memberId, fetchMatchingStatus]);

    useEffect(() => {
        if (state.isApplied || state.isMember || state.isManager) {
            fetchMatchingStatus();
        }
    }, [state.isApplied, state.isMember, state.isManager, fetchMatchingStatus]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
                return;
            }
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
            dispatch({ type: 'SET_DROPDOWN_OPEN', payload: false });
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleApply = async () => {
        if (state.membersCount >= item.headCount) {
            Swal.fire('실패', '모집 인원이 이미 꽉 찼습니다.', 'error');
            return;
        }

        const requestDTO = {
            memberId: memberId,
            matchingId: item.id
        };

        try {
            const members = await getMembers(item.id);
            const currentUser = members.find(member => member.memberId === memberId);

            if (currentUser && currentUser.isAccepted === false) {
                Swal.fire('실패', '가입이 거절된 모임입니다.', 'error');
                return;
            }

            await applyMatching(requestDTO);
            Swal.fire('성공', '가입 신청이 성공적으로 완료되었습니다.', 'success');
            dispatch({ type: 'SET_APPLIED', payload: true });
            fetchMatchingStatus();
        } catch (error) {
            Swal.fire('실패', '가입 신청 중 오류가 발생했습니다.', 'error');
        }
    };

    const handleCancelApply = async () => {
        const requestDTO = {
            memberId: memberId,
            matchingId: item.id
        };
        try {
            await cancelMatchingRequest(requestDTO.matchingId, requestDTO.memberId);
            Swal.fire('성공', '가입 신청이 취소되었습니다.', 'success');
            dispatch({ type: 'SET_APPLIED', payload: false });
            fetchMatchingStatus();
        } catch (error) {
            Swal.fire('실패', '가입 신청 취소 중 오류가 발생했습니다.', 'error');
        }
    };

    const handleLeave = async () => {
        const requestDTO = {
            memberId: memberId,
            matchingId: item.id
        };
        try {
            await leaveMatching(requestDTO.matchingId, requestDTO.memberId);
            Swal.fire('성공', '모임에서 탈퇴했습니다.', 'success');
            dispatch({ type: 'SET_MEMBER', payload: false });
            fetchMatchingStatus();
        } catch (error) {
            Swal.fire('실패', '모임 탈퇴 중 오류가 발생했습니다.', 'error');
        }
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 1:
                return '정기모임';
            case 2:
                return '번개';
            case 3:
                return '셀프소개팅';
            default:
                return '모임';
        }
    };

    const renderTag = (tag) => {
        try {
            const parsedTag = JSON.parse(tag);
            return Object.keys(parsedTag).join(', ');
        } catch (e) {
            return '';
        }
    };

    const openReport = () => {
        if (!isLogin) {
            Swal.fire({
                title: "로그인이 필요한 서비스입니다.",
                icon: "error",
                confirmButtonText: "확인",
                confirmButtonColor: "#3085d6",
            }).then((result) => {
                if (result.isConfirmed) {
                    moveToLoginReturn();
                }
            });
        } else {
            dispatch({ type: 'SET_REPORT_MODAL_OPEN', payload: true });
        }
    };

    const openMsg = () => {
        if (!isLogin) {
            Swal.fire({
                title: "로그인이 필요한 서비스입니다.",
                icon: "error",
                confirmButtonText: "확인",
                confirmButtonColor: "#3085d6",
            }).then((result) => {
                if (result.isConfirmed) {
                    moveToLoginReturn();
                }
            });
        } else {
            dispatch({ type: 'SET_MSG_MODAL_OPEN', payload: true });
        }
    };

    const handleCommentCountChange = (count) => {
        dispatch({ type: 'SET_COMMENT_COUNT', payload: count });
    };

    const renderSelfIntroduction = (item) => (
        <div className={styles.selfIntroductionContainer}>
            <div className={styles.selfIntroductionRow}>
                <div className={styles.selfIntroductionItem}>
                    <span className={styles.locationIcon}></span> {item.location || ''}
                </div>
                <div className={styles.selfIntroductionItem}>
                    <span className={styles.genderIcon}><PiGenderIntersexFill /></span> {item.gender || ''}
                </div>
                <div className={styles.selfIntroductionItem}>
                    <span className={styles.ageIcon}></span> {item.age ? `${item.age}세` : ''}
                </div>
                <div className={styles.selfIntroductionItem}>
                    <span className={styles.heightIcon}></span> {item.height ? `${item.height}cm` : ''}
                </div>
            </div>
            <div className={styles.selfIntroductionRow}>
                <div className={styles.selfIntroductionItem}>한줄 소개: {item.introduce || ''}</div>
            </div>
        </div>
    );

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal} ref={modalRef}>
                <div className={styles.modalHeader}>
                    <div className={styles.titleContainer}>
                        <h2 className={styles.title}>{item.title}</h2>
                        <div className={styles.labels}>
                            <span className={`${styles.matchingType} ${styles[getTypeLabel(item.matchingType)]}`}>
                                {item.matchingType === 1 ? '정기모임' : item.matchingType === 2 ? '번개' : '셀프소개팅'}
                            </span>
                            {item.matchingType === 3 ? <span className={styles.tag}>{item.mbti}</span> : <span className={styles.tag}>{renderTag(item.tag)}</span>}
                        </div>
                    </div>
                    <button className={styles.closeButton} onClick={onClose} />
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.leftInfo}>
                        <span className={styles.memberInfo}>
                            {item.profileImageUrl && item.profileImageUrl.length > 0 ? (
                                <img src={item.profileImageUrl[0]} alt="프로필 이미지" className={styles.profileImage} />
                            ) : (
                                <img src={defaultProfile} alt="디폴트 프로필 이미지" className={styles.profileImage} />
                            )}
                            <span className={styles.nickname}>{item.nickname || ''}</span>
                        </span>
                        <span className={styles.views}>조회수: {state.views || 0}</span>
                        <span className={styles.commentCount}>댓글수: {state.commentCount}</span>
                        <span className={styles.date}>작성 날짜: {formatDate(item.regDate)}</span>
                    </div>
                    <div className={styles.dropdownWrapper} ref={dropdownRef}>
                    <BsThreeDotsVertical
                            onClick={() => {
                                if (!isLogin) {
                                    Swal.fire({
                                        title: "로그인이 필요한 서비스입니다.",
                                        icon: "error",
                                        confirmButtonText: "확인",
                                        confirmButtonColor: "#3085d6",
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            moveToLoginReturn();
                                        }
                                    });
                                } else {
                                    dispatch({ type: 'SET_DROPDOWN_OPEN', payload: !state.isDropdownOpen });
                                }
                            }}
                        />
                        {state.isDropdownOpen && (
                            <MatchingDropDown 
                                id={item.id} 
                                openReport={openReport}
                                openMsg={openMsg}
                                showModifyButton={state.isManager}
                                memberId={item.memberId}  
                            />
                        )}
                    </div>
                </div>
                {item.matchingType === 3 && renderSelfIntroduction(item)}
                <div className={styles.warningMessage}>
                    ※ 상대방을 향한 욕설과 비난은 게시판 이용에 있어서 불이익을 받을 수 있습니다.
                </div>
                <div className={styles.buttonContainer}>
                    {!state.isManager && (
                        <>
                            {state.isMember ? (
                                <button className={styles.leaveButton} onClick={handleLeave}>모임 탈퇴</button>
                            ) : state.isApplied ? (
                                <button className={styles.cancelButton} onClick={handleCancelApply}>신청 취소</button>
                            ) : (
                                <button className={styles.applyButton} onClick={handleApply} disabled={state.membersCount >= item.headCount}>가입 신청</button>
                            )}
                        </>
                    )}
                </div>
                <div className={styles.detailsContainer}>
                    <div className={styles.detailBox}>
                        <p>{formatDate(item.meetDate)}</p>
                    </div>
                    <div className={styles.detailBox}>
                        <p>모집 인원: {state.membersCount}/{item.headCount}</p>
                    </div>
                    <div className={styles.detailBox}>
                        <p>주소: {item.address}</p>
                    </div>
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.contentBox}>
                        <p>{item.content}</p>
                        {item.filePathUrl && item.filePathUrl.length > 0 && (
                            <div className={styles.imagesContainer}>
                                {item.filePathUrl.map((url, index) => (
                                    <img key={index} className={styles.image} src={url} alt={`모임 이미지 ${index + 1}`} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <ReplySection matchingId={item.id} onCommentCountChange={handleCommentCountChange} />
                {state.isMsgModalOpen && (
                    <MsgModal
                        senderId={memberId}
                        receiver={item.nickname}
                        onClose={() => dispatch({ type: 'SET_MSG_MODAL_OPEN', payload: false })}
                    />
                )}
                {state.isReportModalOpen && (
                    <ReportModal
                        type="matching"
                        targetId={item.id}
                        reporterId={memberId}
                        onClose={() => dispatch({ type: 'SET_REPORT_MODAL_OPEN', payload: false })}
                    />
                )}
            </div>
        </div>
    );
};

MatchingModal.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        placeName: PropTypes.string,
        meetDate: PropTypes.string,
        address: PropTypes.string,
        headCount: PropTypes.number,
        memberId: PropTypes.number,
        category: PropTypes.string,
        views: PropTypes.number,
        likes: PropTypes.number,
        description: PropTypes.string,
        filePathUrl: PropTypes.arrayOf(PropTypes.string),
        content: PropTypes.string,
        regDate: PropTypes.string,
        tag: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        comments: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            writer: PropTypes.string,
            date: PropTypes.string,
            content: PropTypes.string,
        })),
        nickname: PropTypes.string,
        profileImageUrl: PropTypes.arrayOf(PropTypes.string),
        mbti: PropTypes.string,
        region: PropTypes.string,
        gender: PropTypes.string,
        age: PropTypes.number,
        height: PropTypes.number,
        introduction: PropTypes.string
    }),
    onClose: PropTypes.func.isRequired
};

export default MatchingModal;
