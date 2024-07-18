import React from "react";
import AddComponent from "../../components/board/AddComponent";

const AddNoticePage = () => {
    const category = "공지사항";
    const titleBarText = "공지사항 작성";
    return (
        <div className="contents">
            <AddComponent titleBarText={titleBarText} category={category} />
        </div>
    );
};

export default AddNoticePage;
