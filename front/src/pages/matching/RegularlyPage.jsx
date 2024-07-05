import React from 'react';
import useRegularly from '../../hooks/useRegularly';
import MatchingPageTemplate from './MatchingPageTemplate';
import MatchingList from '../../components/matching/MatchingList';

const RegularlyPage = () => {
    const { regularly, loading, error } = useRegularly();

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
            items={regularly}
            ListComponent={MatchingList}
            gridColumns={2}
        />
    );
};

export default RegularlyPage;
