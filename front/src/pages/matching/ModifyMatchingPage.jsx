import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MatchingForm from '../../components/matching/MatchingForm';
import { getMatchingBoardsByMemberId, updateMatchingBoard, deleteMatchingBoard } from '../../api/matchingBoardApi';
import { getMembers, getPendingRequestsByBoardId } from '../../api/memberMatchingApi';
import styles from '../../assets/styles/matching/ModifyMatching.module.scss';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import MemberManagement from '../../components/matching/MemberManagement';

const ModifyMatchingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const loginState = useSelector((state) => state.loginSlice);
    const [matching, setMatching] = useState(null);
    const [loading, setLoading] = useState(true);
    const [approvedMembers, setApprovedMembers] = useState([]);
    const [pendingMembers, setPendingMembers] = useState([]);

    /**
     * 매칭 정보를 가져오는 함수
     */
    const fetchMatching = useCallback(async () => {
        try {
            const response = await getMatchingBoardsByMemberId(loginState.id);
            const matchingBoard = response.find((board) => board.id === Number(id));
            if (matchingBoard) {
                setMatching(matchingBoard);
            } else {
                Swal.fire('오류!', '매칭 보드를 찾을 수 없습니다.', 'error');
                navigate(-1);
            }
        } catch (error) {
            Swal.fire('오류!', '매칭 정보를 불러오는 중 문제가 발생했습니다.', 'error');
            navigate(-1);
        } finally {
            setLoading(false);
        }
    }, [id, loginState.id, navigate]);

    /**
     * 매칭 멤버 정보를 가져오는 함수
     */
    const fetchMembers = useCallback(async () => {
        try {
            const approvedResponse = await getMembers(id);
            const pendingResponse = await getPendingRequestsByBoardId(id);
            setApprovedMembers(approvedResponse.filter(member => member.isAccepted === true));
            setPendingMembers(pendingResponse);
        } catch (error) {
            // 매칭 멤버 정보 가져오는 중 오류 발생 시 처리
        }
    }, [id]);

    useEffect(() => {
        fetchMatching();
        fetchMembers();
    }, [fetchMatching, fetchMembers]);

    /**
     * 매칭 수정 함수
     * @param {Object} formData - 수정된 매칭 데이터
     */
    const handleSubmit = async (formData) => {
        try {
            await updateMatchingBoard(id, formData, loginState.accessToken);
            Swal.fire('성공!', '매칭이 성공적으로 수정되었습니다.', 'success');
            navigate(-1); // 수정 후 이전 페이지로 이동
        } catch (error) {
            Swal.fire('오류!', error.response ? error.response.data : error.message, 'error');
        }
    };

    /**
     * 매칭 삭제 함수
     */
    const handleDelete = async () => {
        const result = await Swal.fire({
            title: '삭제 확인',
            text: '정말 모임을 삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소'
        });

        if (result.isConfirmed) {
            try {
                await deleteMatchingBoard(id, loginState.id, loginState.accessToken);
                Swal.fire('성공!', '매칭이 성공적으로 삭제되었습니다.', 'success');
                navigate(-1); // 삭제 후 이전 페이지로 이동
            } catch (error) {
                Swal.fire('오류!', error.response ? error.response.data : error.message, 'error');
            }
        }
    };

    /**
     * 매칭 유형 라벨을 반환하는 함수
     * @param {number} type - 매칭 유형
     * @returns {string} 매칭 유형 라벨
     */
    const getMatchingTypeLabel = (type) => {
        switch (type) {
            case 1:
                return '정기 모임';
            case 2:
                return '번개';
            case 3:
                return '셀프 소개팅';
            default:
                return '';
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!matching) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleBar}>
                <div className={styles.titleBarLine}></div>
                <div className={styles.titleBarText}>모임 수정하기</div>
            </div>
            <div className={styles.deleteButtonContainer}>
                <button onClick={handleDelete} className={styles.deleteButton}>모임 삭제</button>
            </div>
            <div className={styles.managementContainer}>
                <MemberManagement
                    matchingId={id}
                    isManager={true}
                    type="pending"
                    onMemberUpdate={fetchMembers}
                    members={pendingMembers}
                    emptyMessage="가입 신청이 없습니다"
                />
                <MemberManagement
                    matchingId={id}
                    isManager={true}
                    type="approved"
                    onMemberUpdate={fetchMembers}
                    members={approvedMembers}
                    emptyMessage="승인된 멤버가 없습니다"
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="matchingType">모임 유형</label>
                <input
                    id="matchingType"
                    value={getMatchingTypeLabel(matching.matchingType)}
                    readOnly
                    className={styles.readOnlyInput}
                />
            </div>
            <MatchingForm onSubmit={handleSubmit} initialValues={matching} matchingType={matching.matchingType} />
        </div>
    );
};

export default ModifyMatchingPage;
