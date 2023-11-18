import styles from "./PlusBtn.module.css";
import Plus from "../../../Assets/plus2.png";

function plusBtn(props) {
    return (
        <div className={styles.plusBtn} onClick={props.modalState1}><img src={Plus} className={styles.plus}/></div>
        
    )
}

export default plusBtn;