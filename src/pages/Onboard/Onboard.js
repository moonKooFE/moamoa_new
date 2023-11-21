import styles from "./Onboard.module.css";
import onboardGroup from "../../Assets/onboardgroup.png";
import KakaoBtn from "../../Components/Layout/KakaoBtn";
const Onboard = () =>{
    return(
        <div className={styles.background}>
            <img className={styles.onboardGroup} src={onboardGroup} alt="this is Onboarding Image" />
            <KakaoBtn className={styles.kakao}/>
            <a href=""></a>
        </div>
    )
};
export default Onboard;