import React from "react";
import useRegularly from "../hooks/useRegularly";
import styles from "./RegularlyPage.module.scss";

const RegularlyPage = () => {
    const { regularly, loading, error } = useRegularly();

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.error}> 정기 모임을 가져오는 중 오류 발생: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>정기 모임 리스트</h1>
            <ul className={styles.list}>
                {regularly.map(match => (
                    <li key={match.id} className={styles.listItem}>{match.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default RegularlyPage;