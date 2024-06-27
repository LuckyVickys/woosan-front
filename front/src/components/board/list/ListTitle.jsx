// BasidLayout의 area에서 sidebar를 제외한 콘텐츠 영역의 헤더
import React from 'react';
import '../../../assets/styles/Board.scss';


const ListTitle = ({ main, sub, info }) => {
    return (
        <div className="listTitle">
          <div className="catagory-main-sub">
            <h1>{main}</h1>
            <div className="category-arrow"></div>
            {sub && <h1>{sub}</h1>}
          </div>
          <div className='catagory-info'>{info}</div>
        </div>
    );
}

export default ListTitle;