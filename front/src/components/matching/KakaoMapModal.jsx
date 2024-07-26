import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/styles/matching/KakaoMapModal.module.scss';

// KakaoMapModal 컴포넌트 정의
const KakaoMapModal = ({ isOpen, onClose, onSave }) => {
    const [searchKeyword, setSearchKeyword] = useState(''); // 검색어 상태
    const [placeName, setPlaceName] = useState(''); // 선택된 장소 이름 상태
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태
    const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
    const mapRef = useRef(null); // 지도를 렌더링할 DOM 요소 참조
    const markerRef = useRef(null); // 마커 참조
    const mapInstanceRef = useRef(null); // 지도 인스턴스 참조
    const [address, setAddress] = useState(''); // 주소 상태

    // 모달이 열릴 때 Kakao 지도 스크립트를 로드하고 초기화하는 useEffect
    useEffect(() => {
        if (!isOpen) return;

        const loadKakaoMapScript = (callback) => {
            const existingScript = document.getElementById('kakao-map-script');
            if (existingScript) {
                window.kakao.maps.load(callback);
                return;
            }

            const script = document.createElement('script');
            script.id = 'kakao-map-script';
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAPS_API_KEY}&libraries=services&autoload=false`;
            script.onload = () => {
                window.kakao.maps.load(callback);
            };
            document.head.appendChild(script);
        };

        const initializeMap = () => {
            if (!window.kakao || !window.kakao.maps) {
                return;
            }

            const container = mapRef.current;
            const options = {
                center: new window.kakao.maps.LatLng(37.566535, 126.9779692), // 초기 중심 좌표 설정
                level: 3, // 지도 레벨 설정
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

                        // 마커 위치 설정
                        if (markerRef.current) {
                            markerRef.current.setPosition(latlng);
                        } else {
                            markerRef.current = new window.kakao.maps.Marker({
                                position: latlng,
                                map: map,
                            });
                        }
                    }
                });
            });

            mapRef.current = map;
        };

        // Kakao 지도 스크립트가 로드되지 않은 경우 로드
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
    }, [isOpen]);

    // 검색 버튼 클릭 시 호출되는 함수
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

    // 검색 결과에서 장소 선택 시 호출되는 함수
    const handleSelectPlace = (place) => {
        const latlng = new window.kakao.maps.LatLng(place.y, place.x);
        mapInstanceRef.current.setCenter(latlng);

        setPlaceName(place.place_name);
        setSearchKeyword(place.address_name || place.road_address_name);
        setAddress(place.address_name || place.road_address_name); // 주소 저장

        // 마커 위치 설정
        if (markerRef.current) {
            markerRef.current.setPosition(latlng);
        } else {
            markerRef.current = new window.kakao.maps.Marker({
                position: latlng,
                map: mapInstanceRef.current,
            });
        }
    };

    // 저장 버튼 클릭 시 호출되는 함수
    const handleSave = () => {
        if (!markerRef.current) {
            setErrorMessage('선택된 모임 장소가 없습니다.');
            return;
        }
        const position = markerRef.current.getPosition();
        onSave(address, position.getLat(), position.getLng(), placeName);
        onClose();
    };

    // 검색어 입력 시 엔터 키를 눌렀을 때 호출되는 함수
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
    isOpen: PropTypes.bool.isRequired, // 모달이 열려 있는지 여부
    onClose: PropTypes.func.isRequired, // 모달 닫기 함수
    onSave: PropTypes.func.isRequired, // 저장 버튼 클릭 시 호출되는 함수
};

export default KakaoMapModal;
