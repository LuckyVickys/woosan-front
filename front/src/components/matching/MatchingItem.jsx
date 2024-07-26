import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/styles/matching/MatchingItem.module.scss';
import { PiGenderIntersexFill } from "react-icons/pi";

// 문자열 길이를 제한하고 "..."을 추가하는 함수
const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
};

const MatchingItem = ({
    id, memberId, matchingType, title, content, regDate, views, isDeleted, placeName, locationX, locationY, address, meetDate, tag = '{}', headCount,
    currentMemberCount = 0, location, introduce, mbti, gender, age, height, onClick, filePathUrl, nickname, profileImageUrl
}) => {
    // 매칭 타입에 따라 라벨을 반환하는 함수
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

    // 매칭 타입에 따라 스타일을 반환하는 함수
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

    // 태그 문자열을 파싱하여 화면에 표시하는 함수
    const renderTag = (tag) => {
        try {
            const parsedTag = JSON.parse(tag);
            return Object.keys(parsedTag).join(', ');
        } catch (e) {
            return '';
        }
    };

    // 날짜와 시간을 특정 형식으로 포맷하는 함수
    const formatDateMinWithoutYear = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '');
        const day = String(date.getDate()).padStart(2, '');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        return `${month}. ${day}. ${hours}:${minutes}`;
    };

    // 매칭 타입에 따라 날짜와 시간을 포맷하는 함수
    const formatDateTime = (dateString, type) => {
        if (type === 2) {
            return formatDateMinWithoutYear(dateString);
        } else {
            return new Date(dateString).toLocaleDateString('ko-KR');
        }
    };

    const imageUrl = filePathUrl && filePathUrl.length > 0 ? filePathUrl[0] : "";

    return (
        <div className={styles.matchingItemCard} onClick={onClick}>
            <div className={styles.imagePlaceholder}>
                {imageUrl ? (
                    <img src={imageUrl} alt="매칭 썸네일" className={styles.matchingImage} />
                ) : (
                    <div className={styles.noImage}>이미지 없음</div>
                )}
            </div>
            <div className={styles.matchingItemContent}>
                <div className={styles.matchingItemHeader}>
                    <span className={`${styles.typeLabel} ${getTypeStyle(matchingType)}`}>{getTypeLabel(matchingType)}</span>
                    {matchingType !== 3 && <span className={styles.tag}>{renderTag(tag)}</span>}
                    {matchingType === 3 && <span className={styles.tag}>{mbti || ''}</span>}
                </div>
                <div className={styles.matchingItemBody}>
                    <span className={styles.title}>{truncateText(title, 30)}</span>
                    <div className={styles.details}>
                        <div className={styles.detailItem}><strong><span className={styles.location}></span></strong> {truncateText(placeName, 8)}</div>
                        {matchingType !== 3 && (
                            <>
                                <div className={styles.detailItem}><strong><span className={styles.date}></span></strong> {formatDateTime(meetDate, matchingType)}</div>
                                <div className={styles.detailItem}><strong><span className={styles.nickname}></span></strong> {nickname}</div>
                                <div className={styles.detailItem}><strong><span className={styles.headCount}></span></strong> {currentMemberCount}/{headCount}</div>
                            </>
                        )}
                        {matchingType === 3 && (
                            <>
                                <div className={styles.detailItem}><strong><PiGenderIntersexFill className={styles.gender} /></strong> {gender || ''}</div>
                                <div className={styles.detailItem}><strong><span className={styles.nickname}></span></strong> {nickname}</div>
                                <div className={styles.detailItem}><strong><span className={styles.age}></span></strong> {age ? `${age}세` : ''}</div>
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
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    headCount: PropTypes.number.isRequired,
    currentMemberCount: PropTypes.number,
    location: PropTypes.string,
    introduce: PropTypes.string,
    mbti: PropTypes.string,
    gender: PropTypes.string,
    age: PropTypes.number,
    height: PropTypes.number,
    onClick: PropTypes.func.isRequired,
    filePathUrl: PropTypes.arrayOf(PropTypes.string),
    nickname: PropTypes.string,
    profileImageUrl: PropTypes.arrayOf(PropTypes.string)
};

export default MatchingItem;
