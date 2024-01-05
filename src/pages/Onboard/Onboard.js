import styles from "./Onboard.module.css";
import onboardGroup from "../../Assets/onboardgroup.png";
import KakaoBtn from "../../Components/Layout/KakaoBtn";
import GeneralBtn from "../../Components/Layout/GeneralBtn";
import { useNavigate } from "react-router-dom";
const Onboard = () =>{
    const navigate = new useNavigate();
    const login = () => {
        navigate("/loginfortest");
    }
    return(
        <div className={styles.background}>
            <img className={styles.onboardGroup} src={onboardGroup} alt="this is Onboarding Image" />
            <KakaoBtn className={styles.kakao}/>
            <div style={{width:"100px"}}>&nbsp;</div>
            <GeneralBtn title="이메일로 로그인하기" onClick={login} width={'39vh'}/>
        </div>
    )
};
export default Onboard;