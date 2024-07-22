import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBest } from '../../api/mainApi';
import TableRowComponent from './element/TableRowComponent';
import "../../assets/styles/App.scss"


const LikeList = () => {
    const [best, setBest] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getBest().then(data => {
            console.log(data)
            setBest(data)
        });
    }, []);


    const slicedTitle = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.slice(0, maxLength) + '...';
        } else {
            return str;
        }
    }

    const handleRowClick = (id) => {
        navigate(`/board/${id}`);

    };

    return (
        <div className='likelist'>
            <table>
                <tbody>
                    {best.map(likeItem => (
                        <TableRowComponent
                            key={likeItem.id}
                            item={likeItem}
                            onClick={handleRowClick}
                            isPopular={true}
                            className="likelist-post" // 추가된 부분
                        />
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default LikeList;


// import React from 'react';
// import { useEffect, useState } from 'react';
// import { getBest } from '../../api/mainApi';

// const LikeList = () => {

//     const [best, setBest] = useState([]);

//     useEffect(() => {
//         getBest().then(data => {
//             console.log(data)
//             setBest(data)
//         });
//     }, []);

//     return (
//         <div className='likelist'>
//             {best.map(likeItem => (
//                 <div key={likeItem.id} className="likelist-post">
//                     <div className="likelist-category">
//                         {likeItem.categoryName}
//                     </div>
//                     <div className="likelist-title">
//                         {likeItem.title}
//                     </div>
//                     <div className="likelist-like">
//                         <div className='likelist-like-icon'></div>
//                         {likeItem.views}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default LikeList;