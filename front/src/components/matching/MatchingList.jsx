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
    // 아이템 데이터 디버깅 로그
    console.log('매칭 리스트 아이템들:', items);

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
                    regDate={item.regDate}
                    views={item.views}
                    isDeleted={item.isDeleted}
                    placeName={item.placeName}
                    locationX={item.locationX}
                    locationY={item.locationY}
                    address={item.address}
                    meetDate={item.meetDate}
                    tag={item.tag} // tag를 객체로 전달
                    headCount={item.headCount}
                    location={item.location}
                    introduce={item.introduce}
                    mbti={item.mbti}
                    gender={item.gender}
                    age={item.age}
                    height={item.height}
                    filePathUrl={item.filePathUrl}
                    onClick={onItemClick}
                />
            ))}
        </div>
    );
};

MatchingList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        memberId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
        tag: PropTypes.object, // tag를 객체로 변경
        headCount: PropTypes.number.isRequired,
        location: PropTypes.string,
        introduce: PropTypes.string,
        mbti: PropTypes.string,
        gender: PropTypes.string,
        age: PropTypes.number,
        height: PropTypes.number,
        filePathUrl: PropTypes.arrayOf(PropTypes.string)
    })).isRequired,
    onItemClick: PropTypes.func.isRequired,
    gridColumns: PropTypes.number.isRequired,
};

export default MatchingList;
