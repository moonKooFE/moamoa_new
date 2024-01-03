import styles from "./AdminPage.module.css";
import React, { useEffect, useState } from "react";
import Backnavbar from "../../Components/Layout/Backnavbar";
import client from "../../Client";

const AdminPage = () => {
    const fetchImages = async () => {
        try {
            const response = await client.get('/admin/review');
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('에러가 발생했습니다.',error);
        }
    }
    const [images, setImages] = useState(["uri", 1]);
    
    useEffect(()=>{
        const loadImages = async () => {
            const fetchedImages = await fetchImages();
            //setImages(fetchedImages)
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
        const formData = new FormData();
        formData.append('requestDTO', {"pass" : status});
        
        client.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
        client.post('/admin/review/photoes/' + id, formData)
        .then(response => {
            console.log("success");
        })
        .catch(error => {
            console.error('failed:',error)
        })
    }
    return(
        <div className={styles.AdminPage}>
            <Backnavbar/>
            {images.map((image, id) => (
                <div className={styles.box}><img className={styles.image} key={id} src={image} onclick={imageopen(image,id)} /></div>
            ))}
            {openModal && (
                <div className={styles.Modal}>
                    <div className={styles.box1}></div>
                    <img src={inform[0]} id={[inform[1]]} className={styles.image2}/>
                    <div className={styles.acceptBtn} onClick={()=>Accept(inform[1])}>수락</div>
                    <div className={styles.refuseBtn} onClick={()=>Refuse(inform[1])}>거절</div>
                </div>
            )}
        </div>
    );
}

export default AdminPage;