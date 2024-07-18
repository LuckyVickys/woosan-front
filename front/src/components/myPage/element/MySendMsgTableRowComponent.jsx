import React from "react";
import MsgTableRowComponent from "./MyMsgTableRowComponent";

const MySendMsgTableRowComponent = ({ item, index, onClick, onDelete }) => (
    <MsgTableRowComponent 
        item={item} 
        index={index} 
        onClick={onClick} 
        onDelete={onDelete} 
        role="send" 
    />
);

export default MySendMsgTableRowComponent;
