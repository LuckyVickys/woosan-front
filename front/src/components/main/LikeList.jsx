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
                    <div className="likelist-category">
                        {likeItem.categoryName}
                    </div>
                    <div className="likelist-title">
                        {likeItem.title}
                    </div>
                    <div className="likelist-like">
                        <div className='likelist-like-icon'></div>
                        {likeItem.views}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default LikeList;