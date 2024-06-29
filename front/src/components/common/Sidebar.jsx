import {NavLink} from "react-router-dom";
import '../../assets/styles/Common.scss';

const SideBar = ({ pageType }) => {
    return (
        <aside id='sidebar' className="sidebar">
            <div className="catagory">
                {pageType === 'board' && (
                    <>
                        <div className="catagory-title">
                            꿀팁
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/board/total'} activeClassName="active">전체</NavLink>
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/board/restaurants/'} activeClassName="active">맛집</NavLink>
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/board/clean/'} activeClassName="active">청소</NavLink>
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/board/recipe/'} activeClassName="active">요리</NavLink>
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/board/wealth/'} activeClassName="active">재테크</NavLink>
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/board/interior/'} activeClassName="active">인테리어</NavLink>
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/board/policy/'} activeClassName="active">정책</NavLink>
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/board/etc/'} activeClassName="active">기타</NavLink>
                        </div>
                    </>
                )}
                {pageType === 'matching' && (
                    <>
                        <div className="catagory-title">
                            모임
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/matching/total'} activeClassName="active">전체</NavLink>
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/matching/regularly/'} activeClassName="active">정기 모임</NavLink>
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/matching/temporary/'} activeClassName="active">번개</NavLink>
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/matching/self/'} activeClassName="active">셀프 소개팅</NavLink>
                        </div>
                    </>
                )}
                {pageType === 'cs' && (
                    <>
                        <div className="catagory-title">
                            고객 지원
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/cs/notices'} activeClassName="active">공지사항</NavLink>
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/cs/event/'} activeClassName="active">이벤트</NavLink>
                        </div>
                     </>
                )}
                {pageType === 'myPage' && (
                    <>
                        <div className="catagory-title">
                            마이페이지
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/myPage/info'} activeClassName="active">회원 정보 수정</NavLink>
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/myPage/board/'} activeClassName="active">작성한 게시글 조회</NavLink>
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/myPage/reply/'} activeClassName="active">작성한 댓글 조회</NavLink>
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/myPage/like/'} activeClassName="active">추천 게시글</NavLink>
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/myPage/matching/'} activeClassName="active">모임 조회</NavLink>
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/myPage/msg/'} activeClassName="active">쪽지함</NavLink>
                        </div>
                        <div className="sub-category">
                            <NavLink to={'/myPage/logout/'}>Log out</NavLink>
                        </div>
                    </>
                )}
            </div>
        </aside>
    )
}

export default SideBar;