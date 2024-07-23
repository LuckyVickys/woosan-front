import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/styles/matching/MatchingItem.module.scss';
import { PiGenderIntersexFill } from "react-icons/pi";

const MatchingItem = ({
    id, memberId, matchingType, title, content, regDate, views, isDeleted, placeName, locationX, locationY, address, meetDate, tag = '{}', headCount,
    location, introduce, mbti, gender, age, height, onClick, filePathUrl, nickname, profileImageUrl
}) => {

    console.log('MatchingItem props:', {
        id, memberId, matchingType, title, content, regDate, views, isDeleted, placeName, locationX, locationY, address, meetDate, tag, headCount,
        location, introduce, mbti, gender, age, height, onClick, filePathUrl, nickname, profileImageUrl
    });

    const typeLabel = getTypeLabel(matchingType);

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

    const renderTag = (tag) => {
        try {
            console.log('Parsing tag:', tag);
            const parsedTag = JSON.parse(tag);
            return Object.keys(parsedTag).join(', ');
        } catch (e) {
            console.error("Failed to parse tag:", e);
            return '';
        }
    };

    const formatDateMinWithoutYear = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '');
        const day = String(date.getDate()).padStart(2, '');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        return `${month}. ${day}. ${hours}:${minutes}`;
    };

    const formatDateTime = (dateString, type) => {
        if (type === 2) {
            return formatDateMinWithoutYear(dateString);
        } else {
            return new Date(dateString).toLocaleDateString('ko-KR');
        }
    };

    console.log("파일 경로 리스트:", filePathUrl);

    const imageUrl = filePathUrl && filePathUrl.length > 0 ? filePathUrl[0] : "";

    console.log("이미지 URL:", imageUrl);

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
                    <span className={`${styles.typeLabel} ${getTypeStyle(matchingType)}`}>{typeLabel}</span>
                    {matchingType !== 3 && <span className={styles.tag}>{renderTag(tag)}</span>}
                    {matchingType === 3 && <span className={styles.tag}>{mbti || ''}</span>}
                </div>
                <div className={styles.matchingItemBody}>
                    <span className={styles.title}>{title}</span>
                    <div className={styles.details}>
                        <div className={styles.detailItem}><strong><span className={styles.location}></span></strong> {placeName}</div>
                        {matchingType !== 3 && (
                            <>
                                <div className={styles.detailItem}><strong><span className={styles.date}></span></strong> {formatDateTime(meetDate, matchingType)}</div>
                                <div className={styles.detailItem}><strong><span className={styles.nickname}></span></strong> {nickname}</div>
                                <div className={styles.detailItem}><strong><span className={styles.headCount}></span></strong> {headCount}</div>
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
    tag: PropTypes.string,
    headCount: PropTypes.number.isRequired,
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
