import React, { useState } from 'react';
import styles from '../../assets/styles/matching/FileUpload.module.scss';

const FileUpload = ({ files, setFiles }) => {
    const [fileList, setFileList] = useState(files || []);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFileList(selectedFiles);
        setFiles(selectedFiles);
    };

    return (
        <div className={styles.fileUpload}>
            <label htmlFor="fileUpload" className={styles.label}>파일 업로드</label>
            <input
                id="fileUpload"
                className={styles.input}
                type="file"
                multiple
                onChange={handleFileChange}
            />
            <div className={styles.preview}>
                {fileList.map((file, index) => (
                    <div key={index} className={styles.fileItem}>
                        {file.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileUpload;
