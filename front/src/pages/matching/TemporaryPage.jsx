import React from 'react';
import useTemporary from '../../hooks/useTemporary';
import MatchingPageTemplate from './MatchingPageTemplate';
import MatchingList from '../../components/matching/MatchingList';

const TemporaryPage = () => {
    const { temporary, loading, error } = useTemporary();

    if (loading) {
        console.log('로딩 중...');
        return <div>Loading...</div>;
    }

    if (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        return <div>데이터를 가져오는 중 오류 발생</div>;
    }

    return (
        <MatchingPageTemplate
            items={temporary}
            ListComponent={MatchingList}
            gridColumns={1}
        />
    );
};

export default TemporaryPage;
