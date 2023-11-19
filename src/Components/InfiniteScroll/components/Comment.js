import React, { useEffect } from "react";
import "./Comment.css";
import styled from "./Comment.module.css";
import { useState } from "react";
import PhotoModal from "../../UI/PhotoModal";

export default function Comment({ mesureRef, comment, commentType }) {
  const [imgUrl, setImgUrl] = useState(comment.image);
  const [classType, setClassType] = useState(commentType);
  const [modal, setModal] = useState(false);
  const [top, setTop] = useState(100);

  const modalState = () => {
    setModal(!modal);
  }

  return (
    <div className="eachRandomPhoto">
      {modal ? <PhotoModal modalState = {modalState} imgUrl={comment.image}/> : null}
      <img loading="lazy" className={classType} ref={mesureRef} src={comment.image} onClick={modalState}></img>
    </div>
  );
}
