import styles from './GeneralBtn.module.css';
import { useEffect, useState } from 'react';

const GeneralBtn = (props) => {
    const [btnWidth, setWidth] = useState('41vh');

    useEffect(()=>{
        if(props.width !== undefined)
            setWidth(props.width);
    }, [])     
    return(
        <button style={{width:btnWidth}} className={styles.active} type='submit' onClick={props.onClick}>
            <span>{props.title}</span>
        </button>
    )
};
export default GeneralBtn;