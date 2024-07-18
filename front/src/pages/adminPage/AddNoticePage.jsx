import React from "react";
import AddComponent from "../../components/board/AddComponent";

const AddNoticePage = () => {
    const category = "공지사항";
    return (
        <div className="contents">
            <AddComponent category={category} />
        </div>
    );
};

export default AddNoticePage;
