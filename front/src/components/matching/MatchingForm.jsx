import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationField from './LocationField';
import styles from '../../assets/styles/matching/MatchingForm.module.scss';
import { useSelector } from 'react-redux';
import { getMember } from '../../api/memberProfileApi';

const MatchingForm = ({ onSubmit, initialValues = {}, matchingType }) => {
    const loginState = useSelector((state) => state.loginSlice);
    const navigate = useNavigate();
    const [title, setTitle] = useState(initialValues.title || '');
    const [content, setContent] = useState(initialValues.content || '');
    const [placeName, setPlaceName] = useState(initialValues.placeName || '');
    const [locationX, setLocationX] = useState((initialValues.locationX || 0).toString());
    const [locationY, setLocationY] = useState((initialValues.locationY || 0).toString());
    const [address, setAddress] = useState(initialValues.address || '');
    const [meetDate, setMeetDate] = useState(initialValues.meetDate || new Date().toISOString().slice(0, 16));
    const [selectedCategory, setSelectedCategory] = useState(matchingType === 3 ? 'romance' : '');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState(matchingType === 3 ? { '셀프소개팅': 'romance' } : {});
    const [headCount, setHeadCount] = useState(initialValues.headCount || (matchingType === 3 ? 99999 : ''));
    const [errors, setErrors] = useState({});
    const [files, setFiles] = useState(initialValues.filePathUrl || []);
    const [deletedFiles, setDeletedFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const uploadRef = useRef();

    const [location, setLocation] = useState(initialValues.location || '');
    const [introduce, setIntroduce] = useState(initialValues.introduce || '');
    const [mbti, setMbti] = useState(initialValues.mbti || '');
    const [gender, setGender] = useState(initialValues.gender || '');
    const [age, setAge] = useState(initialValues.age || '');
    const [height, setHeight] = useState(initialValues.height || '');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getMember(loginState.id);
                setLocation(userData.location || '');
                setIntroduce(userData.introduce || '');
                setMbti(userData.mbti || '');
                setGender(userData.gender === 'male' ? '남성' : '여성');
                setAge(userData.age || '');
                setHeight(userData.height || '');
            } finally {
                setLoading(false);
            }
        };

        if (matchingType === 3 && !initialValues.introduce) {
            fetchUserData();
        } else {
            setLoading(false);
        }
    }, [loginState.id, matchingType, initialValues]);

    useEffect(() => {
        if (initialValues.tag) {
            try {
                setTags(JSON.parse(initialValues.tag));
            } catch (error) {
                console.error("Failed to parse tags:", error);
            }
        }
    }, [initialValues.tag]);

    const categoryLabels = {
        romance: '연애&사랑',
        sports: '운동&스포츠',
        food: '푸드&드링크',
        culture: '문화&예술',
        neighborhood: '동네&또래',
        study_class: '스터디&클래스'
    };

    const validateForm = () => {
        const newErrors = {};
        if (!title) newErrors.title = matchingType === 3 ? '셀소 제목을 입력해주세요' : '모임명을 입력해주세요';
        if (!content) newErrors.content = matchingType === 3 ? '하고싶은말을 입력해주세요' : '모임 소개를 입력해주세요';
        if (!placeName) newErrors.placeName = '모임 장소를 입력해주세요';
        if (!meetDate) newErrors.meetDate = '모임 날짜 / 시간을 입력해주세요';
        if (Object.keys(tags).length === 0) newErrors.tags = '모임 태그를 입력해주세요';
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
        formData.append('memberId', loginState.id);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('placeName', placeName);
        formData.append('locationX', locationX);
        formData.append('locationY', locationY);
        formData.append('address', address);
        formData.append('meetDate', meetDate);
        formData.append('tag', JSON.stringify(tags));
        formData.append('headCount', headCount);

        files.forEach((file) => {
            if (typeof file === 'string') {
                formData.append('existingFiles', file);
            } else {
                formData.append('images', file);
            }
        });

        deletedFiles.forEach((file) => {
            formData.append('deletedFiles', file);
        });

        formData.append('matchingType', matchingType);

        if (matchingType === 3) {
            formData.append('location', location);
            formData.append('introduce', introduce);
            formData.append('mbti', mbti);
            formData.append('gender', gender);
            formData.append('age', age);
            formData.append('height', height);
        }

        await onSubmit(formData, loginState.id);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleInputChange = (setter) => (e) => {
        const { id, value } = e.target;
        if (id === 'tagInput' && value.length > 6) return;
        if (id === 'title' && value.length > 30) return;

        setter(value);
        setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));

        if (id === 'tagInput') {
            if (value.length < 2 || value.length > 6) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    tagInput: '태그는 2글자에서 최대 6글자까지 입력 가능합니다'
                }));
            } else {
                setErrors((prevErrors) => {
                    const { tagInput, ...rest } = prevErrors;
                    return rest;
                });
            }
        } else if (id === 'title') {
            if (value.length < 2 || value.length > 30) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    title: '모임명은 2글자에서 최대 30글자까지 입력 가능합니다'
                }));
            } else {
                setErrors((prevErrors) => {
                    const { title, ...rest } = prevErrors;
                    return rest;
                });
            }
        }
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    };

    const handleRemoveFile = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        if (typeof files[index] === 'string') {
            setDeletedFiles((prev) => [...prev, files[index]]);
        }
        setFiles(newFiles);

        if (uploadRef.current) {
            uploadRef.current.value = '';
        }
    };

    const handleTagSubmit = (e) => {
        e.preventDefault();
        if (!selectedCategory && matchingType !== 3) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                category: '모임 태그를 선택해주세요'
            }));
            return;
        }
        if (tagInput.length >= 2 && tagInput.length <= 6) {
            setTags({ ...tags, [tagInput]: selectedCategory });
            setTagInput('');
            setSelectedCategory('');
            setErrors((prevErrors) => ({
                ...prevErrors,
                tagInput: '',
                category: ''
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                tagInput: '태그는 2글자에서 6글자 사이여야 합니다'
            }));
        }
    };

    const handleTagRemove = (tagToRemove) => {
        setTags((prevTags) => {
            const newTags = { ...prevTags };
            delete newTags[tagToRemove];
            return newTags;
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {matchingType === 3 && (
                <>
                    <div className={styles.inlineFormGroup}>
                        <div className={`${styles.formGroup} ${styles.inline}`}>
                            <label htmlFor="location">지역</label>
                            <input
                                id="location"
                                value={location}
                                onChange={handleInputChange(setLocation)}
                                className="locationInput"
                                placeholder="지역을 입력해주세요 ex)강남구"
                            />
                            {errors.location && <div className={styles.error}>{errors.location}</div>}
                        </div>
                        <div className={`${styles.formGroup} ${styles.inline}`}>
                            <label htmlFor="mbti">MBTI</label>
                            <select
                                id="mbti"
                                value={mbti}
                                onChange={handleInputChange(setMbti)}
                                className="mbtiInput"
                            >
                                <option value="">MBTI를 선택해주세요</option>
                                {Object.values(MBTI).map(mbtiType => (
                                    <option key={mbtiType} value={mbtiType}>{mbtiType}</option>
                                ))}
                            </select>
                            {errors.mbti && <div className={styles.error}>{errors.mbti}</div>}
                        </div>
                    </div>
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
                                placeholder="키를 입력해주세요"
                            />
                            {errors.height && <div className={styles.error}>{errors.height}</div>}
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="introduce">한줄 자기소개</label>
                        <input
                            id="introduce"
                            value={introduce}
                            onChange={handleInputChange(setIntroduce)}
                            placeholder="소개를 입력해주세요 ex) 런닝과 맛집을 좋아합니다"
                        />
                        {errors.introduce && <div className={styles.error}>{errors.introduce}</div>}
                    </div>
                </>
            )}
            <div className={styles.inlineFormGroup}>
                <div className={`${styles.formGroup} ${styles.short}`}>
                    <label htmlFor="category">모임 태그</label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={handleInputChange(setSelectedCategory)}
                        className="categorySelect"
                        disabled={matchingType === 3}
                    >
                        <option value="">모임 태그를 선택하세요</option>
                        <option value="romance">연애&사랑</option>
                        <option value="sports">운동&스포츠</option>
                        <option value="food">푸드&드링크</option>
                        <option value="culture">문화&예술</option>
                        <option value="neighborhood">동네&또래</option>
                        <option value="study_class">스터디&클래스</option>
                    </select>
                    {errors.category && <div className={styles.error}>{errors.category}</div>}
                    <input
                        id="tagInput"
                        value={matchingType === 3 ? '셀프소개팅' : tagInput}
                        onChange={handleInputChange(setTagInput)}
                        className="tagInput"
                        placeholder="상세 태그를 입력해주세요"
                        maxLength="6"
                        disabled={matchingType === 3}
                    />
                    {errors.tagInput && <div className={styles.error}>{errors.tagInput}</div>}
                    <button onClick={handleTagSubmit} className={styles.addButton} disabled={matchingType === 3}>추가</button>
                    <div className={styles.tagContainer}>
                        {Object.keys(tags).map((tag) => (
                            <div key={tag} className={styles.tag}>
                                {categoryLabels[tags[tag]]}: {tag}
                                <button type="button" onClick={() => handleTagRemove(tag)} className={styles.deleteButton} disabled={matchingType === 3}>
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                    {errors.tags && <div className={styles.error}>{errors.tags}</div>}
                </div>
                <div className={`${styles.formGroup} ${styles.short}`}>
                    <label htmlFor="meetDate">모임 날짜 / 시간</label>
                    <input
                        id="meetDate"
                        type="datetime-local"
                        value={meetDate}
                        onChange={handleInputChange(setMeetDate)}
                        className="meetDateInput"
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
                        className="headCountInput"
                        placeholder="인원을 입력하세요"
                    />
                    {errors.headCount && <div className={styles.error}>{errors.headCount}</div>}
                </div>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="title">{matchingType === 3 ? '셀소 제목' : '모임명'}</label>
                <input
                    id="title"
                    value={title}
                    onChange={handleInputChange(setTitle)}
                    className="titleInput"
                    placeholder={matchingType === 3 ? '셀소 제목을 입력해주세요 ex) 한강 데이트 가요' : '모임명을 입력해주세요'}
                    maxLength="30"
                />
                {errors.title && <div className={styles.error}>{errors.title}</div>}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="content">{matchingType === 3 ? '하고싶은말' : '모임 소개'}</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={handleInputChange(setContent)}
                    className="contentInput"
                    placeholder={matchingType === 3 ? '하고싶은말을 입력해주세요' : '모임 소개를 입력해주세요'}
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
                <label htmlFor="fileUpload" className={styles.label}>{matchingType === 3 ? '본인 사진' : '첨부파일'}</label>
                <input
                    id="fileUpload"
                    name="fileUpload"
                    type="file"
                    ref={uploadRef}
                    multiple
                    onChange={handleFileChange}
                    className="fileUploadInput"
                />
                <div className={styles.fileList}>
                    {files.map((file, index) => (
                        <div key={index} className={styles.fileItem}>
                            <span>{file.name || file}</span>
                            <button type="button" onClick={() => handleRemoveFile(index)} className={styles.deleteButton}>
                                삭제
                            </button>
                        </div>
                    ))}
                </div>
            </div>
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
