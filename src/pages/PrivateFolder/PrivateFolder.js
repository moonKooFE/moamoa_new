import styles from './PrivateFolder.module.css';
import { useState, React} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ManagingFolderModal from "./ManagingFolderModal";
import Upload from "./Upload";
import PhotosIS from "../../Components/InfiniteScroll/PhotosIS";


const PrivateFolder = (props) => {
    const location = useLocation();
    const [albumName, setAlbumName] = useState(location.state != null ? location.state.name : "");
    const [albumId, setAlbumId] = useState(location.state != null ? location.state.id : "");
    const [albumImg, setAlbumImg] = useState(location.state != null ? location.state.img : "");
    const navigate = useNavigate();
    
    const [modal, setModal] = useState(false);
    const [modal1, setModal1] =  useState(false);
    const modalState = () => {
        setModal(!modal);
    }
    const modalState1 = () => {
        setModal1(!modal1);
    }

    return(
        <div className={styles.background2}>
            { modal ? <ManagingFolderModal modalState={modalState} albumId={albumId} albumName={albumName} albumImg={albumImg}/> : null}
            { modal1 ? <Upload modalState1={modalState1} albumId={albumId}/> : null}
            
            <div className={styles.box4}>
                <div className={styles.arrow2} onClick={() => navigate('/mainpage' ,{state:{Tap:1}})}></div>
                <div className={styles.username2}>{albumName}</div>
                <div className={styles.trash} onClick={modalState}></div>
            </div>
            <PhotosIS api={props.api} heightOfComponent="90.5vh" headerComponet="" requsetType="15" albumId={albumId} modalState1={modalState1}/>
        </div>
    );
}

export default PrivateFolder;