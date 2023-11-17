import React from "react";
import { useNavigate } from "react-router-dom"; 
import Onboard from "../../Assets/Onboard2.png";
import styles from "./PickPose.module.css";
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
    const portalElement = document.getElementById('overlays');
    return(
        <div className={styles.BG} id="overlays">
            
            <a href="">시작하기</a>
            <img src={Onboard} className={styles.img}/>
            <GeneralBtn title="사진첩 만들기" onClick={OnMoveHandler}/>
            {showModal && ReactDOM.createPortal(<Modal onClose={() => setShowModal(false)}/>, portalElement)}
        </div>
    )
}
export default PickPose;