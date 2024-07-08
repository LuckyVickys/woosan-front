import React from 'react';
import PropTypes from 'prop-types';
import MatchingItem from './MatchingItem';
import styles from '../../assets/styles/matching/MatchingList.module.scss';

/**
 * 매칭 리스트 컴포넌트
 * @param {Array} items - 매칭 아이템 배열
 * @param {Function} onItemClick - 아이템 클릭 시 호출되는 함수
 * @param {number} gridColumns - 그리드 컬럼 수
 */
const MatchingList = ({ items, onItemClick, gridColumns }) => {
    return (
        <div className={styles.itemsGrid} style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}>
            {items.map(item => (
                <MatchingItem 
                    key={item.id} 
                    id={item.id}
                    memberId={String(item.memberId)} // memberId를 문자열로 변환
                    matchingType={item.matchingType}
                    title={item.title}
                    content={item.content}
                    placeName={item.placeName}
                    locationX={item.locationX}
                    locationY={item.locationY}
                    address={item.address}
                    meetDate={item.meetDate}
                    tag={item.tag}
                    headCount={item.headCount}
                    location={item.location}
                    introduce={item.introduce}
                    mbti={item.mbti}
                    gender={item.gender}
                    age={item.age}
                    height={item.height}
                    onClick={onItemClick} // 적절한 클릭 핸들러 함수 추가
                />
            ))}
        </div>
    );
};

MatchingList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onItemClick: PropTypes.func.isRequired,
    gridColumns: PropTypes.number.isRequired,
};

export default MatchingList;
