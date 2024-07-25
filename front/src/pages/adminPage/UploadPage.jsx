import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getBannerList, updateBanner } from "../../api/adminApi";
import "../../assets/styles/uploadBanner.scss";

const UploadPage = () => {
    const [banners, setBanners] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const token = useSelector((state) => state.loginSlice.accessToken);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const data = await getBannerList();
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
                existFiles: banners,
                newFiles: selectedFiles,
            };
            const response = await updateBanner(fileUpdateDTO, token);
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
        <div className="upload-banner">
            <h2>업로드</h2>
            <div className="upload-box">
                <input type="file" multiple onChange={handleFileChange} />
                <button className="upload-button" onClick={handleUpload}>
                    업로드
                </button>
            </div>
            <div className="file-list">
                {selectedFiles.map((file, index) => (
                    <div key={index} className="file-item">
                        <img
                            src={URL.createObjectURL(file)}
                            alt={`Selected file ${index + 1}`}
                            className="file-image"
                        />
                        <p className="file-name">{file.name}</p>
                        <button
                            className="remove-button"
                            onClick={() => handleRemoveFile(index)}
                        >
                            취소
                        </button>
                    </div>
                ))}
            </div>
            <div className="horizonLine"></div>
            <h2>전체 배너</h2>
            <div className="banner-list">
                {banners.map((banner, index) => (
                    <div key={index} className="banner-item">
                        <img
                            src={banner}
                            alt={`Banner ${index + 1}`}
                            className="banner-image"
                        />
                        <p className="banner-name">{banner}</p>
                        <button
                            className="banner-remove-button"
                            onClick={() => handleRemoveBanner(index)}
                        >
                            삭제
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadPage;
