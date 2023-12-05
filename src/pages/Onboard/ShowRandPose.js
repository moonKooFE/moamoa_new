import styles from './ShowRandPose.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import defaultImg from '../../Assets/OnboardMainImg.webp';
import reroll from '../../Assets/Reroll.svg';
import client from '../../Client';
import LoginModal from "../../Components/UI/NeedLoginModal";
import Backnavbar from '../../Components/Layout/Backnavbar';
import GeneralBtn from '../../Components/Layout/GeneralBtn';

/*
    issue : 포즈 재생성 버튼 제어 필요(연타 방지)
     => 해결
*/
function ShowRandPose(){
  const initImgSize = ['25.75vh', '31vh']
  const [people, setPeople] = useState(sessionStorage.getItem('people'));
  const [imgUrl, setImgUrl] = useState(defaultImg);
  const [imgWidth, setImgWidth] = useState('0vh');
  const [imgHeight, setImgHeight] = useState('0vh');
  const [modal, setModalState] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(sessionStorage.getItem('people') != undefined){
      client.get('/poses/random?peopleCount='+sessionStorage.getItem('people'))
        .then(function(res) {
          setImgUrl(res.data.response.image);
        })
        .catch(function(err) {
          console.log(err);
        }).finally(function() {
          setImgWidth(initImgSize[0]);
          setImgHeight(initImgSize[1]);
        });
    }
  }, [])

  const otherPose = () => {
    setIsloading(true);
    setImgWidth('0vh');
    setImgHeight('0vh');
    client.get('/poses/random?peopleCount='+people)
      .then(function(res) {
        setImgUrl(res.data.response.image);
    })
      .catch(function(err) {
        console.log(err);
    })
      .finally(function(res) {
        setIsloading(false);
        setImgWidth(initImgSize[0]);
        setImgHeight(initImgSize[1]);
    });
  }

  const gotoAllposes = () => {
    sessionStorage.setItem('category', 'ROLE_ADMIN');
    navigate('/Allpose');
  }

  const albumPage = () => {
    if(Boolean(sessionStorage.getItem('isLogin'))){
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
    <div className={styles.ShowRandPose}>
      {modal ? <LoginModal onClose={modalState}/> : null}
      <div className={styles.backnavbar}>
        <Backnavbar title={""}/>
      </div>
      <div className={styles.inflow3Script}>이 포즈로 찍어볼까요?</div>
      <div className={styles.hashTag}># {people}명이서</div>
      <div className={styles.poseAria}>
        <div className={styles.imgArea}>
          <img loading="lazy" className={styles.pose} src={imgUrl} style={{width:imgWidth, height:imgHeight}}></img>
        </div>
        <div>
            <img src={reroll} className={styles.reroll} style={!isLoading ? {} : {transform:'rotate(-360deg)'}} onClick={!isLoading ? otherPose : null}></img>
        </div>
        <div className={styles.gotoAllposes} onClick={gotoAllposes}>포즈 모아보기</div>
        <div className={styles.underline}></div>
      </div>
      <div className={styles.SignUpBtn}>
        <GeneralBtn title="사진첩 만들기" onClick={albumPage}/>
      </div>
    </div>
  )
}

export default ShowRandPose;