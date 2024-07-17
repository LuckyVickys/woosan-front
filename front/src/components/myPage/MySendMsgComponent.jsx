import React, { useEffect, useState } from "react";
import "../../assets/styles/App.scss";
import useCustomMsgMove from "../../hooks/useCustomMsgMove";
import { useSelector } from "react-redux";
import { getSendMessage } from "../../api/myPageApi";
import MySendMsgTableRowComponent from "./element/MySendMsgTableRowComponent";
import ListPageComponent from "./element/ListPageComponent";

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

const MySendMsgComponent = () => {
    const loginState = useSelector((state) => state.loginSlice);
    const {page, size, moveToList, moveToRead, refresh} = useCustomMsgMove("/myPage/msg/send");
    const [msgData, setMsgData] = useState(initState);

    useEffect(() => {
        const currentPage = page || 1;
        const currentSize = size || 10;
        console.log(`Fetching data with page: ${currentPage}, size: ${currentSize}`);
        const params = {
            memberId: loginState.id,
            pageRequestDTO: {
                page: currentPage,
                size: currentSize
            }
        };
        getSendMessage(params).then(data => {
            console.log("Fetch data: ", data);
            setMsgData(data);
        }).catch(err => {
            console.error("Failed to fetch data: ", err);
        });
    }, [page, size, refresh]);

    const handleMsgClick = (id) => {
        console.log("HandleMsgClick:", id);
        moveToRead(id, "/myPage/message");
    };

    const handleMsgDelete = (id) => {
        console.log("HandleMsgDelete:", id);
    };

    const {dtoList, pageNumList, pageRequestDTO, prev, next, totalCount, prevPage, nextPage, totalPage, current} = msgData;

    return (
    <>
        {dtoList.length > 0 ?
        <div className="list-component">
            <table className="list-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>수신자</th>
                        <th>내용</th>
                        <th>작성 날짜</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {dtoList && dtoList.map((item, index) => (
                        <MySendMsgTableRowComponent
                            key={item.id}
                            item={item}
                            index={index}
                            onClick={() => handleMsgClick(item.id)}
                        />
                    ))}
                </tbody>
            </table>
            <ListPageComponent
                serverData={{ dtoList, pageNumList, pageRequestDTO, prev, next, totalCount, prevPage, nextPage, totalPage, current }}
                movePage={(page) => moveToList({ page })}
            />
        </div>
        :
        <div className="message-not-found">보낸 쪽지가 존재하지 않습니다.</div>
        }
    </>
    );
};

export default MySendMsgComponent;