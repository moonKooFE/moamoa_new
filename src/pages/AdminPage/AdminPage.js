import styles from "./AdminPage.module.css";
import React, { useEffect, useState } from "react";
import Backnavbar from "../../Components/Layout/Backnavbar";
import client from "../../Client";

const AdminPage = () => {
    const fetchImages = async () => {
        try {
            const response = await client.get('/admin/review');
            console.log(response.data.response);
            return response.data.response;
        } catch (error) {
            console.error('에러가 발생했습니다.',error);
        }
    }
    const [images, setImages] = useState([{id:1, image:"hello"}]);
    
    useEffect(()=>{
        const loadImages = async () => {
            const fetchedImages = await fetchImages();
            setImages(fetchedImages);
        };
        loadImages();
    }, []);
    const [openModal,setOpenModal] = useState(false);
    const Modalopen = () => {
        setOpenModal(!openModal);

    }
    const [inform, setinform] = useState([null,null]);
    const imageopen = (image, id)=> {
        setinform([image,id]);
        Modalopen();
    }
    const Accept = (id) => {
        sendApprovalInfo(id,'ACCEPT');
    }
    const Refuse = (id) => {
        sendApprovalInfo(id,'RETECT');
    }
    const sendApprovalInfo = (id, status) => {
        let requestDTO = {
            "photoid" : id
        };
        
        client.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
        client.post('/admin/review/photoes/' + id +'?photoId=' + id, requestDTO)
        .then(response => {
            console.log("success");
            alert("수락하였습니다.");
            Modalopen();
        })
        .catch(error => {
            console.error('failed:',error);
            alert("에러.");
        })
    }
    return(
        <div className={styles.AdminPage}>
            <div className={styles.backnavbar}>
                <Backnavbar title={"관리자 페이지"} className={styles.title}/>
            </div>
            <div className={styles.scrollArea}>
                {images.map(image => (
                    <div className={styles.box}><img className={styles.image} key={image.id} src={image.image} onClick={() => imageopen(image.image, image.id)}/></div>
                ))}
            </div>
            {openModal && (
                <div className={styles.Modal}>
                    <div className={styles.ModalBackground} onClick={Modalopen}></div>
                    <div className={styles.box1}>
                        <img src={inform[0]} id={[inform[1]]} className={styles.image2}/>
                        <div className={styles.acceptBtn} onClick={()=>Accept(inform[1])}>수락</div>
                        <div className={styles.refuseBtn} onClick={()=>Refuse(inform[1])}>거절</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminPage;