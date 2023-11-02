import styles from './SignUpBtn_active.module.css';

const SignUpBtn = (props) => {
    return(
        <button className={styles.active} onClick={props.onClick}>
            <span>계속하기</span>
        </button>
    )
};
export default SignUpBtn;