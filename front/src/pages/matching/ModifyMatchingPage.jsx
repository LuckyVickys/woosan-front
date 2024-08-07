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
    const token = loginState.accessToken;

    const fetchMatching = useCallback(async () => {
        try {
            const response = await getMatchingBoardsByMemberId(loginState.id, loginState.accessToken);
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
    }, [id, loginState.id, navigate, loginState.accessToken]);

    const fetchMembers = useCallback(async () => {
        try {
            const approvedResponse = await getMembers(id, token);
            const pendingResponse = await getPendingRequestsByBoardId(id, token);
            setApprovedMembers(approvedResponse.filter(member => member.isAccepted === true));
            setPendingMembers(pendingResponse);
        } catch (error) {
            Swal.fire('오류!', '매칭 멤버 정보를 불러오는 중 문제가 발생했습니다.', 'error');
        }
    }, [id, token]);

    useEffect(() => {
        fetchMatching();
        fetchMembers();
    }, [fetchMatching, fetchMembers]);

    const handleSubmit = async (formData) => {
        try {
            await updateMatchingBoard(id, formData, loginState.accessToken);
            Swal.fire('성공!', '매칭이 성공적으로 수정되었습니다.', 'success');
            navigate(-1);
        } catch (error) {
            Swal.fire('오류!', error.response ? error.response.data : error.message, 'error');
        }
    };

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
                navigate(-1);
            } catch (error) {
                Swal.fire('오류!', error.response ? error.response.data : error.message, 'error');
            }
        }
    };

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
