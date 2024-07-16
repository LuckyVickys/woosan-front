import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/styles/matching/MatchingItem.module.scss';

const MatchingItem = ({
    id, memberId, matchingType, title, content, regDate, views, isDeleted, placeName, locationX, locationY, address, meetDate, tag = {}, headCount,
    location, introduce, mbti, gender, age, height, onClick, filePathUrl
}) => {
    const typeLabel = getTypeLabel(matchingType);

    // 매칭 타입에 따른 라벨을 반환하는 함수
    function getTypeLabel(type) {
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

    // 매칭 타입에 따른 스타일을 반환하는 함수
    function getTypeStyle(type) {
        switch (type) {
            case 1:
                return styles.정기모임;
            case 2:
                return styles.번개;
            case 3:
                return styles.셀프소개팅;
            default:
                return '';
        }
    }

    // 태그를 문자열로 변환하는 함수
    const renderTag = (tag) => {
        if (!tag) return ''; // tag가 null 또는 undefined인 경우 빈 문자열 반환
        return Object.entries(tag).map(([tag, category]) => `${tag} (${category})`).join(', ');
    };

    // filePathUrl이 제대로 전달되는지 확인
    console.log("파일 경로 리스트:", filePathUrl);

    const imageUrl = filePathUrl && filePathUrl.length > 0 ? filePathUrl[0] : "";

    // 이미지 URL이 제대로 설정되었는지 확인
    console.log("이미지 URL:", imageUrl);

    return (
        <div className={styles.matchingItemCard} onClick={() => onClick(id)}>
            <div className={styles.imagePlaceholder}>
                {imageUrl ? (
                    <img src={imageUrl} alt="매칭 썸네일" className={styles.matchingImage} />
                ) : (
                    <div className={styles.noImage}>이미지 없음</div>
                )}
            </div>
            <div className={styles.matchingItemContent}>
                <div className={styles.matchingItemHeader}>
                    <span className={`${styles.typeLabel} ${getTypeStyle(matchingType)}`}>{typeLabel}</span>
                    {matchingType !== 3 && <span className={styles.tag}>{renderTag(tag)}</span>}
                    {matchingType === 3 && <span className={styles.tag}>{mbti}</span>}
                </div>
                <div className={styles.matchingItemBody}>
                    <span className={styles.title}>{title}</span>
                    <div className={styles.details}>
                        <div className={styles.detailItem}><strong>장소:</strong> {placeName}</div>
                        {matchingType !== 3 && (
                            <>
                                <div className={styles.detailItem}><strong>날짜:</strong> {new Date(meetDate).toLocaleDateString()}</div>
                                <div className={styles.detailItem}><strong>주최자:</strong> {memberId}</div>
                                <div className={styles.detailItem}><strong>모집 인원:</strong> {headCount}</div>
                            </>
                        )}
                        {matchingType === 3 && (
                            <>
                                <div className={styles.detailItem}><strong>성별:</strong> {gender}</div>
                                <div className={styles.detailItem}><strong>주최자:</strong> {memberId}</div>
                                <div className={styles.detailItem}><strong>나이:</strong> {age}세</div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

MatchingItem.propTypes = {
    id: PropTypes.number.isRequired,
    memberId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    matchingType: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    regDate: PropTypes.string.isRequired, 
    views: PropTypes.number.isRequired, 
    isDeleted: PropTypes.bool.isRequired, 
    placeName: PropTypes.string.isRequired,
    locationX: PropTypes.number.isRequired,
    locationY: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    meetDate: PropTypes.string.isRequired,
    tag: PropTypes.object, // tag를 객체로 받도록 수정
    headCount: PropTypes.number.isRequired,
    location: PropTypes.string,
    introduce: PropTypes.string,
    mbti: PropTypes.string,
    gender: PropTypes.string,
    age: PropTypes.number,
    height: PropTypes.number,
    onClick: PropTypes.func.isRequired,
    filePathUrl: PropTypes.arrayOf(PropTypes.string)
};

export default MatchingItem;
