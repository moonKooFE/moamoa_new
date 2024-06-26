import styles from './loginpage2.module.css';
import React, {useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import client from '../../Client';

function App(){
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [disableBtn , setDisableBtn] = useState(false);

    const reset1 = () => {
        setEmail('');
    }

    const reset2 = () => {
        setPassword('');
    }

    const savePassword = event => {
        setPassword(event.target.value);
    }

    const saveEmail = event => {
        setEmail(event.target.value);
    }

    const onSubmitHandler =  async event  => {
        // 버튼만 누르면 리프레시 되는것을 막아줌
        event.preventDefault();

        if(email == "" || password == ""){
            //console.log("empty");
            setEmail("");
            setPassword("");
            return; 
        }

        setDisableBtn(true); // 버튼 클릭 시 post요청 완료 전까지 비활성화

        let LoginDTO = {
            "email" : email,
            "password" : password,
        }

        client.post('/login', LoginDTO)
            .then(function (response) {
                //console.log(response);
                setToken(response.headers.authorization);
                sessionStorage.setItem('token', response.headers.authorization);
                sessionStorage.setItem('nickname', response.data.response.nickname);
                sessionStorage.setItem('image', response.data.response.image);
                sessionStorage.setItem('id', response.data.response.id);
                sessionStorage.setItem('email', response.data.response.email);
                sessionStorage.setItem('isLogin', true);
                client.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
                navigate('/MainPage');
            })
            .catch(function (error) {
                console.log(error);
                alert(error.response.data.error.message);
            })
            .finally(function () {
                setDisableBtn(false); // 버튼 활성화
            });
    }

    return(
        <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
            <div className={styles.background5}>
                <div className={styles.arrow5} onClick={() => navigate(-1)}></div>
                <h1 className={styles.logintext2}>로그인하기</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className={styles.emailname}>
                        <div>이메일</div>
                        <input type="email" placeholder='이메일을 입력해주세요' onChange={saveEmail} value={email} className={styles.emailinput} required></input>
                        <div className={styles.del} onClick={reset1}>X</div>
                    </div>
                    <div className={styles.passwordname}>비밀번호
                        <input type="password" placeholder='비밀번호를 입력해주세요' onChange={savePassword} value={password} className={styles.emailinput} required></input>
                        <div className={styles.del} onClick={reset2}>X</div>
                    </div>
                    {disableBtn ? <div className={styles.loginbtn1}>로그인 중...</div> : <button type='submit' value="로그인" className={styles.loginbtn1}>로그인</button>}
                </form>           
            </div>
        </div>
    );

}

export default App;