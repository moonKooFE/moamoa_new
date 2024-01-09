import React, { useEffect } from "react";
import "./Comment.css";
import { useState } from "react";
import PhotoModal from "../../UI/PhotoModal";
import client from "../../../Client";

export default function Comment({ mesureRef, comment, commentType }) {
  const [imgUrl, setImgUrl] = useState(comment.image);
  const [classType, setClassType] = useState(commentType);
  const [modal, setModal] = useState(false);
  const [top, setTop] = useState(100);

  const modalState = () => {
    setModal(!modal);
  }

  const clickPhoto = () => { // 사진을 클릭할 때 서버에 get 요청하여 조회수 집계
    setModal(!modal);
    if(classType == "ROLE_ADMIN" || classType == "ROLE_USER"){
      client.get("/poses/" + comment.id).then(function(response){
        console.log(response);
      }).catch(function(error){
        console.log(error);
      })
    }
  }

  return (
    <div className="eachRandomPhoto">
      {modal ? <PhotoModal modalState = {modalState} imgUrl={comment.image}/> : null}
      <img loading="lazy" className={classType} ref={mesureRef} src={comment.image} onClick={clickPhoto}></img>
    </div>
  );
}
