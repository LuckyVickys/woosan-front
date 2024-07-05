import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/styles/matching/MatchingItem.module.scss';


const MatchingItem = ({
    id, memberId, matchingType, title, content, placeName, locationX, locationY, address, meetDate, tag, headCount,
    location, introduce, mbti, gender, age, height, onClick
}) => {

    const typeLabel = getTypeLabel(matchingType);
    
    function getTypeLabel(type) {
        switch (type) {
            case 1:
                return '정기 모임';
            case 2:
                return '번개';
            case 3:
                return '셀프 소개팅';
            default:
                return '모임';
        }
    }

    return (
        <div className={styles.matchingItemCard} onClick={() => onClick(id)}>
            <div className={styles.matchingItemHeader}>
                <span className={`${styles.tag} ${styles[typeLabel]}`}>{typeLabel}</span>
                <span className={styles.title}>{title}</span>
            </div>
            <div className={styles.matchingItemBody}>
                {matchingType !== 3 && <div className={styles.tag}>{tag}</div>}
                <div className={styles.placeName}>장소: {placeName}</div>
                <div className={styles.datetime}>날짜: {new Date(meetDate).toLocaleDateString()}</div>
                <div className={styles.memberId}>주최자: {memberId}</div>
                {matchingType !== 3 ? (
                    <div className={styles.headCount}>모집 인원: {headCount}</div>
                ) : (
                    <>
                        <div className={styles.gender}>성별: {gender}</div>
                        <div className={styles.age}>나이: {age}세</div>
                        <div className={styles.mbti}>MBTI: {mbti}</div>
                    </>
                )}
            </div>
        </div>
    );
}

    MatchingItem.propTypes = {
        id: PropTypes.number.isRequired,
        memberId: PropTypes.string.isRequired,
        matchingType: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        placeName: PropTypes.string.isRequired,
        meetDate: PropTypes.string.isRequired,
        tag: PropTypes.string,
        headCount: PropTypes.string,
        mbti: PropTypes.string,
        gender: PropTypes.string,
        age: PropTypes.number,
        onClick: PropTypes.func.isRequired,
    };
export default MatchingItem;