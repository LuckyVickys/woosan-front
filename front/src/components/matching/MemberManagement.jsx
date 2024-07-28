import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPendingRequestsByBoardId, getMembers, updateMatching, kickMember } from '../../api/memberMatchingApi'; // API 호출 함수
import styles from '../../assets/styles/matching/MemberManagement.module.scss'; // 스타일 파일
import defaultProfile from '../../assets/image/profile.png'; // 기본 프로필 이미지 경로
import Swal from 'sweetalert2';

/**
 * 멤버 관리 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {number} props.matchingId - 매칭 ID
 * @param {string} props.type - 멤버 타입 (pending 또는 approved)
 * @param {Function} props.onMemberUpdate - 멤버 업데이트 콜백 함수
 * @param {Array} props.members - 멤버 목록
 */
const MemberManagement = ({ matchingId, type, onMemberUpdate, members }) => {
    const [localMembers, setLocalMembers] = useState([]);
    const loginState = useSelector((state) => state.loginSlice); // 로그인된 상태 가져오기
    const currentUserId = loginState.id; // 현재 로그인한 사용자의 ID
    const token = loginState.accessToken; // 액세스 토큰 가져오기
    const [isManager, setIsManager] = useState(false); // 모임장 여부 상태

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const approvedMembers = await getMembers(matchingId, token); // 승인된 멤버 가져오기
                const pendingMembers = await getPendingRequestsByBoardId(matchingId, token); // 대기 중인 멤버 가져오기

                // 현재 사용자가 매니저인지 확인
                const managerStatus = approvedMembers.some(member => member.memberId === currentUserId && member.isManaged);
                setIsManager(managerStatus);

                if (type === 'pending') {
                    setLocalMembers(pendingMembers);
                } else if (type === 'approved') {
                    const filteredApprovedMembers = approvedMembers.filter(member => member.isAccepted === true); // isAccepted가 true인 멤버들만 필터링
                    setLocalMembers(filteredApprovedMembers);
                }
            } catch (error) {
                Swal.fire('오류', '멤버 데이터를 가져오는 중 오류가 발생했습니다.', 'error');
            }
        };

        fetchMembers();
    }, [matchingId, type, currentUserId, token]);

    useEffect(() => {
        if (members) {
            setLocalMembers(members);
        }
    }, [members]);

    /**
     * 가입 요청을 승인하는 함수
     * @param {number} id - 멤버 ID
     */
    const handleAccept = async (id) => {
        const result = await Swal.fire({
            title: '승인 확인',
            text: '정말로 이 가입 요청을 승인하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '승인',
            cancelButtonText: '취소'
        });

        if (result.isConfirmed) {
            try {
                await updateMatching(id, true, token); // 토큰 필요
                setLocalMembers((prev) => prev.filter((member) => member.id !== id));
                Swal.fire('승인 완료', '가입 요청을 승인하였습니다.', 'success');
                onMemberUpdate(); // 회원 상태가 변경되었음을 상위 컴포넌트에 알림
            } catch (error) {
                Swal.fire('오류', '가입 요청 승인 중 오류가 발생했습니다.', 'error');
            }
        }
    };

    /**
     * 가입 요청을 거절하는 함수
     * @param {number} id - 멤버 ID
     */
    const handleReject = async (id) => {
        const result = await Swal.fire({
            title: '거절 확인',
            text: '정말로 이 가입 요청을 거절하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '거절',
            cancelButtonText: '취소'
        });

        if (result.isConfirmed) {
            try {
                await updateMatching(id, false, token); // 토큰 필요, isAccepted를 false로 업데이트
                setLocalMembers((prev) => prev.filter((member) => member.id !== id));
                Swal.fire('거절 완료', '가입 요청을 거절하였습니다.', 'success');
                onMemberUpdate(); // 회원 상태가 변경되었음을 상위 컴포넌트에 알림
            } catch (error) {
                Swal.fire('오류', '가입 요청 거절 중 오류가 발생했습니다.', 'error');
            }
        }
    };

    /**
     * 회원을 강퇴하는 함수
     * @param {number} memberId - 멤버 ID
     */
    const handleKick = async (memberId) => {
        const result = await Swal.fire({
            title: '강퇴 확인',
            text: '정말로 이 회원을 강퇴하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '강퇴',
            cancelButtonText: '취소'
        });

        if (result.isConfirmed) {
            try {
                await kickMember(matchingId, memberId, token); // 토큰 필요
                setLocalMembers((prev) => prev.filter((member) => member.memberId !== memberId));
                Swal.fire('강퇴 완료', '회원을 강퇴하였습니다.', 'success');
                onMemberUpdate(); // 회원 상태가 변경되었음을 상위 컴포넌트에 알림
            } catch (error) {
                Swal.fire('오류', '회원 강퇴 중 오류가 발생했습니다.', 'error');
            }
        }
    };

    const sortedMembers = [...localMembers].sort((a, b) => b.isManaged - a.isManaged);

    return (
        <div className={styles.container}>
            <h3>{type === 'pending' ? '가입 신청 관리' : '모임원 관리'}</h3>
            <div className={styles.content}>
                {localMembers.length === 0 ? (
                    <div className={styles.emptyMessage}>가입 신청이 없습니다.</div>
                ) : (
                    <ul>
                        {sortedMembers.map((member) => (
                            <li key={member.id} className={styles.memberItem}>
                                <div className={styles.memberInfo}>
                                    <img src={member.profileImageUrl || defaultProfile} alt={member.nickname} className={styles.profileImage} />
                                    <span>{member.nickname}</span>
                                </div>
                                {isManager && (
                                    type === 'pending' ? (
                                        <div className={styles.actions}>
                                            <button onClick={() => handleAccept(member.id)} className={styles.acceptButton}>
                                                승인
                                            </button>
                                            <button onClick={() => handleReject(member.id)} className={styles.rejectButton}>
                                                거절
                                            </button>
                                        </div>
                                    ) : (
                                        member.isManaged ? (
                                            <button className={styles.kickButton} disabled>
                                                모임장
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleKick(member.memberId)}
                                                className={styles.kickButton}
                                            >
                                                강퇴
                                            </button>
                                        )
                                    )
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MemberManagement;
