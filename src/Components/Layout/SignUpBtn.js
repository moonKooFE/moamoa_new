import styles from './SignUpBtn.module.css';

const SignUpBtn = (props) => {
    return(
        <button className={props.isDisabled ? 'disabled' : 'active'} onClick={props.onClick}>
            <span>계속하기</span>
        </button>
    )
};
export default SignUpBtn;