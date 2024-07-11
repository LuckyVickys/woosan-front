import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from './FileUpload';
import LocationField from './LocationField';
import styles from '../../assets/styles/matching/MatchingForm.module.scss';

const MatchingForm = ({ onSubmit, initialValues, matchingType }) => {
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
    const [files, setFiles] = useState(initialValues.files || []);

    // 셀프 소개팅에 필요한 상태들
    const [location, setLocation] = useState(initialValues.location || '');
    const [introduce, setIntroduce] = useState(initialValues.introduce || '');
    const [mbti, setMbti] = useState(initialValues.mbti || '');
    const [gender, setGender] = useState(initialValues.gender || '');
    const [age, setAge] = useState(initialValues.age || '');
    const [height, setHeight] = useState(initialValues.height || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            title,
            content,
            placeName,
            locationX,
            locationY,
            address,
            meetDate,
            tag,
            headCount,
            files,
            matchingType,
        };

        if (matchingType === 3) {
            formData.location = location;
            formData.introduce = introduce;
            formData.mbti = mbti;
            formData.gender = gender;
            formData.age = age;
            formData.height = height;
        }

        console.log('폼 데이터 제출 중:', formData); // 디버깅을 위한 콘솔 로그
        await onSubmit(formData);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleAddressDelete = () => {
        setAddress('');
        setLocationX('');
        setLocationY('');
        setPlaceName('');
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <div className={`${styles.formGroup} ${styles.short}`}>
                    <label htmlFor="tag">태그</label>
                    <input
                        id="tag"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        placeholder="태그를 입력해주세요"
                    />
                </div>
                <div className={`${styles.formGroup} ${styles.short}`}>
                    <label htmlFor="meetDate">모임 날짜 / 시간</label>
                    <input
                        id="meetDate"
                        type="datetime-local"
                        value={meetDate}
                        onChange={(e) => setMeetDate(e.target.value)}
                        required
                        placeholder="2024-07-10 00:00"
                    />
                </div>
                <div className={`${styles.formGroup} ${styles.short}`}>
                    <label htmlFor="headCount">모집 인원</label>
                    <input
                        id="headCount"
                        type="number"
                        value={headCount}
                        onChange={(e) => setHeadCount(e.target.value)}
                        required
                        placeholder="인원을 입력하세요"
                    />
                </div>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="title">모임명</label>
                <input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="모임명을 입력해주세요"
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="content">모임 소개</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    placeholder="내용을 입력해주세요"
                    style={{ height: '210px' }}
                />
            </div>
            <LocationField
                placeName={placeName}
                setPlaceName={setPlaceName}
                locationX={locationX}
                setLocationX={setLocationX}
                locationY={locationY}
                setLocationY={setLocationY}
            />
            <FileUpload files={files} setFiles={setFiles} />
            {matchingType === 3 && (
                <>
                    <div className={styles.formGroup}>
                        <label htmlFor="location">위치</label>
                        <input
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            placeholder="위치를 입력해주세요"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="introduce">소개</label>
                        <input
                            id="introduce"
                            value={introduce}
                            onChange={(e) => setIntroduce(e.target.value)}
                            required
                            placeholder="소개를 입력해주세요"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="mbti">MBTI</label>
                        <input
                            id="mbti"
                            value={mbti}
                            onChange={(e) => setMbti(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="gender">성별</label>
                        <input
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="age">나이</label>
                        <input
                            id="age"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="height">키</label>
                        <input
                            id="height"
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
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

export default MatchingForm;
