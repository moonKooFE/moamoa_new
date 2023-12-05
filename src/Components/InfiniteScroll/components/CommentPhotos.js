import React from "react";
import styles from "./CommentPhotos.module.css";
import modalstyles from "./modalStyle.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../../Client";
import trashCan from "../../../Assets/Trash.png";

export default function Comment({ mesureRef, comment, commentType, albumId }) {
  const [imgUrl, setImgUrl] = useState(comment.image);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const modalState = () => {
    setModal(!modal);
  }

  // const openAlbum = () => {
  //   navigate('/', {state:{
  //     id : comment.id,
  //     name : comment.name,
  //     img : comment.image
  //   }})
  // }

  return (
    <div className="eachRandomPhoto" >
      {modal ? <PhotoModal modalState = {modalState} comment={comment} albumId={albumId}/> : null}
      <img loading="lazy" className={styles.PHOTOS} ref={mesureRef} src={imgUrl} onClick={modalState}></img>
      <div className={styles.name}>{comment.name}</div>
      <div className={styles.date}>{comment.created_at}</div>
    </div>
  );
}

const PhotoModal = (props) => {
  const deletePhoto = () => {
    //console.log("/albums/"+props.albumId+"/photos/"+props.comment.id);
    if(window.confirm("정말로 삭제하시겠습니까?")){
      client.delete("/albums/"+props.albumId+"/photos/"+props.comment.id)
      .then(function(res){
        //console.log(res);
        alert("사진 1장을 삭제하였습니다.");
        window.location.replace('/PrivateFolder');
      })
      .catch(function(err){
        //console.log(err);
      });
    }
  }

  return(
    <div className={modalstyles.modal}>
      <div className={modalstyles.ModalBackground} onClick={props.modalState}></div>
      <div className={modalstyles.ModalArea}>
        <div>
          <img src={trashCan} className={modalstyles.trashCan} onClick={deletePhoto}/>
        </div>
        <div className={modalstyles.title}>{props.comment.name}</div>
        <div className={modalstyles.date}>{props.comment.created_at}</div>
        <div className={modalstyles.imgArea}>
          <img loading="lazy" className={modalstyles.image} src={props.comment.image}></img>
        </div>
      </div>
    </div>
  )
}
