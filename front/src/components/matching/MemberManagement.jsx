import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPendingRequestsByBoardId, getMembers, updateMatching, kickMember } from '../../api/memberMatchingApi'; // API 호출 함수
import styles from '../../assets/styles/matching/MemberManagement.module.scss'; // 스타일 파일

const MemberManagement = ({ matchingId, isManager, type }) => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const loginState = useSelector((state) => state.loginSlice);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                let data;
                if (type === 'pending') {
                    data = await getPendingRequestsByBoardId(matchingId);
                } else if (type === 'approved') {
                    data = await getMembers(matchingId);
                }
                setMembers(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchMembers();
    }, [matchingId, type]);

    const handleAccept = async (id) => {
        try {
            await updateMatching(id, true);
            setMembers((prev) => prev.filter((member) => member.id !== id));
        } catch (error) {
            console.error('매칭 요청 수락 중 오류 발생:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await updateMatching(id, false);
            setMembers((prev) => prev.filter((member) => member.id !== id));
        } catch (error) {
            console.error('매칭 요청 거절 중 오류 발생:', error);
        }
    };

    const handleKick = async (id, memberId) => {
        try {
            await kickMember(id, memberId);
            setMembers((prev) => prev.filter((member) => member.memberId !== memberId));
        } catch (error) {
            console.error('회원 강퇴 중 오류 발생:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={styles.container}>
            <h3>{type === 'pending' ? '가입 신청 관리' : '모임원 관리'}</h3>
            <div className={styles.content}>
                {members.length === 0 ? (
                    <div>{type === 'pending' ? '가입 신청이 없습니다.' : '모임원이 없습니다.'}</div>
                ) : (
                    <ul>
                        {members.map((member) => (
                            <li key={member.id} className={styles.memberItem}>
                                <div className={styles.memberInfo}>
                                    <img src={member.profileImageUrl} alt={member.nickname} />
                                    <span>{member.nickname}</span>
                                    {member.id === loginState.id && <span className={styles.managerLabel}> (모임장)</span>}
                                </div>
                                {isManager && (
                                    <div className={styles.actions}>
                                        {type === 'pending' ? (
                                            <>
                                                <button onClick={() => handleAccept(member.id)} className={styles.acceptButton}>
                                                    승인
                                                </button>
                                                <button onClick={() => handleReject(member.id)} className={styles.rejectButton}>
                                                    거절
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => handleKick(matchingId, member.memberId)}
                                                className={styles.kickButton}
                                                disabled={member.id === loginState.id}
                                            >
                                                {member.id === loginState.id ? '모임장' : '강퇴'}
                                            </button>
                                        )}
                                    </div>
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
