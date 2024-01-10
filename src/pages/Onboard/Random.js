import React from "react";
import { useNavigate } from "react-router-dom"; 
import Onboard from "../../Assets/Onboard2.png";
import styles from "./Random.module.css";
import GeneralBtn from "../../Components/Layout/GeneralBtn";
import Modal from "../../Components/UI/NeedLoginModal";
import ReactDOM from 'react-dom';
import { useState } from "react";
import Book from "../../Assets/Book.svg";
import Gift from "../../Assets/Gift.svg";

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
        //console.log(sessionStorage.getItem('isLogin'));
        if(sessionStorage.getItem('isLogin') == 'true'){
            navigate('/mainpage', {state:{
            tab : 1
            }});
        } else {
            OnMoveHandler();
        }
    }

    const portalElement = document.getElementById('overlays');
    return(
        <div className={styles.BG}>
            
            <a onClick={()=>navigate('/Onboard')} className={styles.start}>시작하기</a>
            <img src={Onboard} className={styles.img}/>
            <div className = {styles.group1}>
                <div className={styles.circle1} onClick={albumPage}><div className ={styles.Book} /><div>사진첩 만들기</div></div>
                <div className={styles.circle2} onClick={nextPage}><div className = {styles.Gift} /><div>랜덤포즈 뽑기</div></div>
            </div>
            
            {showModal && ReactDOM.createPortal(<Modal onClose={() => setShowModal(false)}/>, portalElement)}
        </div>
    )
}
export default PickPose;