import React, { useEffect, useState } from 'react';
import "../../assets/styles/App.scss"
import { useNavigate } from 'react-router-dom';
import { getNotices } from '../../api/mainApi';
import TableRowComponent from './element/TableRowComponent';

const NoticeList = () => {
    const [notices, setNotices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getNotices().then(data => {
            setNotices(data)
        });
    }, []);



    const handleRowClick = (id) => {
        navigate(`/board/${id}`);

    };

    return (
        <div className='noticelist'>


            <table>
                <tbody>
                    {notices.map(notice => (
                        <TableRowComponent
                            key={notice.id}
                            item={notice}
                            onClick={handleRowClick}
                            isNotice={true}
                            className="noticelist-post" // 추가된 부분
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NoticeList;
