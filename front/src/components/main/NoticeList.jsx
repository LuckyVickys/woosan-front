import React from 'react';
import { useEffect, useState } from 'react';
import { getNotices } from '../../api/mainApi';

const initState = {
    noticelist: []
}
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
            {/* {noticelistData.noticelist.map(noticelist =>
                <div className="noticelist-post">
                    <div className="noticelist-catagory">
                        {noticelist.catagory}
                    </div>
                    <div className="noticelist-title">
                        {noticelist.title}
                    </div>
                    <div className="noticelist-like">
                        {noticelist.like}
                    </div>
                </div>
            )} 
            <div className="noticelist-post">
                <div className="noticelist-catagory">공지</div>
                <div className="noticelist-title">[게시판] 글 작성 시 안내사항</div>
                <div className="noticelist-date">2024/6/24</div>
            </div>
            <div className="noticelist-post">
                <div className="noticelist-catagory">공지</div>
                <div className="noticelist-title">[게시판] 글 작성 시 안내사항</div>
                <div className="noticelist-date">2024/6/24</div>
            </div>
            <div className="noticelist-post">
                <div className="noticelist-catagory">공지</div>
                <div className="noticelist-title">[게시판] 글 작성 시 안내사항</div>
                <div className="noticelist-date">2024/6/24</div>
            </div>
            <div className="noticelist-post">
                <div className="noticelist-catagory">공지</div>
                <div className="noticelist-title">[게시판] 글 작성 시 안내사항</div>
                <div className="noticelist-date">2024/6/24</div>
            </div>
            <div className="noticelist-post">
                <div className="noticelist-catagory">공지</div>
                <div className="noticelist-title">[게시판] 글 작성 시 안내사항</div>
                <div className="noticelist-date">2024/6/24</div>
            </div>
            <div className="noticelist-post">
                <div className="noticelist-catagory">공지</div>
                <div className="noticelist-title">[게시판] 글 작성 시 안내사항</div>
                <div className="noticelist-date">2024/6/24</div>
            </div>*/}
        </div>
    );
}

export default NoticeList;