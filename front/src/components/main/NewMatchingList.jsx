
import React from 'react';
import { useEffect, useState } from 'react';
import { getNewMatching } from '../../api/mainApi';

const NewMatchingList = () => {

    // 모임 API 부분 주석 처리
    // const [newMatching, setNewMatching] = useState([]);

    // useEffect(() => {
    //     getNewMatching().then(data => {
    //         console.log(data)
    //         setNewMatching(data)
    //     });
    // }, []);

    return (
        <div className='newMatchingList'>
                {/*{newMatching.map(matchingItem => (
                    <div key={matchingItem.id} className="newMatchingList-post">
                        <div className="newMatchingList-img"></div>
                        <div className="newMatchingList-contents">
                            <div className='newMatchingList-catagory-tag'>
                                <div className="newMatchingList-catagory">
                                    {matchingItem.categoryName}
                                </div>
                                <div className="newMatchingList-tag">
                                    {matchingItem.tag}
                                </div>
                            </div>
                            <div className="newMatchingList-title">
                                {matchingItem.title}
                            </div>
                            <div className='newMatchingList-location'>
                                <div className='newMatchingList-location-icon'></div>
                                <div className='newMatchingList-location-text'>
                                    {matchingItem.title}
                                </div>
                            </div>
                            <div className='newMatchingList-date'>
                                <div className='newMatchingList-date-icon'></div>
                                <div className='newMatchingList-date-text'>
                                    {matchingItem.date}
                                </div>
                            </div>
                            <div className='newMatchingList-nickname-matching'>
                                <div className='newMatchingList-nickname'>
                                    <div className='newMatchingList-nickname-icon'></div>
                                    <div className='newMatchingList-nickname-text'>
                                        {matchingItem.nickname}
                                    </div>
                                </div>
                                <div className='newMatchingList-matching'>
                                    <div className='newMatchingList-matching-icon'></div>
                                    <div className='newMatchingList-matching-text'>
                                        {matchingItem.count}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}*/}
            <div className="newMatchingList-post">
                <div className="newMatchingList-img"></div>
                <div className="newMatchingList-contents">
                    <div className='newMatchingList-catagory-tag'>
                        <div className="newMatchingList-regurlary">정기 모임</div>
                        <div className="newMatchingList-tag">골프</div>
                    </div>
                    <div className="newMatchingList-title">⛳ 마곡 골프 모임 ⛳ 초보 환영</div>
                    <div className='newMatchingList-location'>
                        <div className='newMatchingList-location-icon'></div>
                        <div className='newMatchingList-location-text'>서울특별시 강서구</div>
                    </div>
                    <div className='newMatchingList-date'>
                        <div className='newMatchingList-date-icon'></div>
                        <div className='newMatchingList-date-text'>06/25 11:00</div>
                    </div>
                    <div className='newMatchingList-nickname-matching'>
                        <div className='newMatchingList-nickname'>
                            <div className='newMatchingList-nickname-icon'></div>
                            <div className='newMatchingList-nickname-text'>골프왕김골프</div>
                        </div>
                        <div className='newMatchingList-matching'>
                            <div className='newMatchingList-matching-icon'></div>
                            <div className='newMatchingList-matching-text'>
                                <span>3</span>
                                <span>/</span>
                                <span>7</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="newMatchingList-post">
                <div className="newMatchingList-img"></div>
                <div className="newMatchingList-contents">
                    <div className='newMatchingList-catagory-tag'>
                        <div className="newMatchingList-temporary">번개</div>
                        <div className="newMatchingList-tag">맥주</div>
                    </div>
                    <div className="newMatchingList-title">🍺 20대 강남역 맥주 벙 🤪</div>
                    <div className='newMatchingList-location'>
                        <div className='newMatchingList-location-icon'></div>
                        <div className='newMatchingList-location-text'>서울특별시 강남구</div>
                    </div>
                    <div className='newMatchingList-date'>
                        <div className='newMatchingList-date-icon'></div>
                        <div className='newMatchingList-date-text'>06/27 20:00</div>
                    </div>
                    <div className='newMatchingList-nickname-matching'>
                        <div className='newMatchingList-nickname'>
                            <div className='newMatchingList-nickname-icon'></div>
                            <div className='newMatchingList-nickname-text'>술고래</div>
                        </div>
                        <div className='newMatchingList-matching'>
                            <div className='newMatchingList-matching-icon'></div>
                            <div className='newMatchingList-matching-text'>
                                <span>3</span>
                                <span>/</span>
                                <span>7</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default NewMatchingList;