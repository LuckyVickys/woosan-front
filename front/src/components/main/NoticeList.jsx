import React from 'react';
// import { useEffect, useState } from 'react';
// import { getNoticeList } from '../../api/mainApi';

const NoticeList = () => {

    // const initState = {
    //     noticelist:[]
    // }
    // const [noticelistData, setNoticelistData] = useState([]);

    // useEffect(() => {
    //     getNoticelist({ page: 0, size: 6 }).then(data => {
    //         console.log(data)
    //         setNoticelistData(data)
    //     });
    // }, []);

    return (
        <div className='noticelist'>
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
            )} */}
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
            </div>
        </div>
    );
}

export default NoticeList;