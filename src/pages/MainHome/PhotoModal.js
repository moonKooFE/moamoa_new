import React from "react";
import styles from "./PhotoModal.module.css";
import { useState, useEffect} from "react";
import client from "../../Client";
const PhotoModal = (props) => {
    const [imgUrl, setImgUrl] = useState("");
    const [top, setTop] = useState(100);
    const [people, setPeople] = useState(1);

    useEffect(()=>{
        if (sessionStorage.getItem('people') !== null) {
            setPeople(sessionStorage.getItem('people'));
        }
        client.get('/poses/random?peopleCount=' + people)
        //sessionStorage.getItem('people')
        
        .then(function(res) {
            setImgUrl(res.data.response.image);
            setTop(15);
            console.log(sessionStorage.getItem('people'))
            
        })
        .catch(function(err) {
            //console.log(err);
            // props.modalState();
        }).finally(function() {

        });
    }, [])
    return(
        <div className={styles.Modal}>
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