import React from 'react';
import { useEffect, useState } from 'react';
import { getBest } from '../../api/mainApi';

const LikeList = () => {

    const [best, setBest] = useState([]);

    useEffect(() => {
        getBest().then(data => {
            console.log(data)
            setBest(data)
        });
    }, []);

    return (
        <div className='likelist'>
            {best.map(likeItem => (
                <div key={likeItem.id} className="likelist-post">
                    <div className="likelist-catagory">
                        {likeItem.categoryName}
                    </div>
                    <div className="likelist-title">
                        {likeItem.title}
                    </div>
                    <div className="likelist-like">
                        {likeItem.views}
                    </div>
                </div>
            ))}
            {/* <div className="likelist-post">
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
            </div> */}
        </div>
    );
}

export default LikeList;