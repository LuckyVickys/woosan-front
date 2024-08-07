import React, { useState } from 'react';
import PropTypes from 'prop-types';
import KakaoMapModal from './KakaoMapModal';
import styles from '../../assets/styles/matching/LocationField.module.scss';

const LocationField = ({ placeName, setPlaceName, locationX, setLocationX, locationY, setLocationY, address, setAddress }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveLocation = (address, x, y, placeName) => {
        // 주소와 위치 정보 업데이트
        setPlaceName(placeName || address);
        setLocationX(x.toString()); // 숫자를 문자열로 변환
        setLocationY(y.toString()); // 숫자를 문자열로 변환
        setAddress(address); // address 상태 업데이트
        setIsModalOpen(false);
    };

    const handleDeleteLocation = () => {
        // 주소와 위치 정보 초기화
        setPlaceName('');
        setLocationX('');
        setLocationY('');
        setAddress(''); // address 상태 초기화
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
    address: PropTypes.string.isRequired,
    setAddress: PropTypes.func.isRequired,
};

export default LocationField;
