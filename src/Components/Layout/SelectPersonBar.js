import React, {useState} from "react";
import minus from "../../Assets/minus.png";
import Plus from "../../Assets/plus.png";
import styles from "./SelectPersonBar.module.css";
import {useNavigate} from "react-router-dom";

const SelectPersonBar = (props) => {
    
    const [person, setperson] = useState(0);
    const [rangeerror, setrangeerror] = useState(false);

    const Counterm = () => {
        if(person > 1){
          setperson(person-1);
          if(rangeerror) {
            setrangeerror(false);
          }
        } else {
          setrangeerror(true)
        }
      }
        
    const Counterp = () => {
        if(person < 5){
          setperson(person+1);
          if(rangeerror) {
            setrangeerror(false);
          }
        } else {
          setrangeerror(true);
        }
      }
    const navigate = useNavigate();
    const gotoInflow3 = () => {
      sessionStorage.setItem('people', person);
      navigate('/ShowRandPose');
    }
    return(
        <div className={styles.SelectPersonBar}>
            <div className={styles.barline}>
              <div className={styles.minusArea} onClick={Counterm}>
                <img className={styles.minus}src={minus}/>
              </div>
              <div className={styles.count}>{person}</div>
              <div className={styles.plusArea} onClick={Counterp}>
                <img className={styles.plus}src={Plus}/>
              </div>
            </div>
            {rangeerror ? <div className={styles.rangeError}>1 ~ 5명 이내로 선택해주세요</div> : <div className={styles.rangecorrect}/>}
            {
            person== 0 ?
            <button className={styles.randBtnDisabled} >뽑기</button>
            :
            <button className={styles.randBtn} onClick={gotoInflow3}>뽑기</button>
        }     
        </div>
    )
};
export default SelectPersonBar;