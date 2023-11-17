import { Fragment } from "react";
import styles from "./NeedLoginModal.module.css";
import { useNavigate,BrowserRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom';
import Close from "../../Assets/close2.png";
import ModalBtn from "../Layout/ModalBtn";
const NeedLoginModal = (props) => {
    const navigate = useNavigate();
    
    const gotoOnboard = () =>{
        navigate("/Onboard");
    }
  
    return(
        <div className={styles.Modal} >
            <div className={styles.Bg} onClick={props.onClose}></div>
            <div className={styles.Content}>
                <img src={Close} onClick={props.onClose}className={styles.close}/>
                <div className={styles.title}>{props.title}</div>
                <ModalBtn title="로그인하러 가기" onClick={gotoOnboard}/>
            </div>
        </div>
    )
};

const portalElement = document.getElementById('overlays');
const Modal = (props) => {
    return(
        <Fragment>
            {ReactDOM.createPortal(<NeedLoginModal onClose={props.onClose} title={["로그인하고 더 많은 기능을", <br/>, "이용해보세요!"]}/>, portalElement)}
        </Fragment>
    )
};
export default Modal;

