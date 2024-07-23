import defaultProfile from '../../assets/image/profile.png';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { applyMatching, cancelMatchingRequest, leaveMatching, getMembers, getPendingRequestsByBoardId } from '../../api/memberMatchingApi';
import { increaseViewCount } from '../../api/matchingBoardApi'; // 조회수 증가 API를 가져옵니다.
import ReplySection from './ReplySection';
import MatchingDropDown from '../matching/element/MatchingDropDown.jsx';
import styles from '../../assets/styles/matching/MatchingModal.module.scss';
import { formatDate } from "../../util/DateUtil.jsx";
import { useSelector } from 'react-redux';
import { BsThreeDotsVertical } from "react-icons/bs";
import ReportModal from "../board/element/ReportModal.jsx";
import MsgModal from "../board/element/MsgModal.jsx";
import { useNavigate } from 'react-router-dom';
import { PiGenderIntersexFill } from "react-icons/pi";

const MatchingModal = ({ item = {}, onClose }) => {
    const loginState = useSelector((state) => state.loginSlice);
    const memberId = loginState.id;
    const navigate = useNavigate();

    const [isApplied, setIsApplied] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const [isManager, setIsManager] = useState(false);
    const [membersCount, setMembersCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [views, setViews] = useState(item.views || 0); // 조회수 상태 추가

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isMsgModalOpen, setIsMsgModalOpen] = useState(false);
    const dropdownRef = useRef(null);

    // 매칭 상태를 가져오는 함수
    const fetchMatchingStatus = useCallback(async () => {
        if (!item.id) return;
        
        try {
            const members = await getMembers(item.id);
            const pendingRequests = await getPendingRequestsByBoardId(item.id);

            const acceptedMembersCount = members.filter(member => member.isAccepted).length;

            setIsApplied(pendingRequests.some(request => request.memberId === memberId));
            setIsMember(members.some(member => member.memberId === memberId && member.isAccepted));
            setIsManager(item.memberId === memberId);
            setMembersCount(acceptedMembersCount);

            console.log('매칭 상태를 성공적으로 가져왔습니다:', { members, pendingRequests, isApplied, isMember, isManager });
            console.log('로그인된 회원 ID:', memberId);

        } catch (error) {
            console.error('매칭 상태를 가져오는 중 오류 발생:', error);
        }
    }, [item.id, memberId]);

    // 게시글 조회수를 증가시키는 함수
    const handleIncreaseViewCount = async (boardId, memberId, writerId) => {
        try {
            await increaseViewCount(boardId, memberId, writerId);
            setViews(prevViews => prevViews + 1); // 조회수 상태 업데이트
            console.log('조회수가 성공적으로 증가했습니다.');
        } catch (error) {
            console.error('조회수 증가 중 오류 발생:', error);
        }
    };

    // 매칭 상태를 컴포넌트가 처음 마운트될 때 가져옴
    useEffect(() => {
        fetchMatchingStatus();

        // 조회수 증가
        handleIncreaseViewCount(item.id, memberId, item.memberId);

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
        if (membersCount >= item.headCount) {
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
            setIsApplied(true);
            fetchMatchingStatus(); // 상태 갱신
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
            fetchMatchingStatus(); // 상태 갱신
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
            fetchMatchingStatus(); // 상태 갱신
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

    // 댓글 수를 갱신하는 핸들러
    const handleCommentCountChange = (count) => {
        setCommentCount(count);
    };

    // 셀프 소개팅 정보 렌더링
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
            <div className={styles.modal}>
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
                    <button className={styles.closeButton} onClick={onClose}>&times;</button>
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
                        <span className={styles.views}>조회수: {views || 0}</span>
                        <span className={styles.commentCount}>댓글수: {commentCount}</span>
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
                    {isManager ? (
                        <button className={styles.managerButton} onClick={handleMyMatching}>모임 관리</button>
                    ) : isMember ? (
                        <button className={styles.leaveButton} onClick={handleLeave}>모임 탈퇴</button>
                    ) : isApplied ? (
                        <button className={styles.cancelButton} onClick={handleCancelApply}>신청 취소</button>
                    ) : (
                        <button className={styles.applyButton} onClick={handleApply} disabled={membersCount >= item.headCount}>가입 신청</button>
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
                <ReplySection matchingId={item.id} onCommentCountChange={handleCommentCountChange} />
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
