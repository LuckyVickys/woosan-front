import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationField from './LocationField';
import styles from '../../assets/styles/matching/MatchingForm.module.scss';
import { useSelector } from 'react-redux';
import { getMember } from '../../api/memberProfileApi'; // 사용자 데이터를 불러오는 API

const MatchingForm = ({ onSubmit, initialValues = {}, matchingType }) => {
    const loginState = useSelector((state) => state.loginSlice); // 로그인된 상태 가져오기
    const navigate = useNavigate();
    const [title, setTitle] = useState(initialValues.title || '');
    const [content, setContent] = useState(initialValues.content || '');
    const [placeName, setPlaceName] = useState(initialValues.placeName || '');
    const [locationX, setLocationX] = useState((initialValues.locationX || 0).toString());
    const [locationY, setLocationY] = useState((initialValues.locationY || 0).toString());
    const [address, setAddress] = useState(initialValues.address || '');
    const [meetDate, setMeetDate] = useState(initialValues.meetDate || new Date().toISOString().slice(0, 16));
    const [selectedCategory, setSelectedCategory] = useState('');
    const [tagInput, setTagInput] = useState(''); // 태그 입력 필드 상태
    const [tags, setTags] = useState({});
    const [headCount, setHeadCount] = useState(initialValues.headCount || '');
    const [errors, setErrors] = useState({});
    const [files, setFiles] = useState(initialValues.filePathUrl || []); // 파일 상태 관리
    const [loading, setLoading] = useState(true);
    const uploadRef = useRef();

    // 셀프 소개팅에 필요한 상태들
    const [location, setLocation] = useState(initialValues.location || '');
    const [introduce, setIntroduce] = useState(initialValues.introduce || '');
    const [mbti, setMbti] = useState(initialValues.mbti || '');
    const [gender, setGender] = useState(initialValues.gender || '');
    const [age, setAge] = useState(initialValues.age || '');
    const [height, setHeight] = useState(initialValues.height || '');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getMember(loginState.id); // 사용자 데이터 불러오기
                setLocation(userData.location || '');
                setIntroduce(userData.introduce || '');
                setMbti(userData.mbti || '');
                setGender(userData.gender || '');
                setAge(userData.age || '');
                setHeight(userData.height || '');
            } catch (error) {
                console.error("Failed to fetch user data:", error);
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

    // 폼 유효성 검사 함수
    const validateForm = () => {
        const newErrors = {};
        if (!title) newErrors.title = '모임명을 입력해주세요';
        if (!content) newErrors.content = '모임 소개를 입력해주세요';
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
        formData.append('memberId', loginState.id); // memberId 추가
        formData.append('title', title);
        formData.append('content', content);
        formData.append('placeName', placeName);
        formData.append('locationX', locationX);
        formData.append('locationY', locationY);
        formData.append('address', address); // address 추가
        formData.append('meetDate', meetDate);
        formData.append('tag', JSON.stringify(tags)); // tags를 JSON 문자열로 변환하여 tag 필드에 저장
        formData.append('headCount', headCount);

        // 파일 처리
        files.forEach((file) => {
            if (typeof file === 'string') {
                formData.append('existingFiles', file);
            } else {
                formData.append('images', file);
            }
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
        setFiles(newFiles);

        // 입력 창 초기화
        if (uploadRef.current) {
            uploadRef.current.value = '';
        }
    };

    const handleTagSubmit = (e) => {
        e.preventDefault();
        if (!selectedCategory) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                category: '모임 태그를 선택해주세요'
            }));
            return;
        }
        if (tagInput.length >= 2 && tagInput.length <= 6) {
            setTags({ [tagInput]: selectedCategory });
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
            {matchingType === 3 ? (
                <>
                    <div className={styles.inlineFormGroup}>
                        <div className={`${styles.formGroup} ${styles.inline}`}>
                            <label htmlFor="location">지역</label>
                            <input
                                id="location"
                                value={location}
                                onChange={handleInputChange(setLocation)}
                                className="locationInput" /* 지역 입력창 */
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
                                className="mbtiInput" /* MBTI 입력창 */
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
                    <div className={styles.inlineFormGroup}>
                        <div className={`${styles.formGroup} ${styles.short}`}>
                            <label htmlFor="category">모임 태그</label>
                            <select
                                id="category"
                                value={selectedCategory}
                                onChange={handleInputChange(setSelectedCategory)}
                                className="categorySelect" /* 모임 태그 선택창 */
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
                                value={tagInput}
                                onChange={handleInputChange(setTagInput)}
                                className="tagInput" /* 태그 입력창 */
                                placeholder="상세 태그를 입력해주세요"
                                maxLength="6"
                            />
                            {errors.tagInput && <div className={styles.error}>{errors.tagInput}</div>}
                            <button onClick={handleTagSubmit} className={styles.addButton}>추가</button>
                            <div className={styles.tagContainer}>
                                {Object.keys(tags).map((tag) => (
                                    <div key={tag} className={styles.tag}>
                                        {categoryLabels[tags[tag]]}: {tag}
                                        <button type="button" onClick={() => handleTagRemove(tag)} className={styles.deleteButton}>
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
                                className="meetDateInput" /* 모임 날짜 입력창 */
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
                                className="headCountInput" /* 모집 인원 입력창 */
                                placeholder="인원을 입력하세요"
                            />
                            {errors.headCount && <div className={styles.error}>{errors.headCount}</div>}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.inlineFormGroup}>
                        <div className={`${styles.formGroup} ${styles.short}`}>
                            <label htmlFor="category">모임 태그</label>
                            <select
                                id="category"
                                value={selectedCategory}
                                onChange={handleInputChange(setSelectedCategory)}
                                className="categorySelect" /* 모임 태그 선택창 */
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
                                value={tagInput}
                                onChange={handleInputChange(setTagInput)}
                                className="tagInput" /* 태그 입력창 */
                                placeholder="상세 태그를 입력해주세요"
                                maxLength="6"
                            />
                            {errors.tagInput && <div className={styles.error}>{errors.tagInput}</div>}
                            <button onClick={handleTagSubmit} className={styles.addButton}>추가</button>
                            <div className={styles.tagContainer}>
                                {Object.keys(tags).map((tag) => (
                                    <div key={tag} className={styles.tag}>
                                        {categoryLabels[tags[tag]]}: {tag}
                                        <button type="button" onClick={() => handleTagRemove(tag)} className={styles.deleteButton}>
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
                                className="meetDateInput" /* 모임 날짜 입력창 */
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
                                className="headCountInput" /* 모집 인원 입력창 */
                                placeholder="인원을 입력하세요"
                            />
                            {errors.headCount && <div className={styles.error}>{errors.headCount}</div>}
                        </div>
                    </div>
                </>
            )}
            <div className={styles.formGroup}>
                <label htmlFor="title">모임명</label>
                <input
                    id="title"
                    value={title}
                    onChange={handleInputChange(setTitle)}
                    className="titleInput" /* 모임명 입력창 */
                    placeholder="모임명을 입력해주세요"
                    maxLength="30"
                />
                {errors.title && <div className={styles.error}>{errors.title}</div>}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="content">모임 소개</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={handleInputChange(setContent)}
                    className="contentInput" /* 모임 소개 입력창 */
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
                    className="fileUploadInput" /* 파일 업로드 입력창 */
                />
                <div className={styles.fileList}>
                    {files.map((file, index) => (
                        <div key={index} className={styles.fileItem}>
                            <span>{file.name || file}</span>
                            <button type="button" onClick={() => handleRemoveFile(index)} className={styles.deleteButton}>
                                X
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
