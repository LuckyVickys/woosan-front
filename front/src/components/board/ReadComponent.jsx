import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import likeNoIcon from "../../assets/image/heart_no.svg"; // Ensure you have the correct path for the likeNoIcon
import likeIcon from "../../assets/image/heart_yes.svg";
import '../../assets/styles/App.scss';
import { getOne } from "../../api/boardApi";
import useCustomMove from "../../hooks/useCustomMove.jsx";

const initState = {
  id: 0,
  writerId: 0,
  nickname: '',
  title: '',
  content: '',
  regDate: '',
  views: 0,
  likesCount: 0,
  categoryName: '',
  images: null,
  filePathUrl: []
};
const ReadComponent = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(initState);
  const { moveToList, moveToModify } = useCustomMove();

  useEffect(() => {
    getOne(id).then(data => {
      console.log(data);
      setBoard(data);
    });
  }, [id]);
  if (!board) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1 className="post-title">민물고기 데리야끼 레시피</h1>
      <br />
      <div className="header">
        <div className="left">
          <img
            src="https://kr.object.ncloudstorage.com/woosan/board/83435d0d-3965-4448-9a76-272efc3b370e_karina.png"
            alt="프로필"
            className="profile-image"
          />
          <div className="author-info">
            <p className="post-author">
              <strong>작성자 :</strong> 관리자 &nbsp;{" "}
            </p>
            <p className="post-stats">
              조회수 1333 | 댓글 5 | 2024-06-13 14:16
            </p>
          </div>
        </div>
        <div className="right">
          <button className="like-button">
            <span role="img" aria-label="like">
              <img src={likeNoIcon} alt="likeIcon" />
            </span>{" "}
            50
          </button>
          <button className="menu-button">⋮</button>
        </div>
      </div>
      <p className="alert-message">
        ※ 상대방을 향한 욕설과 비난은 게시판 이용에 있어서 불이익을 받을 수 있습니다.
      </p>

      <div className="post-content">
        <div>
          <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <pre>{JSON.stringify(board, null, 2)}</pre>``
            <div className="flex justify-end p-4">
              <button type="button"
                className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                onClick={() => moveToList()}
              >
                List
              </button>
              <button type="button"
                className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                onClick={() => moveToModify(id)}
              >
                Modify
              </button>
            </div>
          </div>
        </div>

        <p>
          완성된 민물고기 데리야끼는 접시에 예쁘게 담아내고, 남은 소스를 고기 위에 골고루 뿌려줍니다. 따뜻한 밥과 함께 즐기세요!
        </p>
        <div className="image-container">
          <img
            src="https://kr.object.ncloudstorage.com/woosan/board/ade21a4f-0f07-44b1-81cd-d5fefa432217_%EB%AF%BC%EC%A7%80.png"
            alt="민물고기 데리야끼 1"
            className="image"
          />
          <img
            src="https://kr.object.ncloudstorage.com/woosan/board/fd68c7d6-a214-45cc-b60c-7a91958b75c3_%EB%AF%BC%EC%A7%80.png"
            alt="민물고기 데리야끼 2"
            className="image"
          />
          <img
            src="https://kr.object.ncloudstorage.com/woosan/board/fd68c7d6-a214-45cc-b60c-7a91958b75c3_%EB%AF%BC%EC%A7%80.png"
            alt="민물고기 데리야끼 3"
            className="image"
          />
        </div>
      </div>
    </>
  );
};



export default ReadComponent;
