import { Fragment } from "react";
import styles from "./StdInput.module.css";
import React, {useState} from "react";
import Reset from "../../Assets/reset.png";

const StdInput = (props) => {
    return(
    <Fragment>
        <div className={styles.div}>
            <input className={styles.input} type={props.type} placeholder = {props.placeholder} onChange={props.onChange}></input>
            <img className={styles.del} src={Reset} onClick={props.reset}/>
        </div>
        
    </Fragment>

    )
}
export default StdInput;