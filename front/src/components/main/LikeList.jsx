import React from 'react';
// import { useEffect, useState } from 'react';
// import { getLikeList } from '../../api/mainApi';

const LikeList = () => {

    // const initState = {
    //     likeList:[]
    // }
    // const [likeListData, setLikeListData] = useState([]);

    // useEffect(() => {
    //     getLikeList({ page: 0, size: 8 }).then(data => {
    //         console.log(data)
    //         setLikeListData(data)
    //     });
    // }, []);

    return (
        <div className='likelist'>
            {/* {likeListData.likeList.map(likeList =>
                <div className="likelist-post">
                    <div className="likelist-catagory">
                        {likeList.catagory}
                    </div>
                    <div className="likelist-title">
                        {likeList.title}
                    </div>
                    <div className="likelist-like">
                        {likeList.like}
                    </div>
                </div>
            )} */}
            <div className="likelist-post">
                <div className="likelist-catagory">요리</div>
                <div className="likelist-title">민물고기 뫼니에르 레시피</div>
                <div className="likelist-like">
                    <div className='likelist-like-icon'></div>
                    <div className='likelist-like-count'>134</div>
                </div>
            </div>
            <div className="likelist-post">
                <div className="likelist-catagory">요리</div>
                <div className="likelist-title">민물고기 뫼니에르 레시피</div>
                <div className="likelist-like">
                    <div className='likelist-like-icon'></div>
                    <div className='likelist-like-count'>134</div>
                </div>
            </div>
            <div className="likelist-post">
                <div className="likelist-catagory">요리</div>
                <div className="likelist-title">민물고기 뫼니에르 레시피</div>
                <div className="likelist-like">
                    <div className='likelist-like-icon'></div>
                    <div className='likelist-like-count'>134</div>
                </div>
            </div>
            <div className="likelist-post">
                <div className="likelist-catagory">요리</div>
                <div className="likelist-title">민물고기 뫼니에르 레시피</div>
                <div className="likelist-like">
                    <div className='likelist-like-icon'></div>
                    <div className='likelist-like-count'>134</div>
                </div>
            </div>
            <div className="likelist-post">
                <div className="likelist-catagory">요리</div>
                <div className="likelist-title">민물고기 뫼니에르 레시피</div>
                <div className="likelist-like">
                    <div className='likelist-like-icon'></div>
                    <div className='likelist-like-count'>134</div>
                </div>
            </div>
            <div className="likelist-post">
                <div className="likelist-catagory">요리</div>
                <div className="likelist-title">민물고기 뫼니에르 레시피</div>
                <div className="likelist-like">
                    <div className='likelist-like-icon'></div>
                    <div className='likelist-like-count'>134</div>
                </div>
            </div>
            <div className="likelist-post">
                <div className="likelist-catagory">요리</div>
                <div className="likelist-title">민물고기 뫼니에르 레시피</div>
                <div className="likelist-like">
                    <div className='likelist-like-icon'></div>
                    <div className='likelist-like-count'>134</div>
                </div>
            </div>
            <div className="likelist-post">
                <div className="likelist-catagory">요리</div>
                <div className="likelist-title">민물고기 뫼니에르 레시피</div>
                <div className="likelist-like">
                    <div className='likelist-like-icon'></div>
                    <div className='likelist-like-count'>134</div>
                </div>
            </div>
        </div>
    );
}

export default LikeList;