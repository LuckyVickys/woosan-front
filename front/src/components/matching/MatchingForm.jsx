import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from './FormField';
import LocationField from './LocationField';
import FileUpload from './FileUpload';
import styles from '../../assets/styles/matching/MatchingForm.module.scss';

const MatchingForm = ({ onSubmit, initialValues, matchingType }) => {
    const navigate = useNavigate();

    const [title, setTitle] = useState(initialValues.title || '');
    const [content, setContent] = useState(initialValues.content || '');
    const [placeName, setPlaceName] = useState(initialValues.placeName || '');
    const [locationX, setLocationX] = useState(initialValues.locationX || '');
    const [locationY, setLocationY] = useState(initialValues.locationY || '');
    const [address, setAddress] = useState(initialValues.address || '');
    const [meetDate, setMeetDate] = useState(initialValues.meetDate || '');
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
            matchingType
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

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <FormField id="title" label="모임명" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <FormField id="content" label="모임 소개" value={content} onChange={(e) => setContent(e.target.value)} required />
            <FormField id="placeName" label="장소 이름" value={placeName} onChange={(e) => setPlaceName(e.target.value)} required />
            <FormField id="meetDate" label="모임 날짜 / 시간" type="datetime-local" value={meetDate} onChange={(e) => setMeetDate(e.target.value)} required />
            <FormField id="tag" label="태그" value={tag} onChange={(e) => setTag(e.target.value)} />
            <FormField id="headCount" label="모집 인원" type="number" value={headCount} onChange={(e) => setHeadCount(e.target.value)} required />
            <LocationField address={address} setAddress={setAddress} locationX={locationX} setLocationX={setLocationX} locationY={locationY} setLocationY={setLocationY} />
            <FileUpload files={files} setFiles={setFiles} />
            {matchingType === 3 && (
                <>
                    <FormField id="location" label="위치" value={location} onChange={(e) => setLocation(e.target.value)} required />
                    <FormField id="introduce" label="소개" value={introduce} onChange={(e) => setIntroduce(e.target.value)} required />
                    <FormField id="mbti" label="MBTI" value={mbti} onChange={(e) => setMbti(e.target.value)} />
                    <FormField id="gender" label="성별" value={gender} onChange={(e) => setGender(e.target.value)} />
                    <FormField id="age" label="나이" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                    <FormField id="height" label="키" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
                </>
            )}
            <button type="submit" className={styles.submitButton}>저장</button>
            <button type="button" className={styles.cancelButton} onClick={handleCancel}>취소</button>
        </form>
    );
};

export default MatchingForm;
