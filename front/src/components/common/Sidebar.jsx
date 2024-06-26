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
                        <div className="board-boards">
                            <Link to={'/board/'}>전체</Link>
                        </div>
                        <div className="board-restaurants">
                            <Link to={'/board/restaurants/'}>맛집</Link>
                        </div>
                        <div className="board-clean">
                            <Link to={'/board/clean/'}>청소</Link>
                        </div>
                        <div className="board-recipe">
                            <Link to={'/board/recipe/'}>요리</Link>
                        </div>
                        <div className="board-wealth">
                            <Link to={'/board/wealth/'}>재테크</Link>
                        </div>
                        <div className="board-interior">
                            <Link to={'/board/interior/'}>인테리어</Link>
                        </div>
                        <div className="board-policy">
                            <Link to={'/board/policy/'}>정책</Link>
                        </div>
                        <div className="board-etc">
                            <Link to={'/board/etc/'}>기타</Link>
                        </div>
                    </>
                )}
                {pageType === 'matching' && (
                    <>
                        <div className="title">
                            모임
                        </div>
                        <div className="matching-matchings">
                            <Link to={'/matching/'}>전체</Link>
                        </div>
                        <div className="matching-regulary">
                            <Link to={'/matching/regulary/'}>정기 모임</Link>
                        </div>
                        <div className="matching-temporary">
                            <Link to={'/matching/temporary/'}>번개</Link>
                        </div>
                        <div className="matching-self">
                            <Link to={'/matching/self/'}>셀프 소개팅</Link>
                        </div>
                    </>
                )}
                {pageType === 'cs' && (
                    <>
                        <div className="cs-notices">
                            <Link to={'/cs/'}>공지사항</Link>
                        </div>
                        <div className="cs-event">
                            <Link to={'/cs/event/'}>이벤트</Link>
                        </div>
                     </>
                )}
                {pageType === 'myPage' && (
                    <>
                        <div className="myPage-update">
                            <Link to={'/myPage/'}>회원 정보 수정</Link>
                        </div>
                        <div className="myPage-board">
                            <Link to={'/myPage/board/'}>작성한 게시글 조회</Link>
                        </div>
                        <div className="myPage-reply">
                            <Link to={'/myPage/reply/'}>작성한 댓글 조회</Link>
                        </div>
                        <div className="myPage-like">
                            <Link to={'/myPage/like/'}>추천 게시글</Link>
                        </div>
                        <div className="myPage-matching">
                            <Link to={'/myPage/matching/'}>모임 조회</Link>
                        </div>
                        <div className="myPage-msg">
                            <Link to={'/myPage/msg/'}>쪽지함</Link>
                        </div>
                        <div className="myPage-logout">
                            <Link to={'/myPage/logout/'}>Log out</Link>
                        </div>
                    </>
                )}
            </div>
        </aside>
    )
}

export default Sidebar;