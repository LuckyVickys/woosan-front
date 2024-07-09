import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { applyMatching, cancelMatchingRequest, leaveMatching, getMembers, getPendingRequestsByBoardId } from '../../api/memberMatchingApi';
import CommentSection from './CommentSection';
import styles from '../../assets/styles/matching/MatchingModal.module.scss';

const MatchingModal = ({ item, onClose }) => {
    const memberID = 25; // 현재 로그인한 사용자 ID를 하드코딩

    const [isApplied, setIsApplied] = useState(false); // 가입 신청 상태
    const [isMember, setIsMember] = useState(false); // 가입 완료 상태
    const [isManager, setIsManager] = useState(false); // 매니저 여부

    // 초기 상태 설정 (예시: 서버에서 상태를 가져옴)
    useEffect(() => {
        const fetchMatchingStatus = async () => {
            try {
                const members = await getMembers(item.id);
                const pendingRequests = await getPendingRequestsByBoardId(item.id);

                setIsApplied(pendingRequests.some(request => request.memberId === memberID));
                setIsMember(members.some(member => member.id === memberID));
                setIsManager(item.isManager(memberID)); // 엔티티 메서드를 사용하여 매니저 여부 확인

            } catch (error) {
                console.error('매칭 상태를 가져오는 중 오류 발생:', error);
            }
        };

        fetchMatchingStatus();
    }, [item, memberID]);

    const handleApply = async () => {
        const requestDTO = {
            memberId: memberID,
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

    const handleCancelApply = async () => {
        const requestDTO = {
            memberId: memberID,
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

    const handleLeave = async () => {
        const requestDTO = {
            memberId: memberID,
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

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <div className={styles.titleContainer}>
                        <h2 className={styles.title}>{item.title}</h2>
                        <div className={styles.labels}>
                            <span className={styles.matchingType}>{item.matchingType === 1 ? '정기 모임' : item.matchingType === 2 ? '번개' : '셀프 소개팅'}</span>
                            <span className={styles.tag}>{item.tag}</span>
                        </div>
                    </div>
                    <button className={styles.closeButton} onClick={onClose}>&times;</button>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.leftInfo}>
                        <span className={styles.memberId}>작성자: {item.memberId}</span>
                        <span className={styles.views}>조회수: {item.views}</span>
                        <span className={styles.commentsCount}>댓글 수: {item.comments ? item.comments.length : 0}</span>
                        <span className={styles.date}>작성 날짜: {new Date(item.createdDate).toLocaleString()}</span>
                    </div>
                    {isManager ? (
                        <button className={styles.managerButton}>설정</button>
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
                        <p>{new Date(item.meetDate).toLocaleString()}</p>
                    </div>
                    <div className={styles.detailBox}>
                        <p>모집 인원: {item.headCount}</p>
                    </div>
                    <div className={styles.detailBox}>
                        <p>주소: {item.address}</p>
                    </div>
                </div>
                <div className={styles.contentContainer}>
                    <p>{item.content}</p>
                    {item.image && <img className={styles.image} src={item.image} alt="모임 이미지" />}
                </div>
                <CommentSection matchingId={item.id} />
            </div>
        </div>
    );
}

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
        views: PropTypes.number,
        likes: PropTypes.number,
        description: PropTypes.string,
        image: PropTypes.string,
        content: PropTypes.string.isRequired,
        createdDate: PropTypes.string.isRequired,
        tag: PropTypes.string,
        comments: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            writer: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        }))
    }).isRequired,
    onClose: PropTypes.func.isRequired
};

export default MatchingModal;
