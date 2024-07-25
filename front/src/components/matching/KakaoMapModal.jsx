import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/styles/matching/KakaoMapModal.module.scss';

const KakaoMapModal = ({ isOpen, onClose, onSave }) => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [placeName, setPlaceName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('FD6'); // 기본 카테고리: 음식점
    const [errorMessage, setErrorMessage] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [address, setAddress] = useState(''); // 주소 저장

    const categories = [
        { code: 'MT1', name: '대형마트' },
        { code: 'CS2', name: '편의점' },
        { code: 'PS3', name: '어린이집, 유치원' },
        { code: 'SC4', name: '학교' },
        { code: 'AC5', name: '학원' },
        { code: 'PK6', name: '주차장' },
        { code: 'OL7', name: '주유소, 충전소' },
        { code: 'SW8', name: '지하철역' },
        { code: 'BK9', name: '은행' },
        { code: 'CT1', name: '문화시설' },
        { code: 'AG2', name: '중개업소' },
        { code: 'PO3', name: '공공기관' },
        { code: 'AT4', name: '관광명소' },
        { code: 'AD5', name: '숙박' },
        { code: 'FD6', name: '음식점' },
        { code: 'CE7', name: '카페' },
        { code: 'HP8', name: '병원' },
        { code: 'PM9', name: '약국' },
    ];

    useEffect(() => {
        if (!isOpen) return;

       

        const loadKakaoMapScript = (callback) => {
            const script = document.createElement('script');
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAPS_API_KEY}&libraries=services&autoload=false`;
            script.onload = () => {
                window.kakao.maps.load(callback);
            };
            script.onerror = (error) => {
               
            };
            document.head.appendChild(script);
        };

        const initializeMap = () => {
            const container = mapRef.current;
            const options = {
                center: new window.kakao.maps.LatLng(37.566535, 126.9779692),
                level: 3,
            };

            const map = new window.kakao.maps.Map(container, options);
            mapInstanceRef.current = map;

            // 지도 클릭 이벤트 등록
            window.kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
                const latlng = mouseEvent.latLng;
                const geocoder = new window.kakao.maps.services.Geocoder();

                // 좌표를 주소로 변환
                geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        const address = result[0].address.address_name;
                        setAddress(address); // 주소 저장
                        setSearchKeyword(address);
                        setErrorMessage(''); // 에러 메시지 초기화
                       
                        if (markerRef.current) {
                            markerRef.current.setPosition(latlng);
                        } else {
                            markerRef.current = new window.kakao.maps.Marker({
                                position: latlng,
                                map: map,
                            });
                        }

                        const places = new window.kakao.maps.services.Places();

                        // 선택한 위치 주변의 선택된 카테고리에 해당하는 장소 검색
                        places.categorySearch(selectedCategory, (data, status) => {
                            if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
                                const place = data[0];
                                setPlaceName(place.place_name);
                               
                            } else {
                                setPlaceName('');
                            }
                        }, {
                            location: latlng,
                            radius: 50
                        });
                    }
                });
            });

            mapRef.current = map;
        };

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
    }, [isOpen, selectedCategory]);

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
                setErrorMessage(''); // 에러 메시지 초기화
            } else {
                const places = new window.kakao.maps.services.Places();
                places.keywordSearch(searchKeyword, (result, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                       
                        setSearchResults(result);
                        setErrorMessage(''); // 에러 메시지 초기화
                    } else {
                        setErrorMessage('검색된 결과가 없습니다.');
                        setSearchResults([]);
                    }
                });
            }
        });
    };

    const handleSelectPlace = (place) => {
        const latlng = new window.kakao.maps.LatLng(place.y, place.x);
        mapInstanceRef.current.setCenter(latlng);

        setPlaceName(place.place_name);
        setSearchKeyword(place.address_name || place.road_address_name);
        setAddress(place.address_name || place.road_address_name); // 주소 저장
       

        if (markerRef.current) {
            markerRef.current.setPosition(latlng);
        } else {
            markerRef.current = new window.kakao.maps.Marker({
                position: latlng,
                map: mapInstanceRef.current,
            });
        }
    };

    const handleSave = () => {
        if (!markerRef.current) {
            setErrorMessage('선택된 모임 장소가 없습니다.');
            return;
        }
        const position = markerRef.current.getPosition();
       
        onSave(address, position.getLat(), position.getLng(), placeName);
        onClose();
    };

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
                <div className={styles.categoryContainer}>
                    <label htmlFor="category">카테고리: </label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={styles.categorySelect}
                    >
                        {categories.map((category) => (
                            <option key={category.code} value={category.code}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
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
