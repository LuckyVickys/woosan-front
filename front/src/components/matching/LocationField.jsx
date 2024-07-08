import React from 'react';
import styles from '../../assets/styles/matching/LocationField.module.scss';

const LocationField = ({ address, setAddress, locationX, setLocationX, locationY, setLocationY }) => {
    return (
        <div className={styles.field}>
            <label htmlFor="address" className={styles.label}>주소</label>
            <input
                id="address"
                className={styles.input}
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
            />
            <label htmlFor="locationX" className={styles.label}>위도</label>
            <input
                id="locationX"
                className={styles.input}
                type="text"
                value={locationX}
                onChange={(e) => setLocationX(e.target.value)}
                required
            />
            <label htmlFor="locationY" className={styles.label}>경도</label>
            <input
                id="locationY"
                className={styles.input}
                type="text"
                value={locationY}
                onChange={(e) => setLocationY(e.target.value)}
                required
            />
        </div>
    );
};

export default LocationField;
