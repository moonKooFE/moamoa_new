import {useState, usetate} from 'react';
import styles from './ManagingFolderModal.module.css';
import EscapeModal from "./EscapeModal";
import MemberManageModal from "./MemberManageModal";
import ModifyAlbumModal from "./ModifyAlbumModal";
import Controller from "../../Assets/Controller.png";
import Arrow2 from "../../Assets/Arrow2.png";
import Goout from "../../Assets/Goout.png";
function App(props){
    //props.albumId props.albumName props.albumImg
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [modal4, setModal4] = useState(false);

    const modalState2 = () =>{
        setModal2(!modal2)
    }

    const modalState3 = () =>{
        setModal3(!modal3)
    }
    const modalState4 = () =>{
        setModal4(!modal4)
    }
    return(
        <div className={styles.background6}>
            <div className={styles.background7} onClick={props.modalState}></div>
            <div className={styles.background8}>
            { modal2 ? <EscapeModal modalState2={modalState2} albumId={props.albumId}/> : null}
            { modal3 ? <MemberManageModal modalState3={modalState3} albumId={props.albumId}/> :null}
            { modal4 ? <ModifyAlbumModal modalState4={modalState4} albumId={props.albumId} albumName={props.albumName} albumImg={props.albumImg}/>: null}
                 <img src={Controller} className={styles.controller}/>
                 <div onClick={() => {modalState3()}}>
                    <div className={styles.membermanage1}>멤버 관리<img src={Arrow2} className={styles.arrow4}/></div>
                </div>
                <div onClick={modalState4}>
                    <div className={styles.membermanage3}>사진첩 수정<img src={Arrow2} className={styles.arrow5}/></div>                    
                </div>
                <div onClick={modalState2}>
                    <div className={styles.membermanage4} >사진첩 나가기<img src={Goout} className={styles.goout}/></div>
                </div>
        
            </div>
        </div>
    );
}
export default App;