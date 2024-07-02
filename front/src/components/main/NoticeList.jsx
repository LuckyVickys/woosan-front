import React from 'react';
import { useEffect, useState } from 'react';
import { getNotices } from '../../api/mainApi';

const NoticeList = () => {

    const [notices, setNotices] = useState([]);

    useEffect(() => {
        getNotices().then(data => {
            console.log(data)
            setNotices(data)
        });
    }, []);

    return (
        <div className='noticelist'>
            {notices.map(notice => (
                <div key={notice.id} className="noticelist-post">
                    <div className="noticelist-catagory">{notice.categoryName}</div>
                    <div className="noticelist-title">{notice.title}</div>
                    <div className="noticelist-date">{new Date(notice.regDate).toLocaleDateString()}</div>
                </div>
            ))}
        </div>
    );
}

export default NoticeList;