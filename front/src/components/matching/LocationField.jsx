import React, { useState } from 'react';
import PropTypes from 'prop-types';
import KakaoMapModal from './KakaoMapModal';
import styles from '../../assets/styles/matching/LocationField.module.scss';

const LocationField = ({ placeName, setPlaceName, locationX, setLocationX, locationY, setLocationY }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveLocation = (address, x, y, placeName) => {
        console.log('주소 저장:', address, x, y, placeName);
        setPlaceName(placeName || address);
        setLocationX(x);
        setLocationY(y);
        setIsModalOpen(false);
    };

    const handleDeleteLocation = () => {
        console.log('주소 삭제');
        setPlaceName('');
        setLocationX('');
        setLocationY('');
    };

    return (
        <div className={styles.formGroup}>
            <label htmlFor="placeName">모임 장소</label>
            <input
                id="placeName"
                name="placeName"
                type="text"
                value={placeName}
                onClick={() => setIsModalOpen(true)}
                placeholder="모임 장소를 입력해주세요."
                readOnly
                className={styles.input}
            />
            {placeName && (
                <div className={styles.selectedAddress}>
                    <span>{placeName}</span>
                    <button type="button" onClick={handleDeleteLocation} className={styles.deleteButton}>
                        X
                    </button>
                </div>
            )}
            <KakaoMapModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveLocation}
            />
        </div>
    );
};

LocationField.propTypes = {
    placeName: PropTypes.string.isRequired,
    setPlaceName: PropTypes.func.isRequired,
    locationX: PropTypes.string.isRequired,
    setLocationX: PropTypes.func.isRequired,
    locationY: PropTypes.string.isRequired,
    setLocationY: PropTypes.func.isRequired,
};

export default LocationField;
