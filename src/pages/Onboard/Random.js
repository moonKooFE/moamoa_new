import React from "react";
import { useNavigate } from "react-router-dom"; 
import Onboard from "../../Assets/Onboard2.png";
import styles from "./Random.module.css";
import GeneralBtn from "../../Components/Layout/GeneralBtn";
import Modal from "../../Components/UI/NeedLoginModal";
import ReactDOM from 'react-dom';
import { useState } from "react";

const PickPose = () => {
    const navigate = useNavigate();
    const [showModal,setShowModal] = useState(false);
    const OnMoveHandler = () => {
        setShowModal(true);
    };

    const nextPage = async event => {
        navigate('/SelectPersonnal');
      }
    
    const albumPage = () => {
        if(sessionStorage.getItem('isLogin')){
            navigate('/mainpage', {state:{
            Tap : 1
            }});
        } else {
            OnMoveHandler();
        }
    }

    const portalElement = document.getElementById('overlays');
    return(
        <div className={styles.BG} id="overlays">
            
            <a href="">시작하기</a>
            <img src={Onboard} className={styles.img}/>
            <div className={styles.imgContainer} onClick={() => {nextPage()}}>
                <div>
                    <div className={styles.script1}>랜덤포즈 뽑기</div>
                    <div className={styles.script2}>여기를 클릭하세요</div>
                </div>
            </div>
            <GeneralBtn title="사진첩 만들기" onClick={albumPage}/>
            {showModal && ReactDOM.createPortal(<Modal onClose={() => setShowModal(false)}/>, portalElement)}
        </div>
    )
}
export default PickPose;