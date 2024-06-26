import {useEffect, useState, usetate} from 'react';
import styles from './MemberManageModal.module.css';
import client from '../../Client';
import Invite from './MemberManageModal_invite';
import Controller from "../../Assets/Controller.png";
import Plus2 from "../../Assets/plus2.png";
import BlueScreen from "../../Assets/BlueScreen.png";
function App(props){
    //props.albumId props.modalstate3
    const [member1, setmember1] = useState("");
    const [comments, setComments] = useState([]);
    const [membersAreaHeight, setMembersAreaHeight] = useState(0);
    const [modal, setModal] = useState(false);
    const [_oldMembersList, set_oldMembersList] = useState([]);
    let oldMembersList = [];
    const Alterimg = (event) => {
        event.target.src = BlueScreen;
    }
    useEffect(()=>{
        
        client.get('/albums/'+props.albumId+'/members')
        .then(function(res){
            setComments(res.data.response);
            if(res.data.response.length <= 12){
                setMembersAreaHeight(6.25+2.25+6.25*res.data.response.length);
            } else {
                setMembersAreaHeight(77);
            }
            for(let i = 0; i < res.data.response.length; i++){
                oldMembersList.push(res.data.response[i].id);
            }
            set_oldMembersList(oldMembersList);
        })
        .catch(function(err){
            alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
            sessionStorage.clear();
            client.defaults.headers.common['Authorization'] = undefined;
            window.location.replace('/onBoard');
        });
    }, [modal]);

    const modalState = () => {
        setModal(!modal)
    }

    return(
        <div className={styles.background9}>
            { modal ? <Invite albumId={props.albumId} modalState={modalState} oldMembersList={_oldMembersList}/> : null}
            <div className={styles.background10} onClick={props.modalState3}></div>
            <div className={styles.background11}>
                <img src={Controller} className={styles.controler1}/>
                <div className={styles.membermanage}>멤버 관리</div>
                <div className={styles.membersArea} style={{height:membersAreaHeight+'vh'}}>

                    {comments.map((comment, index) => {                
                        return (
                            <div className={styles.box10} key={index}>
                                <img loading="lazy" className={styles.membermanageimg} src={comment.image} onError={Alterimg}></img>
                                <div className={styles.membermanage5}>{comment.nickname}</div>
                            </div>
                        )
                    })}
                    
                    <div className={styles.box10}>
                        <div className={styles.box11}><img src={Plus2}className={styles.addmember}/></div><div className={styles.membermanage5} onClick={modalState}>멤버 추가하기</div>
                        
                    </div>
                </div>
           </div>
        </div>
    );
}

export default App;