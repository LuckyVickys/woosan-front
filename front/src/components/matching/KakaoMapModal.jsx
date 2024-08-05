import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/styles/matching/KakaoMapModal.module.scss';

const KakaoMapModal = ({ isOpen, onClose, onSave }) => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [placeName, setPlaceName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [address, setAddress] = useState('');

    /**
     * 카카오 맵 스크립트를 로드하는 함수
     * @param {Function} callback - 스크립트 로드 후 호출할 콜백 함수
     */
    const loadKakaoMapScript = (callback) => {
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAPS_API_KEY}&libraries=services&autoload=false`;
        script.onload = () => {
            window.kakao.maps.load(callback);
        };
        script.onerror = () => {
            // 스크립트 로드 오류 처리
        };
        document.head.appendChild(script);
    };

    /**
     * 마커를 찍고 해당 위치를 중심으로 장소를 검색하는 함수
     * @param {Object} latlng - 위치 정보 (위도, 경도)
     */
    const placeMarkerAndSearch = useCallback((latlng) => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const address = result[0].address.address_name;
                setAddress(address);
                setSearchKeyword(address);
                setErrorMessage('');

                if (markerRef.current) {
                    markerRef.current.setPosition(latlng);
                } else {
                    markerRef.current = new window.kakao.maps.Marker({
                        position: latlng,
                        map: mapInstanceRef.current,
                    });
                }

                const places = new window.kakao.maps.services.Places();
                places.keywordSearch(address, (data, status) => {
                    if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
                        setSearchResults(data);
                        const place = data[0];
                        setPlaceName(place.place_name);
                    } else {
                        setPlaceName('');
                    }
                }, {
                    location: latlng,
                    radius: 500
                });
            }
        });
    }, []);

    /**
     * 카카오 맵을 초기화하는 함수
     */
    const initializeMap = useCallback(() => {
        const container = mapRef.current;
        const options = {
            center: new window.kakao.maps.LatLng(37.566535, 126.9779692),
            level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
        mapInstanceRef.current = map;

        window.kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
            const latlng = mouseEvent.latLng;
            placeMarkerAndSearch(latlng);
        });

        window.kakao.maps.event.addListener(map, 'dragend', () => {
            const center = map.getCenter();
            placeMarkerAndSearch(center);
        });

        mapRef.current = map;
    }, [placeMarkerAndSearch]);

    useEffect(() => {
        if (!isOpen) return;

        if (!window.kakao || !window.kakao.maps) {
            loadKakaoMapScript(initializeMap);
        } else {
            initializeMap();
        }

        return () => {
            if (mapRef.current) {
                window.kakao.maps.event.removeListener(mapRef.current, 'click');
            }
        };
    }, [isOpen, initializeMap]);

    /**
     * 검색어로 장소를 검색하는 함수
     */
    const handleSearch = () => {
        if (!searchKeyword) {
            setErrorMessage('빈 검색어입니다. 주소를 입력하세요.');
            return;
        }
        if (!window.kakao || !window.kakao.maps) {
            return;
        }

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(searchKeyword, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                setSearchResults(result);
                setErrorMessage('');
            } else {
                const places = new window.kakao.maps.services.Places();
                places.keywordSearch(searchKeyword, (result, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        setSearchResults(result);
                        setErrorMessage('');
                    } else {
                        setErrorMessage('검색된 결과가 없습니다.');
                        setSearchResults([]);
                    }
                });
            }
        });
    };

    /**
     * 선택한 장소를 설정하는 함수
     * @param {Object} place - 선택한 장소 정보
     */
    const handleSelectPlace = (place) => {
        const latlng = new window.kakao.maps.LatLng(place.y, place.x);
        mapInstanceRef.current.setCenter(latlng);

        setPlaceName(place.place_name);
        setSearchKeyword(place.address_name || place.road_address_name);
        setAddress(place.address_name || place.road_address_name);

        if (markerRef.current) {
            markerRef.current.setPosition(latlng);
        } else {
            markerRef.current = new window.kakao.maps.Marker({
                position: latlng,
                map: mapInstanceRef.current,
            });
        }
    };

    /**
     * 선택한 위치를 저장하는 함수
     */
    const handleSave = () => {
        if (!markerRef.current) {
            setErrorMessage('선택된 모임 장소가 없습니다.');
            return;
        }
        const position = markerRef.current.getPosition();
        onSave(address, position.getLat(), position.getLng(), placeName);
        onClose();
    };

    /**
     * Enter 키를 누를 때 검색을 실행하는 함수
     * @param {Object} e - 이벤트 객체
     */
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        placeholder="주소 또는 키워드를 입력하세요"
                        className={styles.searchInput}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleSearch} className={styles.searchButton}>
                        검색
                    </button>
                </div>
                {errorMessage && (
                    <div className={styles.errorMessage}>
                        {errorMessage}
                    </div>
                )}
                {placeName && (
                    <div className={styles.addressDisplay}>
                        <div><strong>모임 장소: </strong>{placeName} {searchKeyword}</div>
                    </div>
                )}
                <div id="map" ref={mapRef} style={{ width: '100%', height: '400px', marginTop: '10px' }}></div>
                <ul className={styles.searchResults}>
                    {searchResults.slice(0, 5).map((result) => (
                        <li key={result.id} onClick={() => handleSelectPlace(result)}>
                            {result.place_name} ({result.road_address_name || result.address_name})
                        </li>
                    ))}
                </ul>
                <div className={styles.modalButtons}>
                    <button onClick={handleSave} className={styles.saveButton}>
                        저장
                    </button>
                    <button onClick={onClose} className={styles.cancelButton}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

KakaoMapModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default KakaoMapModal;
