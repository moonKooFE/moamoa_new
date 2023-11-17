import styles from './GeneralBtn.module.css';

const SignUpBtn = (props) => {
   
    return(
        <button className={styles.active} type='submit' onClick={props.onClick}>
            <span>{props.title}</span>
        </button>
    )
};
export default SignUpBtn;