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
            setBest(data)
        });
    }, []);


    const handleRowClick = (id) => {
        navigate(`/board/${id}`);

    };

    return (
        <>
            <div className='likelist'>
                <table>
                    <tbody>
                        {best.map(likeItem => (
                            <TableRowComponent
                                key={likeItem.id}
                                item={likeItem}
                                onClick={handleRowClick}
                                isPopular={true}
                                className="likelist-post"
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default LikeList;

