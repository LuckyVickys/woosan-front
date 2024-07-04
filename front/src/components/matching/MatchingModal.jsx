import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/styles/matching/MatchingModal.module.scss';

const MatchingModal = ({ item, onClose }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <h2>{item.title}</h2>
                <p>장소: {item.placeName}</p>
                <p>날짜: {new Date(item.meetDate).toLocaleString()}</p>
                <p>주소: {item.address}</p>
                <p>모집 인원: {item.headCount}</p>
                {item.tag && <p>태그: {item.tag}</p>}
                {item.matchingType === 3 && (
                    <>
                        {item.location && <p>위치: {item.location}</p>}
                        {item.introduce && <p>소개: {item.introduce}</p>}
                        {item.mbti && <p>MBTI: {item.mbti}</p>}
                        {item.gender && <p>성별: {item.gender}</p>}
                        {item.age && <p>나이: {item.age}</p>}
                        {item.height && <p>키: {item.height} cm</p>}
                    </>
                )}
                <p>주최자: {item.memberId}</p>
            </div>
        </div>
    );
}

MatchingModal.propTypes = {
    item: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

export default MatchingModal;
