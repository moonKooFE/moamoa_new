import styles from './Random.module.css';
import { Link, useAsyncError, useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';
import {React} from 'react';
import LoginModal from "../../Components/UI/NeedLoginModal";
import MainLogo from "../../Assets/OnboardLogo.png";

function Random(){
  const [modal, setModalState] = useState(false);

  const navigate = useNavigate();

  const nextPage = async event => {
    navigate('/SelectPersonnal');
  }

  const albumPage = () => {
    if(sessionStorage.getItem('isLogin')){
      navigate('/mainpage', {state:{
        Tap : 1
      }});
    } else {
      modalState();
    }
  }

  const modalState = () => {
    setModalState(!modal);
  }



  return (
    <div className={styles.App1}>
      {modal ? <LoginModal modalState={modalState}/>: null}
      <div className={styles.content}>
        <div className={styles.invisibleNav}>
          <Link to="/Onboard" className={styles.logIn}>시작하기</Link>
        </div>
        <div className={styles.Main}><img src={MainLogo} className={styles.mainLogo}/></div>
        <div className={styles.imgContainer} onClick={() => {nextPage()}}>
          <div className={styles.boxImg}></div>
          <div>
            <div className={styles.script1}>랜덤포즈 뽑기</div>
            <div className={styles.script2}>여기를 클릭하세요</div>
          </div>
        </div>
      </div>
      <div className={styles.randBtn1} onClick={albumPage}>사진첩 만들기</div>
    </div>
  )

}

export default Random;