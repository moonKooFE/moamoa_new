import styles from './SignUpBtn_disabled.module.css';

const SignUpBtn = (props) => {
    return(
        <button className={styles.disabled} onClick={props.onClick}>
            <span>계속하기</span>
        </button>
    )
};
export default SignUpBtn;