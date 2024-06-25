import {Link} from "react-router-dom";
import '../../assets/styles/Common.scss';

const Sidebar = ({ pageType }) => {
    return (
        <aside id='sidebar' className="sidebar">
            <div className="catagory">
                {pageType === 'board' && (
                    <>
                        <div className="board_total">
                            <Link to={'/board/total/'}>전체</Link>
                        </div>
                        <div className="board_recipe">
                            <Link to={'/board/recipe/'}>요리</Link>
                        </div>
                        <div className="board_rest">
                            <Link to={'/board/restaurants/'}>맛집</Link>
                        </div>
                        <div className="board_clean">
                            <Link to={'/board/clean/'}>청소</Link>
                        </div>
                    </>
                )}
                {pageType === 'matching' && (
                    <>
                        <div className="matching_total">
                            <Link to={'/matching/total/'}>전체</Link>
                        </div>
                        <div className="matching_regulary">
                            <Link to={'/matching/regulary/'}>정기 모임</Link>
                        </div>
                        <div className="matching_temporary">
                            <Link to={'/matching/temporary/'}>번개</Link>
                        </div>
                        <div className="matching_self">
                            <Link to={'/matching/self/'}>셀프 소개팅</Link>
                        </div>
                    </>
                )}
                {pageType === 'cs' && (
                    <>
                        <div className="cs_notices">
                            <Link to={'/cs/notices/'}>공지사항</Link>
                        </div>
                        <div className="cs_event">
                            <Link to={'/cs/event/'}>이벤트</Link>
                        </div>
                     </>
                )}
                {pageType === 'myPage' && (
                    <>
                        <div className="myPage_update">
                            <Link to={'/myPage/update/'}>회원정보 변경</Link>
                        </div>
                        <div className="myPage_board">
                            <Link to={'/myPage/board/'}>작성한 게시글 조회</Link>
                        </div>
                    </>
                )}
            </div>
        </aside>
    )
}

export default Sidebar;