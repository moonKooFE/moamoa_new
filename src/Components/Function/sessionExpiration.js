import { useEffect } from "react";
import client from "../../Client";

const SessionExpiration = () => {

    useEffect(()=>{
        console.log(sessionStorage.getItem('token'));
        client.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
        client.get('/users?nickname=asdf')
        .then(function(res) {
          //console.log("로그인 인증 성공");
        }).catch(function(err){
          if(err.response.status == "401"){
            SessionExpirationAction();
          } else {
            alert("서버 연결이 불안정 합니다. 재접속을 시도해 주세요.");
            window.location.replace('/Random');
          }
          //console.log(err);
        });
      }, []);
}

const SessionExpirationAction = () => {
  alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
  sessionStorage.clear();
  client.defaults.headers.common['Authorization'] = undefined;
  sessionStorage.setItem('isLogin', false);
  window.location.replace('/onBoard');
}

export default SessionExpiration;