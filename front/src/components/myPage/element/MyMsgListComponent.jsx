// MessageListComponent.jsx
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ListPageComponent from "../../board/element/ListPageComponent";
import "../../../assets/styles/App.scss";
import { formatDate } from "../../../util/DateUtil";
import { MdDeleteForever } from "react-icons/md";

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: {
        page: 0,
        size: 10
    },
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0,
};

const MessageListComponent = ({ fetchMessages, deleteMessage, moveToRead, columnHeaders, role }) => {
    const [msgData, setMsgData] = useState(initState);

    useEffect(() => {
        const currentPage = msgData.pageRequestDTO.page || 1;
        const currentSize = msgData.pageRequestDTO.size || 10;
        fetchMessages({ page: currentPage, size: currentSize }).then(data => {
            setMsgData(data);
        }).catch(err => {
            console.error("Failed to fetch data: ", err);
        });
    }, [fetchMessages, msgData.pageRequestDTO.page, msgData.pageRequestDTO.size]);

    const handleMsgClick = (id) => {
        moveToRead(id, "/myPage/message");
    };

    const handleDeleteMsg = (id) => {
        Swal.fire({
            title: '쪽지를 삭제하시겠습니까?',
            icon: "warning",
            text: '삭제한 쪽지는 복구할 수 없습니다.',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then((result) => {
            if(result.isConfirmed) {
                deleteMessage(id).then(() => {
                    Swal.fire({
                        title: '삭제가 완료되었습니다.',
                        icon: "success",
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: '확인',
                    });
                    setMsgData((prevData) => ({
                        ...prevData,
                        dtoList: prevData.dtoList.filter((msg) => msg.id !== id)
                    }));
                }).catch(err => {
                    Swal.fire({
                        title: '삭제 실패',
                        icon: 'error',
                        text: '잠시 후 다시 시도해주세요.'
                    });
                });
            }
        });
    };

    const { dtoList, pageNumList, pageRequestDTO, prev, next, totalCount, prevPage, nextPage, totalPage, current } = msgData;

    return (
        <>
            {dtoList.length > 0 ?
            <div className="list-component">
                <table className="list-table">
                    <thead>
                        <tr>
                            {columnHeaders.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dtoList && dtoList.map((item, index) => (
                            <tr key={item.id} className="board-row" onClick={() => handleMsgClick(item.id)}>
                                <td>{index + 1}</td>
                                <td>{role === 'receive' ? item.senderNickname : item.receiverNickname}</td>
                                <td>{item.content}</td>
                                <td>{formatDate(item.regDate)}</td>
                                <td onClick={(e) => { e.stopPropagation(); handleDeleteMsg(item.id); }}><MdDeleteForever /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ListPageComponent
                    serverData={{ dtoList, pageNumList, pageRequestDTO, prev, next, totalCount, prevPage, nextPage, totalPage, current }}
                    movePage={(page) => setMsgData({ ...msgData, pageRequestDTO: { ...msgData.pageRequestDTO, page } })}
                />
            </div>
            :
            <div className="message-not-found">쪽지가 존재하지 않습니다.</div>
            }
        </>
    );
};

export default MessageListComponent;
