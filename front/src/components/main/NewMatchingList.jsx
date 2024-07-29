import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MatchingItem from '../../components/matching/MatchingItem';
import styles from '../../assets/styles/matching/NewMatchingList.module.scss';
import { getMembers } from '../../api/memberMatchingApi';
import { useSelector } from 'react-redux';

const NewMatchingList = ({ items, onItemClick }) => {
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
                    console.error(`Error fetching members for item ${item.id}:`, error); // 에러 로그 추가
                    return { ...item, currentMemberCount: item.currentMemberCount || 0 }; // 기본값 0으로 설정
                }
            }));
            setItemsWithMemberCount(updatedItems);
        };

        if (items.length) {
            fetchMemberCounts();
        }
    }, [items, token]);

    const getRecentItems = useMemo(() => {
        const sortedItems = [...itemsWithMemberCount].sort((a, b) => new Date(b.regDate) - new Date(a.regDate));
        const selectedItems = [];
        const types = new Set();

        for (const item of sortedItems) {
            if (!types.has(item.matchingType)) {
                selectedItems.push(item);
                types.add(item.matchingType);
            }

            if (selectedItems.length === 2) break;
        }

        return selectedItems;
    }, [itemsWithMemberCount]);

    return (
        <div className={`${styles.newMatchingList} ${styles.verticalLayout}`}>
            {getRecentItems.map(item => (
                <div key={item.id} onClick={() => onItemClick(item.id)}>
                    <MatchingItem
                        id={item.id}
                        memberId={String(item.memberId)}
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
                        tag={typeof item.tag === 'string' ? item.tag : JSON.stringify(item.tag)}
                        headCount={item.headCount}
                        currentMemberCount={item.currentMemberCount || 0}
                        location={item.location}
                        introduce={item.introduce}
                        mbti={item.mbti}
                        gender={item.gender}
                        age={item.age}
                        height={item.height}
                        filePathUrl={item.filePathUrl}
                        nickname={item.nickname}
                        profileImageUrl={item.profileImageUrl}
                        onClick={() => onItemClick(item.id)}
                    />
                </div>
            ))}
        </div>
    );
};

NewMatchingList.propTypes = {
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
        tag: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
        headCount: PropTypes.number.isRequired,
        currentMemberCount: PropTypes.number,
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
};

export default NewMatchingList;
