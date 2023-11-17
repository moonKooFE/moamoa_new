import React from "react";
import styles from "./Backnavbar.module.css";
import Arrow from "../../Assets/Arrow.png";
import { useNavigate } from "react-router-dom";

const Backnavbar = ({title}) => {
    const navigate = useNavigate();

    let goBack = () => {
        navigate(-1);
    };

    return(
        <div className={styles.box}>
            <div className={styles.backParent}>
                <img className={styles.back} src={Arrow} onClick={goBack}/>
            </div>
            <div className={styles.title}>{title}</div>
        </div>
    )
}
export default Backnavbar;