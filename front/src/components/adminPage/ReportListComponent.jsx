import React, { useEffect, useState } from "react";
import { getReportList } from "../../api/adminApi";
import useCustomReportMove from "../../hooks/useCustomReportMove";
import ReportListPageComponent from "../adminPage/element/ReportListPageComponent";
import ReportTableRowComponent from "../adminPage/element/ReportTableRowComponent";
import "../../assets/styles/App.scss";
import { useSelector } from "react-redux";

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
    const token = useSelector((state) => state.loginSlice.accessToken);

    useEffect(() => {
        getReportList({ page, size }, token)
            .then((data) => {
                setReportData(data);
            })
            .catch((err) => {
                console.error("Failed to fetch data:", err);
            });
    }, [page, size, refresh]);

    const handleReportClick = (id) => {
        moveToRead(id);
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
                                <ReportTableRowComponent
                                    key={item.id}
                                    item={item}
                                    onClick={() => handleReportClick(item.id)}
                                />
                            ))}
                        </tbody>
                    </table>
                    <ReportListPageComponent
                        reportData={reportData}
                        movePage={moveToList}
                    />
                </div>
            ) : (
                <div className="message-not-found">
                    신고가 존재하지 않습니다.
                </div>
            )}
        </>
    );
};

export default ReportListComponent;
