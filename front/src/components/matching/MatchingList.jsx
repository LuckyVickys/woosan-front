import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MatchingItem from './MatchingItem';
import { getMembers } from '../../api/memberMatchingApi';
import styles from '../../assets/styles/matching/MatchingList.module.scss';
import { useSelector } from 'react-redux';

/**
 * 매칭 리스트 컴포넌트
 * @param {Array} items - 매칭 아이템 배열
 * @param {Function} onItemClick - 아이템 클릭 시 호출되는 함수
 * @param {number} gridColumns - 그리드 컬럼 수
 */
const MatchingList = ({ items, onItemClick, gridColumns }) => {
    const [itemsWithMemberCount, setItemsWithMemberCount] = useState([]);
    const loginState = useSelector((state) => state.loginSlice);
    const token = loginState.accessToken;

    useEffect(() => {
        const fetchMemberCounts = async () => {
            const updatedItems = await Promise.all(items.map(async (item) => {
                try {
                    const members = await getMembers(item.id, token);
                    const currentMemberCount = members.filter(member => member.isAccepted).length;
                    return { ...item, currentMemberCount };
                } catch (error) {
                    console.error(`Failed to fetch members for item ${item.id}`, error);
                    return { ...item, currentMemberCount: 0 }; // 기본값 0으로 설정
                }
            }));
            setItemsWithMemberCount(updatedItems);
        };

        fetchMemberCounts();
    }, [items, token]);

    return (
        <div className={`${styles.itemsGrid} ${styles.verticalLayout}`} style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}>
            {itemsWithMemberCount.map(item => (
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
                    tag={typeof item.tag === 'string' ? item.tag : JSON.stringify(item.tag)} // tag를 문자열로 전달
                    headCount={item.headCount}
                    currentMemberCount={item.currentMemberCount || 0} // currentMemberCount의 기본값 설정
                    location={item.location}
                    introduce={item.introduce}
                    mbti={item.mbti}
                    gender={item.gender}
                    age={item.age}
                    height={item.height}
                    filePathUrl={item.filePathUrl}
                    onClick={() => onItemClick(item.id)}
                    nickname={item.nickname} 
                    profileImageUrl={item.profileImageUrl} 
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
        tag: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // tag를 문자열로 받도록 수정
        headCount: PropTypes.number.isRequired,
        location: PropTypes.string,
        introduce: PropTypes.string,
        mbti: PropTypes.string,
        gender: PropTypes.string,
        age: PropTypes.number,
        height: PropTypes.number,
        filePathUrl: PropTypes.arrayOf(PropTypes.string),
        nickname: PropTypes.string, 
        profileImageUrl: PropTypes.arrayOf(PropTypes.string) 
    })).isRequired,
    onItemClick: PropTypes.func.isRequired,
    gridColumns: PropTypes.number.isRequired,
};

export default MatchingList;
