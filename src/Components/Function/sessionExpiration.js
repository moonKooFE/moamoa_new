import { useNavigate } from "react-router-dom";
import client from "../../Client";

const sessionExpiration = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        client.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
        client.get('/users?nickname=asdf')
        .then(function(res) {
          //console.log("로그인 인증 성공");
        }).catch(function(err){
          if(err.response.status == "401"){
            alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
            sessionStorage.clear();
            client.defaults.headers.common['Authorization'] = undefined;
            navigate('/onBoard');
          } else {
            alert("서버 연결이 불안정 합니다. 재접속을 시도해 주세요.");
            navigate('/Random');
          }
          //console.log(err);
        });
      }, []);
}

export default sessionExpiration;