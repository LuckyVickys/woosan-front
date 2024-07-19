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

    const slicedTitle = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.slice(0, maxLength) + '...';
        } else {
            return str;
        }
    };

    return (
        <div className='noticelist'>
            {notices.map(notice => (
                <div key={notice.id} className="noticelist-post">
                    <div className="noticelist-category">{notice.categoryName}</div>
                    <div className="noticelist-title">{slicedTitle(notice.title, 15)}</div>
                    <div className="noticelist-date">{new Date(notice.regDate).toLocaleDateString()}</div>
                </div>
            ))}
        </div>
    );
}

export default NoticeList;