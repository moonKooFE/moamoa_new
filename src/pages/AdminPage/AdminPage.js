import styles from "./AdminPage.module.css";
import React, { useEffect, useState } from "react";
import Backnavbar from "../../Components/Layout/Backnavbar";
import client from "../../Client";

const AdminPage = () => {
    const fetchImages = async () => {
        try {
            const response = await client.get('/admin/review');
            return response.data;
        } catch (error) {
            console.error('에러가 발생했습니다.',error);
        }
    }
    const [images, setImages] = useState([]);
    
    useEffect(()=>{
        const loadImages = async () => {
            const fetchedImages = await fetchImages();
            setImages(fetchedImages)
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
    const Accept = (image,id) => {
        sendApprovalInfo(image,id,'accept');
    }
    const Refuse = (image, id) => {
        sendApprovalInfo(image,id,'refuse');
    }
    const sendApprovalInfo = (image,id,status) => {
        client.post('',[image, id,status])
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
                    <div className={styles.acceptBtn} onClick={()=>Accept(inform[0],inform[2])}>수락</div>
                    <div className={styles.refuseBtn} onClick={()=>Refuse(inform[0],inform[2])}>거절</div>
                </div>
            )}
        </div>
    );
}

export default AdminPage;