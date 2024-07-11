import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { applyMatching, cancelMatchingRequest, leaveMatching, getMembers, getPendingRequestsByBoardId } from '../../api/memberMatchingApi';
import { getReplies, getRepliesByParentId } from '../../api/matchingBoardReplyApi';
import CommentSection from './CommentSection';
import styles from '../../assets/styles/matching/MatchingModal.module.scss';
import { formatDate } from "../../util/DateUtil.jsx";

const MatchingModal = ({ item, onClose }) => {
    const memberID = 25; // 현재 로그인한 사용자 ID를 하드코딩

    const [isApplied, setIsApplied] = useState(false); // 가입 신청 상태
    const [isMember, setIsMember] = useState(false); // 가입 완료 상태
    const [isManager, setIsManager] = useState(false); // 매니저 여부
    const [comments, setComments] = useState([]); // 댓글 목록
    const [newComment, setNewComment] = useState(''); // 새로운 댓글
    const [membersCount, setMembersCount] = useState(0); // 멤버 수
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수

    useEffect(() => {
        const fetchMatchingStatus = async () => {
            try {
                const members = await getMembers(item.id);
                const pendingRequests = await getPendingRequestsByBoardId(item.id);

                setIsApplied(pendingRequests.some(request => request.memberId === memberID));
                setIsMember(members.some(member => member.id === memberID));
                setIsManager(item.isManager(memberID)); // 엔티티 메서드를 사용하여 매니저 여부 확인
                setMembersCount(members.length); // 멤버 수 설정

                const totalCommentsCount = await fetchTotalCommentsCount(item.id);
                setTotalPages(Math.ceil(totalCommentsCount / 10)); // 댓글 수를 기반으로 페이지 수 설정

                const fetchedComments = await fetchComments(item.id, 0); // 첫 페이지 댓글 가져오기
                setComments(fetchedComments);

            } catch (error) {
                console.error('매칭 상태를 가져오는 중 오류 발생:', error);
            }
        };

        fetchMatchingStatus();
    }, [item, memberID]);

    const fetchTotalCommentsCount = async (matchingId) => {
        let totalComments = 0;

        const fetchReplies = async (parentId = null) => {
            const pageable = { page: 0, size: 100 };
            const replies = parentId 
                ? await getRepliesByParentId(parentId)
                : await getReplies(matchingId, pageable);
            
            totalComments += replies.content.length;

            for (const reply of replies.content) {
                await fetchReplies(reply.id);
            }
        };

        await fetchReplies();
        return totalComments;
    };

    const fetchComments = async (matchingId, page) => {
        const pageable = { page: page, size: 10 };
        const replies = await getReplies(matchingId, pageable);
        return replies.content;
    };

    const handlePageChange = async (page) => {
        const fetchedComments = await fetchComments(item.id, page);
        setComments(fetchedComments);
        setCurrentPage(page);
    };

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
    }

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
                            <span className={styles.tag}>{item.tag}</span>
                        </div>
                    </div>
                    <button className={styles.closeButton} onClick={onClose}>&times;</button>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.leftInfo}>
                        <span className={styles.memberId}>작성자: {item.memberId}</span>
                        <span className={styles.views}>조회수: {item.views}</span>
                        <span className={styles.commentsCount}>댓글 수: {comments.length}</span>
                        <span className={styles.date}>작성 날짜: {formatDate(item.regDate)}</span>
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
                        {item.image && <img className={styles.image} src={item.image} alt="모임 이미지" />}
                    </div>
                </div>
                <CommentSection matchingId={item.id} />
                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={`${styles.pageButton} ${currentPage === index ? styles.active : ''}`}
                                onClick={() => handlePageChange(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
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
        views: PropTypes.number.isRequired,
        likes: PropTypes.number,
        description: PropTypes.string,
        image: PropTypes.string,
        content: PropTypes.string.isRequired,
        regDate: PropTypes.string.isRequired,
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
