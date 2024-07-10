import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../assets/styles/matching/FileUpload.module.scss';

const FileUpload = ({ files, setFiles }) => {
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles([...files, ...selectedFiles]);
    };

    const handleRemoveFile = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
    };

    return (
        <div className={styles.formGroup}>
            <label htmlFor="fileUpload">첨부파일</label>
            <input
                id="fileUpload"
                name="fileUpload"
                type="file"
                multiple
                onChange={handleFileChange}
            />
            <button type="button" className={styles.uploadButton}>업로드</button>
            <div className={styles.fileList}>
                {files.map((file, index) => (
                    <div key={index} className={styles.fileItem}>
                        <span>{file.name}</span>
                        <button type="button" onClick={() => handleRemoveFile(index)}>삭제</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

FileUpload.propTypes = {
    files: PropTypes.arrayOf(PropTypes.object).isRequired,
    setFiles: PropTypes.func.isRequired,
};

export default FileUpload;
