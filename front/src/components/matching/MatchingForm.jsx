import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationField from './LocationField';
import styles from '../../assets/styles/matching/MatchingForm.module.scss';
import { useSelector } from 'react-redux';

const MatchingForm = ({ onSubmit, initialValues, matchingType }) => {
    const loginState = useSelector((state) => state.loginSlice); // 로그인된 상태 가져오기
    const navigate = useNavigate();
    const [title, setTitle] = useState(initialValues.title || '');
    const [content, setContent] = useState(initialValues.content || '');
    const [placeName, setPlaceName] = useState(initialValues.placeName || '');
    const [locationX, setLocationX] = useState(initialValues.locationX || '');
    const [locationY, setLocationY] = useState(initialValues.locationY || '');
    const [address, setAddress] = useState(initialValues.address || '');
    const [meetDate, setMeetDate] = useState(initialValues.meetDate || new Date().toISOString().slice(0, 16));
    const [tag, setTag] = useState(initialValues.tag || '');
    const [headCount, setHeadCount] = useState(initialValues.headCount || '');
    const [errors, setErrors] = useState({});
    const [files, setFiles] = useState([]); // 파일 상태 관리
    const uploadRef = useRef();

    // 셀프 소개팅에 필요한 상태들
    const [location, setLocation] = useState(initialValues.location || '');
    const [introduce, setIntroduce] = useState(initialValues.introduce || '');
    const [mbti, setMbti] = useState(initialValues.mbti || '');
    const [gender, setGender] = useState(initialValues.gender || '');
    const [age, setAge] = useState(initialValues.age || '');
    const [height, setHeight] = useState(initialValues.height || '');

    // 폼 유효성 검사 함수
    const validateForm = () => {
        const newErrors = {};
        if (!title) newErrors.title = '모임명을 입력해주세요';
        if (!content) newErrors.content = '모임 소개를 입력해주세요';
        if (!placeName) newErrors.placeName = '모임 장소를 입력해주세요';
        if (!meetDate) newErrors.meetDate = '모임 날짜 / 시간을 입력해주세요';
        if (!tag) newErrors.tag = '태그를 입력해주세요';
        if (!headCount) newErrors.headCount = '모집 인원을 입력해주세요';

        if (matchingType === 3) {
            if (!location) newErrors.location = '지역을 입력해주세요';
            if (!introduce) newErrors.introduce = '한줄 자기소개를 입력해주세요';
            if (!mbti) newErrors.mbti = 'MBTI를 선택해주세요';
            if (!gender) newErrors.gender = '성별을 선택해주세요';
            if (!age) newErrors.age = '나이를 입력해주세요';
            if (!height) newErrors.height = '키를 입력해주세요';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const formData = new FormData();
        formData.append('memberId', loginState.id); // memberId 추가
        formData.append('title', title);
        formData.append('content', content);
        formData.append('placeName', placeName);
        formData.append('locationX', locationX);
        formData.append('locationY', locationY);
        formData.append('address', address); // address 추가
        formData.append('meetDate', meetDate);
        formData.append('tag', tag);
        formData.append('headCount', headCount);
        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }
        formData.append('matchingType', matchingType);

        if (matchingType === 3) {
            formData.append('location', location);
            formData.append('introduce', introduce);
            formData.append('mbti', mbti);
            formData.append('gender', gender);
            formData.append('age', age);
            formData.append('height', height);
        }

        console.log('폼 데이터 제출 중:', Object.fromEntries(formData.entries())); // 디버깅을 위한 콘솔 로그

        await onSubmit(formData);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.id]: '' }));
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    };

    const handleRemoveFile = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);

        // 입력 창 초기화
        if (uploadRef.current) {
            uploadRef.current.value = '';
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <div className={`${styles.formGroup} ${styles.short}`}>
                    <label htmlFor="tag">태그</label>
                    <input
                        id="tag"
                        value={tag}
                        onChange={handleInputChange(setTag)}
                        placeholder="태그를 입력해주세요"
                    />
                    {errors.tag && <div className={styles.error}>{errors.tag}</div>}
                </div>
                <div className={`${styles.formGroup} ${styles.short}`}>
                    <label htmlFor="meetDate">모임 날짜 / 시간</label>
                    <input
                        id="meetDate"
                        type="datetime-local"
                        value={meetDate}
                        onChange={handleInputChange(setMeetDate)}
                        required
                        placeholder="2024-07-10 00:00"
                    />
                    {errors.meetDate && <div className={styles.error}>{errors.meetDate}</div>}
                </div>
                <div className={`${styles.formGroup} ${styles.short}`}>
                    <label htmlFor="headCount">모집 인원</label>
                    <input
                        id="headCount"
                        type="number"
                        value={headCount}
                        onChange={handleInputChange(setHeadCount)}
                        required
                        placeholder="인원을 입력하세요"
                    />
                    {errors.headCount && <div className={styles.error}>{errors.headCount}</div>}
                </div>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="title">모임명</label>
                <input
                    id="title"
                    value={title}
                    onChange={handleInputChange(setTitle)}
                    required
                    placeholder="모임명을 입력해주세요"
                />
                {errors.title && <div className={styles.error}>{errors.title}</div>}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="content">모임 소개</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={handleInputChange(setContent)}
                    required
                    placeholder="모임 소개를 입력해주세요"
                    style={{ height: '210px' }}
                />
                {errors.content && <div className={styles.error}>{errors.content}</div>}
            </div>
            <LocationField
                placeName={placeName}
                setPlaceName={setPlaceName}
                locationX={locationX}
                setLocationX={setLocationX}
                locationY={locationY}
                setLocationY={setLocationY}
                address={address}
                setAddress={setAddress}
            />
            {errors.placeName && <div className={styles.error}>{errors.placeName}</div>}
            <div className={styles.formGroup}>
                <label htmlFor="fileUpload" className={styles.label}>첨부파일</label>
                <input
                    id="fileUpload"
                    name="fileUpload"
                    type="file"
                    ref={uploadRef}
                    multiple
                    onChange={handleFileChange}
                    className={styles.input}
                />
                <div className={styles.fileList}>
                    {files.map((file, index) => (
                        <div key={index} className={styles.fileItem}>
                            <span>{file.name}</span>
                            <button type="button" onClick={() => handleRemoveFile(index)} className={styles.deleteButton}>
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {matchingType === 3 && (
                <>
                    <div className={styles.inlineFormGroup}>
                        <div className={`${styles.formGroup} ${styles.inline}`}>
                            <label>성별</label>
                            <div className={styles.genderContainer}>
                                <button
                                    type="button"
                                    className={`${styles.genderButton} ${gender === '남성' ? styles.active : ''}`}
                                    onClick={() => {
                                        setGender('남성');
                                        setErrors((prevErrors) => ({ ...prevErrors, gender: '' }));
                                    }}
                                >
                                    남성
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.genderButton} ${gender === '여성' ? styles.active : ''}`}
                                    onClick={() => {
                                        setGender('여성');
                                        setErrors((prevErrors) => ({ ...prevErrors, gender: '' }));
                                    }}
                                >
                                    여성
                                </button>
                            </div>
                            {errors.gender && <div className={styles.error}>{errors.gender}</div>}
                        </div>
                        <div className={`${styles.formGroup} ${styles.inline}`}>
                            <label htmlFor="age">만 나이(세)</label>
                            <input
                                id="age"
                                type="number"
                                value={age}
                                onChange={handleInputChange(setAge)}
                                required
                                placeholder="나이를 입력해주세요"
                            />
                            {errors.age && <div className={styles.error}>{errors.age}</div>}
                        </div>
                        <div className={`${styles.formGroup} ${styles.inline}`}>
                            <label htmlFor="height">키(cm)</label>
                            <input
                                id="height"
                                type="number"
                                value={height}
                                onChange={handleInputChange(setHeight)}
                                required
                                placeholder="키를 입력해주세요"
                            />
                            {errors.height && <div className={styles.error}>{errors.height}</div>}
                        </div>
                    </div>
                    <div className={styles.inlineFormGroup}>
                        <div className={`${styles.formGroup} ${styles.inline}`}>
                            <label htmlFor="mbti">MBTI</label>
                            <select
                                id="mbti"
                                value={mbti}
                                onChange={handleInputChange(setMbti)}
                                required
                            >
                                <option value="">MBTI를 선택해주세요</option>
                                {Object.values(MBTI).map(mbtiType => (
                                    <option key={mbtiType} value={mbtiType}>{mbtiType}</option>
                                ))}
                            </select>
                            {errors.mbti && <div className={styles.error}>{errors.mbti}</div>}
                        </div>
                        <div className={`${styles.formGroup} ${styles.inline}`}>
                            <label htmlFor="location">지역</label>
                            <input
                                id="location"
                                value={location}
                                onChange={handleInputChange(setLocation)}
                                required
                                placeholder="지역을 입력해주세요 ex)강남구"
                            />
                            {errors.location && <div className={styles.error}>{errors.location}</div>}
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="introduce">한줄 자기소개</label>
                        <input
                            id="introduce"
                            value={introduce}
                            onChange={handleInputChange(setIntroduce)}
                            required
                            placeholder="소개를 입력해주세요 ex) 런닝과 맛집을 좋아합니다"
                        />
                        {errors.introduce && <div className={styles.error}>{errors.introduce}</div>}
                    </div>
                </>
            )}
            <div className={styles.formButtons}>
                <button type="submit" className={styles.submitButton}>
                    저장
                </button>
                <button type="button" className={styles.cancelButton} onClick={handleCancel}>
                    취소
                </button>
            </div>
        </form>
    );
};

const MBTI = {
    ISTJ: 'ISTJ', ISFJ: 'ISFJ', INFJ: 'INFJ', INTJ: 'INTJ',
    ISTP: 'ISTP', ISFP: 'ISFP', INFP: 'INFP', INTP: 'INTP',
    ESTP: 'ESTP', ESFP: 'ESFP', ENFP: 'ENFP', ENTP: 'ENTP',
    ESTJ: 'ESTJ', ESFJ: 'ESFJ', ENFJ: 'ENFJ', ENTJ: 'ENTJ'
};

export default MatchingForm;
