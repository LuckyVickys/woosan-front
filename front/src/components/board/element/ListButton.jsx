import React from "react";
import "../../../assets/styles/App.scss";

import useCustomMove from "../../../hooks/useCustomMove";

const ListButton = ({ serverData }) => {

    const { moveToList } = useCustomMove();


    return (
        <div className="movePostButton">
            <button className="listButton" onClick={() => moveToList()}>
                목록으로
            </button>
        </div>
    );
};

export default ListButton;
