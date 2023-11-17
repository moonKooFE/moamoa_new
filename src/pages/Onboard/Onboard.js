import styles from "./Onboard.module.css";
import onboardGroup from "../../Assets/onboardgroup.png";
import KakaoBtn from "../../Components/Layout/KakaoBtn";
const Onboard = () =>{
    return(
        <div className={styles.background}>
            <img className={styles.onboardGroup} src={onboardGroup} alt="this is Onboarding Image" />
            <KakaoBtn className={styles.kakao}/>
            <a href="/Loginpage">다른 계정으로 로그인</a>
        </div>
    )
};
export default Onboard;