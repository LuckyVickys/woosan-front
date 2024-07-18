import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { applyMatching, cancelMatchingRequest, leaveMatching, getMembers, getPendingRequestsByBoardId } from '../../api/memberMatchingApi';
import ReplySection from './ReplySection';
import MatchingDropDown from '../matching/element/MatchingDropDown.jsx';
import styles from '../../assets/styles/matching/MatchingModal.module.scss';
import { formatDate } from "../../util/DateUtil.jsx";
import { useSelector } from 'react-redux';
import { BsThreeDotsVertical } from "react-icons/bs";
import ReportModal from "../board/element/ReportModal.jsx"; // 리포트 모달 컴포넌트 임포트
import MsgModal from "../board/element/MsgModal.jsx"; // 메시지 모달 컴포넌트 임포트
import { useNavigate } from 'react-router-dom';

const MatchingModal = ({ item, onClose }) => {
    const loginState = useSelector((state) => state.loginSlice); // 로그인된 상태 가져오기
    const memberId = loginState.id; // 로그인된 회원 ID
    const navigate = useNavigate(); // useNavigate 설정

    const [isApplied, setIsApplied] = useState(false); // 가입 신청 상태
    const [isMember, setIsMember] = useState(false); // 가입 완료 상태
    const [isManager, setIsManager] = useState(false); // 매니저 여부
    const [membersCount, setMembersCount] = useState(0); // 멤버 수

    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태 관리
    const [isReportModalOpen, setIsReportModalOpen] = useState(false); // 리포트 모달 상태 관리
    const [isMsgModalOpen, setIsMsgModalOpen] = useState(false); // 메시지 모달 상태 관리
    const dropdownRef = useRef(null);

    // 매칭 상태를 가져오는 함수
    const fetchMatchingStatus = useCallback(async () => {
        try {
            const members = await getMembers(item.id);
            const pendingRequests = await getPendingRequestsByBoardId(item.id);

            setIsApplied(pendingRequests.some(request => request.memberId === memberId));
            setIsMember(members.some(member => member.id === memberId));
            setIsManager(item.memberId === memberId); // 매니저 여부 확인
            setMembersCount(members.length); // 멤버 수 설정

            console.log('매칭 상태를 성공적으로 가져왔습니다:', { members, pendingRequests, isApplied, isMember, isManager });
            console.log('로그인된 회원 ID:', memberId);

        } catch (error) {
            console.error('매칭 상태를 가져오는 중 오류 발생:', error);
        }
    }, [item.id, memberId]);

    // 매칭 상태를 컴포넌트가 처음 마운트될 때 가져옴
    useEffect(() => {
        fetchMatchingStatus();
    }, [item.id, memberId, fetchMatchingStatus]);

    // 매칭 상태가 변경될 때마다 재로드
    useEffect(() => {
        if (isApplied || isMember || isManager) {
            fetchMatchingStatus();
        }
    }, [isApplied, isMember, isManager, fetchMatchingStatus]);

    // 드롭다운 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 가입 신청 핸들러
    const handleApply = async () => {
        const requestDTO = {
            memberId: memberId,
            matchingId: item.id
        };
        try {
            await applyMatching(requestDTO);
            Swal.fire('성공', '가입 신청이 성공적으로 완료되었습니다.', 'success');
            setIsApplied(true);
        } catch (error) {
            console.error("가입 신청 중 오류 발생:", error);
            Swal.fire('실패', '가입 신청 중 오류가 발생했습니다.', 'error');
        }
    };

    // 가입 신청 취소 핸들러
    const handleCancelApply = async () => {
        const requestDTO = {
            memberId: memberId,
            matchingId: item.id
        };
        try {
            await cancelMatchingRequest(requestDTO.matchingId, requestDTO.memberId);
            Swal.fire('성공', '가입 신청이 취소되었습니다.', 'success');
            setIsApplied(false);
        } catch (error) {
            console.error("가입 신청 취소 중 오류 발생:", error);
            Swal.fire('실패', '가입 신청 취소 중 오류가 발생했습니다.', 'error');
        }
    };

    // 모임 탈퇴 핸들러
    const handleLeave = async () => {
        const requestDTO = {
            memberId: memberId,
            matchingId: item.id
        };
        try {
            await leaveMatching(requestDTO.matchingId, requestDTO.memberId);
            Swal.fire('성공', '모임에서 탈퇴했습니다.', 'success');
            setIsMember(false);
        } catch (error) {
            console.error("모임 탈퇴 중 오류 발생:", error);
            Swal.fire('실패', '모임 탈퇴 중 오류가 발생했습니다.', 'error');
        }
    };

    // 매칭 타입 라벨을 반환하는 함수
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

    // 태그를 렌더링하는 함수
    const renderTag = (tag) => {
        try {
            const parsedTag = JSON.parse(tag);
            return Object.keys(parsedTag).join(', ');
        } catch (e) {
            console.error("Failed to parse tag:", e);
            return '';
        }
    };

    // 리포트 모달 열기 핸들러
    const openReport = () => {
        setIsReportModalOpen(true);
    };

    // 메시지 모달 열기 핸들러
    const openMsg = () => {
        setIsMsgModalOpen(true);
    };

    // 수정 버튼 클릭 핸들러
    const handleMyMatching = () => {
        navigate(`/matching/modify/${item.id}`);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <div className={styles.titleContainer}>
                        <h2 className={styles.title}>{item.title}</h2>
                        <div className={styles.labels}>
                            <span className={`${styles.matchingType} ${styles[getTypeLabel(item.matchingType)]}`}>
                                {item.matchingType === 1 ? '정기모임' : item.matchingType === 2 ? '번개' : '셀프소개팅'}
                            </span>
                            <span className={styles.tag}>{renderTag(item.tag)}</span>
                        </div>
                    </div>
                    <button className={styles.closeButton} onClick={onClose}>&times;</button>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.leftInfo}>
                        <span className={styles.memberInfo}>
                            {item.profileImageUrl && item.profileImageUrl.length > 0 && (
                                <img src={item.profileImageUrl[0]} alt="프로필 이미지" className={styles.profileImage} />
                            )}
                            <span className={styles.nickname}>{item.nickname}</span>
                        </span>
                        <span className={styles.views}>조회수: {item.views}</span>
                        <span className={styles.date}>작성 날짜: {formatDate(item.regDate)}</span>
                    </div>
                    <div className={styles.dropdownWrapper} ref={dropdownRef}>
                        <BsThreeDotsVertical 
                            className={styles.threeDotsIcon} 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        />
                        {isDropdownOpen && (
                            <MatchingDropDown 
                                id={item.id} 
                                openReport={openReport}
                                openMsg={openMsg}
                                showModifyButton={isManager} 
                            />
                        )}
                    </div>
                </div>
                <div>※ 상대방을 향한 욕설과 비난은 게시판 이용에 있어서 불이익을 받을 수 있습니다.</div>
                <div className={styles.buttonContainer}>
                    {isManager ? (
                        <button className={styles.managerButton} onClick={handleMyMatching}>모임 관리</button>
                    ) : isMember ? (
                        <button className={styles.leaveButton} onClick={handleLeave}>모임 탈퇴</button>
                    ) : isApplied ? (
                        <button className={styles.cancelButton} onClick={handleCancelApply}>신청 취소</button>
                    ) : (
                        <button className={styles.applyButton} onClick={handleApply}>가입 신청</button>
                    )}
                </div>
                <div className={styles.detailsContainer}>
                    <div className={styles.detailBox}>
                        <p>{formatDate(item.meetDate)}</p>
                    </div>
                    <div className={styles.detailBox}>
                        <p>모집 인원: {membersCount}/{item.headCount}</p>
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
                <ReplySection matchingId={item.id} />
                {isMsgModalOpen && (
                    <MsgModal
                        senderId={memberId}
                        receiver={item.nickname}
                        onClose={() => setIsMsgModalOpen(false)}
                    />
                )}
                {isReportModalOpen && (
                    <ReportModal
                        type="matching"
                        targetId={item.id}
                        reporterId={memberId}
                        onClose={() => setIsReportModalOpen(false)}
                    />
                )}
            </div>
        </div>
    );
};

MatchingModal.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        placeName: PropTypes.string.isRequired,
        meetDate: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        headCount: PropTypes.number.isRequired,
        memberId: PropTypes.number.isRequired,
        category: PropTypes.string,
        views: PropTypes.number.isRequired,
        likes: PropTypes.number,
        description: PropTypes.string,
        filePathUrl: PropTypes.arrayOf(PropTypes.string), // 이미지 경로 배열
        content: PropTypes.string.isRequired,
        regDate: PropTypes.string.isRequired,
        tag: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        comments: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            writer: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        })),
        nickname: PropTypes.string.isRequired,
        profileImageUrl: PropTypes.arrayOf(PropTypes.string) // 프로필 이미지 경로 배열
    }).isRequired,
    onClose: PropTypes.func.isRequired
};

export default MatchingModal;
