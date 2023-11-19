import React from "react";
import styles from "./PhotoModal.module.css";
import { useState, useEffect} from "react";
import client from "../../Client";
const PhotoModal = (props) => {
    //props.imgUrl
    const [imgUrl, setImgUrl] = useState(props.imgUrl);
    const [top, setTop] = useState(100);

    useEffect(()=>{
        setTop(22.88);
    }, [])
    return(
        <div className={styles.Modals}>
            <div className={styles.ModalBackground} onClick={props.modalState}></div>
            <div className={styles.ModalArea} style={{top : top+'vh'}}>
                <div className={styles.imageArea}>
                    <img loading="lazy" className={styles.image} src={imgUrl}></img>
                </div>
            <button className={styles.close} onClick={props.modalState}>닫기</button>
            </div>
      </div>
    )
};
export default PhotoModal;