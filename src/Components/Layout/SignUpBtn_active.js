import styles from './SignUpBtn_active.module.css';
import styled from 'styled-components';
const SignUpBtn = (props) => {
   
    return(
        <button className={styles.active} type='submit' onClick={props.onClick}>
            <span>{props.title}</span>
        </button>
    )
};
export default SignUpBtn;