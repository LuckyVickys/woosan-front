import {Link} from "react-router-dom";
import '../../assets/styles/Common.scss';

const Sidebar = ({ pageType }) => {
    return (
        <aside id='sidebar' className="sidebar">
            <div className="catagory">
                {pageType === 'board' && (
                    <>
                        <div className="title">
                            꿀팁
                        </div>
                        <div className="board_boards">
                            <Link to={'/board/'}>전체</Link>
                        </div>
                        <div className="board_restaurants">
                            <Link to={'/board/restaurants/'}>맛집</Link>
                        </div>
                        <div className="board_clean">
                            <Link to={'/board/clean/'}>청소</Link>
                        </div>
                        <div className="board_recipe">
                            <Link to={'/board/recipe/'}>요리</Link>
                        </div>
                        <div className="board_wealth">
                            <Link to={'/board/wealth/'}>재테크</Link>
                        </div>
                        <div className="board_interior">
                            <Link to={'/board/interior/'}>인테리어</Link>
                        </div>
                        <div className="board_policy">
                            <Link to={'/board/policy/'}>정책</Link>
                        </div>
                        <div className="board_etc">
                            <Link to={'/board/etc/'}>기타</Link>
                        </div>
                    </>
                )}
                {pageType === 'matching' && (
                    <>
                        <div className="title">
                            모임
                        </div>
                        <div className="matching_matchings">
                            <Link to={'/matching/'}>전체</Link>
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
                            <Link to={'/cs/'}>공지사항</Link>
                        </div>
                        <div className="cs_event">
                            <Link to={'/cs/event/'}>이벤트</Link>
                        </div>
                     </>
                )}
                {pageType === 'myPage' && (
                    <>
                        <div className="myPage_update">
                            <Link to={'/myPage/'}>회원 정보 수정</Link>
                        </div>
                        <div className="myPage_board">
                            <Link to={'/myPage/board/'}>작성한 게시글 조회</Link>
                        </div>
                        <div className="myPage_reply">
                            <Link to={'/myPage/reply/'}>작성한 댓글 조회</Link>
                        </div>
                        <div className="myPage_like">
                            <Link to={'/myPage/like/'}>추천 게시글</Link>
                        </div>
                        <div className="myPage_matching">
                            <Link to={'/myPage/matching/'}>모임 조회</Link>
                        </div>
                        <div className="myPage_msg">
                            <Link to={'/myPage/msg/'}>쪽지함</Link>
                        </div>
                        <div className="myPage_logout">
                            <Link to={'/myPage/logout/'}>Log out</Link>
                        </div>
                    </>
                )}
            </div>
        </aside>
    )
}

export default Sidebar;