import React, { useState, useEffect } from 'react';
import { getBannerList, updateBanner } from '../../api/adminApi';

const UploadPage = () => {
    const [banners, setBanners] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const data = await getBannerList();
                console.log("Fetched banners:", data);
                setBanners(data);
            } catch (error) {
                console.error("Error fetching banners:", error);
            }
        };

        fetchBanners();
    }, []);

    const handleFileChange = (event) => {
        setSelectedFiles([...event.target.files]);
    };

    const handleUpload = async () => {
        try {
            const fileUpdateDTO = {
                existFiles: banners, // 현재 배너 목록을 기존 파일 목록으로 설정
                newFiles: selectedFiles // 선택된 파일을 새 파일 목록으로 설정
            };
            const response = await updateBanner(fileUpdateDTO);
            console.log("Update response:", response);

            // 페이지 새로고침
            window.location.reload();
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleRemoveBanner = (index) => {
        setBanners(banners.filter((_, i) => i !== index));
    };

    const handleRemoveFile = (index) => {
        setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    };

    return (
        <div className="upload-page">
            <h2>Upload Files</h2>
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <h2>Selected Files</h2>
            <div>
                {selectedFiles.map((file, index) => (
                    <div key={index}>
                        <img 
                            src={URL.createObjectURL(file)} 
                            alt={`Selected file ${index + 1}`} 
                            style={{ maxWidth: '200px', maxHeight: '200px' }} 
                        />
                        <p>{file.name}</p>
                        <button onClick={() => handleRemoveFile(index)}>X</button>
                    </div>
                ))}
            </div>
            <h2>Banner List</h2>
            <div>
                {banners.map((banner, index) => (
                    <div key={index}>
                        <img 
                            src={banner} 
                            alt={`Banner ${index + 1}`} 
                            style={{ maxWidth: '200px', maxHeight: '200px' }} 
                        />
                        <p>{banner}</p>
                        <button onClick={() => handleRemoveBanner(index)}>X</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadPage;
