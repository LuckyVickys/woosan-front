import React, { useEffect, useState } from "react";
import { getReportList } from "../../api/adminApi";
import useCustomReportMove from "../../hooks/useCustomReportMove";
import ListPageComponent from "../adminPage/element/ListPageComponent";
import TableRowComponent from "../adminPage/element/TableRowComponent";
import "../../assets/styles/App.scss";

const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: {
        page: 0,
        size: 10,
    },
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0,
};

const ReportListComponent = () => {
    const { page, size, moveToList, moveToRead, refresh } =
        useCustomReportMove();
    const [reportData, setReportData] = useState(initState);

    useEffect(() => {
        getReportList({ page, size })
            .then((data) => {
                console.log("Fetched data:", data);
                setReportData(data);
            })
            .catch((err) => {
                console.error("Failed to fetch data:", err);
            });
    }, [page, size, refresh]);

    const handleReportClick = (id) => {
        moveToRead(id);
        console.log("HandleRowClick:", reportData);
    };

    return (
        <>
            {reportData.dtoList.length > 0 ? (
                <div className="list-component">
                    <table className="list-table">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>신고 유형</th>
                                <th>신고 사유</th>
                                <th>신고자</th>
                                <th>신고 날짜</th>
                                <th>처리 여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.dtoList.map((item) => (
                                <TableRowComponent
                                    key={item.id}
                                    item={item}
                                    onClick={() => handleReportClick(item.id)}
                                />
                            ))}
                        </tbody>
                    </table>
                    <ListPageComponent
                        reportData={reportData}
                        movePage={moveToList}
                    />
                </div>
            ) : (
                <div className="report-not-found">
                    신고가 존재하지 않습니다.
                </div>
            )}
        </>
    );
};

export default ReportListComponent;
