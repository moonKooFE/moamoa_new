import styles from './SignUpBtn_disabled.module.css';

const SignUpBtn = (props) => {
    return(
        <button className={styles.disabled} >
            <span>계속하기</span>
        </button>
    )
};
export default SignUpBtn;