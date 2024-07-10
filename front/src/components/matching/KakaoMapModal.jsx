import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/styles/matching/KakaoMapModal.module.scss';

const KakaoMapModal = ({ isOpen, onClose, onSave }) => {
    const [searchAddress, setSearchAddress] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [placeName, setPlaceName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('FD6'); // 기본 카테고리: 음식점
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const mapInstanceRef = useRef(null);

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

        console.log('카카오 클라이언트 아이디:', process.env.REACT_APP_KAKAO_MAPS_API_KEY);

        const loadKakaoMapScript = () => {
            const script = document.createElement('script');
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAPS_API_KEY}&libraries=services&autoload=false`;
            script.async = true;
            document.head.appendChild(script);

            script.onload = () => {
                window.kakao.maps.load(() => {
                    console.log('카카오 지도 스크립트 로드 완료');
                    const container = mapRef.current;
                    const options = {
                        center: new window.kakao.maps.LatLng(37.566535, 126.9779692),
                        level: 3,
                    };

                    const map = new window.kakao.maps.Map(container, options);
                    mapInstanceRef.current = map;

                    window.kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
                        const latlng = mouseEvent.latLng;
                        const geocoder = new window.kakao.maps.services.Geocoder();

                        geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
                            if (status === window.kakao.maps.services.Status.OK) {
                                const address = result[0].address.address_name;
                                setSearchAddress(address);

                                if (markerRef.current) {
                                    markerRef.current.setPosition(latlng);
                                } else {
                                    markerRef.current = new window.kakao.maps.Marker({
                                        position: latlng,
                                        map: map,
                                    });
                                }

                                const places = new window.kakao.maps.services.Places();

                                places.categorySearch(selectedCategory, (data, status) => {
                                    if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
                                        const place = data[0];
                                        setPlaceName(place.place_name);
                                        console.log('클릭한 장소의 이름:', place.place_name);
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
                });
            };

            script.onerror = () => {
                console.error('카카오 지도 스크립트 로드 오류');
            };
        };

        if (isOpen && !window.kakao) {
            loadKakaoMapScript();
        } else if (isOpen && window.kakao) {
            const container = mapRef.current;
            const options = {
                center: new window.kakao.maps.LatLng(37.566535, 126.9779692),
                level: 3,
            };

            const map = new window.kakao.maps.Map(container, options);
            mapInstanceRef.current = map;

            window.kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
                const latlng = mouseEvent.latLng;
                const geocoder = new window.kakao.maps.services.Geocoder();

                geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        const address = result[0].address.address_name;
                        setSearchAddress(address);

                        if (markerRef.current) {
                            markerRef.current.setPosition(latlng);
                        } else {
                            markerRef.current = new window.kakao.maps.Marker({
                                position: latlng,
                                map: map,
                            });
                        }

                        const places = new window.kakao.maps.services.Places();

                        places.categorySearch(selectedCategory, (data, status) => {
                            if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
                                const place = data[0];
                                setPlaceName(place.place_name);
                                console.log('클릭한 장소의 이름:', place.place_name);
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
        }

        return () => {
            if (mapRef.current) {
                window.kakao.maps.event.removeListener(mapRef.current, 'click');
            }
        };
    }, [isOpen]);

    useEffect(() => {
        if (!mapInstanceRef.current || !markerRef.current) return;

        const latlng = markerRef.current.getPosition();
        const places = new window.kakao.maps.services.Places();

        places.categorySearch(selectedCategory, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
                const place = data[0];
                setPlaceName(place.place_name);
                console.log('카테고리 변경 후 장소의 이름:', place.place_name);
            } else {
                setPlaceName('');
            }
        }, {
            location: latlng,
            radius: 50
        });
    }, [selectedCategory]);

    const handleSearch = () => {
        if (!searchAddress) return;
        if (!window.kakao || !window.kakao.maps) {
            console.error('카카오 지도가 로드되지 않았습니다.');
            return;
        }

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(searchAddress, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const { y, x, address_name } = result[0];
                const latlng = new window.kakao.maps.LatLng(y, x);
                mapInstanceRef.current.setCenter(latlng);

                console.log('검색된 주소:', address_name);
                setSearchResults([{ address: address_name, x: y, y: x }]);
                setSearchAddress(address_name);

                if (markerRef.current) {
                    markerRef.current.setPosition(latlng);
                } else {
                    markerRef.current = new window.kakao.maps.Marker({
                        position: latlng,
                        map: mapInstanceRef.current,
                    });
                }

                const places = new window.kakao.maps.services.Places();

                places.categorySearch(selectedCategory, (data, status) => {
                    if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
                        const place = data[0];
                        setPlaceName(place.place_name);
                        console.log('검색된 장소의 이름:', place.place_name);
                    }
                }, {
                    location: latlng,
                    radius: 50
                });
            } else {
                console.error('주소 검색 결과가 없습니다.');
            }
        });
    };

    const handleSelectAddress = (address, x, y) => {
        const latlng = new window.kakao.maps.LatLng(x, y);
        mapInstanceRef.current.setCenter(latlng);

        setSearchAddress(address);

        if (markerRef.current) {
            markerRef.current.setPosition(latlng);
        } else {
            markerRef.current = new window.kakao.maps.Marker({
                position: latlng,
                map: mapInstanceRef.current,
            });
        }

        const places = new window.kakao.maps.services.Places();

        places.categorySearch(selectedCategory, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
                const place = data[0];
                setPlaceName(place.place_name);
                console.log('선택된 장소의 이름:', place.place_name);
            }
        }, {
            location: latlng,
            radius: 50
        });
    };

    const handleSave = () => {
        if (!markerRef.current) return;
        const position = markerRef.current.getPosition();
        console.log('저장된 주소:', searchAddress, position.getLat(), position.getLng());
        onSave(searchAddress, position.getLat(), position.getLng(), placeName);
        onClose();
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
                        value={searchAddress}
                        onChange={(e) => setSearchAddress(e.target.value)}
                        placeholder="주소를 입력하세요"
                        className={styles.searchInput}
                    />
                    <button onClick={handleSearch} className={styles.searchButton}>
                        검색
                    </button>
                </div>
                {placeName && (
                    <div className={styles.addressDisplay}>
                        <div><strong>선택한 장소: </strong>{placeName} {searchAddress}</div>
                    </div>
                )}
                <div
                    id="map"
                    ref={mapRef}
                    style={{ width: '100%', height: '400px', marginTop: '10px' }}
                ></div>
                {searchResults.length > 0 && (
                    <ul className={styles.searchResults}>
                        {searchResults.map((result, index) => (
                            <li key={index} onClick={() => handleSelectAddress(result.address, result.x, result.y)}>
                                {/* {result.address} */}
                            </li>
                        ))}
                    </ul>
                )}
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
