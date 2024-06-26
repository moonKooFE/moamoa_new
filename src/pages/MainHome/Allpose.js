import styles from "./AllPoses.module.css";
import {
  React,
  useState,
  useEffect,
} from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AllposesContent from "../../Components/UI/AllposesContent";

const MainPage = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTab, clickTab] = useState(0);
  const [people, setPeople] = useState(location.state != null ? location.state.people : 1);
  const [modal, setModal] = useState(false);

  const modalState = () => {
    setModal(!modal);
  }


  useEffect(() =>{
    sessionStorage.setItem('category', 'ROLE_ADMIN');
  },[])
  
  return (
    <div className={styles.App}>
       <div className={styles.topNav}>
          <div style={{display:'flex', marginTop:'10.13vh'}}>
            <div className={styles.backBtn} onClick={() => navigate(-1)}></div>
            <div className={styles.pageTite}>포즈 모아보기</div>
          </div>
          {/* <div className={styles.bookMark} onClick={()=>{alert("구현 중입니다.")}}></div> */}
        </div>
      <AllposesContent height={'75.5vh'}/>
    </div>
  );
};

export default MainPage;