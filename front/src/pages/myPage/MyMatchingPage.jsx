import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MatchingList from '../../components/matching/MatchingList';
import { getMatchingBoardsByMemberId  } from '../../api/matchingBoardApi';

const MyMatchingPage = () => {
    const [myMatchings, setMyMatchings] = useState([]);
    const navigate = useNavigate();
    const loginState = useSelector((state) => state.loginSlice); // 로그인된 상태 가져오기

    useEffect(() => {
        const fetchMyMatchings = async () => {
            try {
                const matchings = await getMatchingBoardsByMemberId(loginState.id);
                setMyMatchings(matchings);
            } catch (error) {
                console.error('나의 매칭을 가져오는 중 오류 발생:', error);
            }
        };

        if (loginState.id) {
            fetchMyMatchings();
        }
    }, [loginState.id]);

    const handleMatchingClick = (Id) => {
        navigate(`/matching/modify/${Id}`);
    };

    return (
        <div className="my-matching-page">
            <MatchingList items={myMatchings} onItemClick={handleMatchingClick} gridColumns={2} />
        </div>
    );
};

export default MyMatchingPage;