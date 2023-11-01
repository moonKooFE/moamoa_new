import styles from './KakaoBtn.module.css';
import KakaoIcon from '../../Assets/kakaoicon.png';

const KakaoBtn = (props) => {
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_RURL;
    const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    return (
        <a href={KAKAO_AUTH_URI}className={styles.kbutton} onClick={props.onClick}>
          <div className={styles.icon}>
            <img className={styles.icon} src={KakaoIcon} alt="this is kakao icon"/>
          </div>
          <span>카카오로 1초만에 시작하기</span>
        </a>
      );
};
export default KakaoBtn;