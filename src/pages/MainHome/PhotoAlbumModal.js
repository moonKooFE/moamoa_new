import styles from "./PhotoAlbumModal.module.css";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultImg from "../../Assets/moamoa.svg";
import client from "../../Client";
import BlueScreen from "../../Assets/BlueScreen.png";
// App.defaultProps = {
//   userList: [],
// };

/*
  what to do?
  폼을 이용한 전송 구현
  userId 실시간 검색 기능 구현
*/

const App = (props) => {

  const navigate = useNavigate();
  const titleInputRef = useRef(null); // DOM 객체 조작을 위해 useRef 사용
  const idInputRef = useRef(null);
  client.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');

  const [pageIdx, setPageIdx] = useState(1); // page 전환을 위한 변수 (1 ~ 2)
  const [albumTitle, setalbumTitle] = useState(''); // input에 입력된 albumTitle 저장
  const [userID, setUserID] = useState(''); // input에 입력된 userID 저장
  const [userList, setUserList] = useState([]);
  const [userListFilter, setUserListFilter] = useState([]);
  const [userIdList, setUserIdList] = useState([]);

  const [file, setFile] = useState("");
  const formData = new FormData();
  const [disableBtn, setDisableBtn] = useState(false);
  
// ========== title input에 focus ==========

  const titleInputFocus = () => {
    titleInputRef.current.focus();
  };

// ========== userId input에 focus ==========

  const idInputFocus = () => {
    idInputRef.current.focus();
  };
  const Alterimg = (event) => {
    event.target.src = BlueScreen;
  }
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputFocus();
    }
    if(idInputRef.current){
      idInputFocus();
    }
  }, [pageIdx]); // pageIdx가 변경 될 때(초기화, 다음/이전 버튼을 누를 때) input에 focus


  const goBackTo = (idx) => { // page 전환을 위해 pageIdx를 바꿔주는 함수
    setPageIdx(idx);
    setUserList([]);
    setUserListFilter([]);
    setUserIdList([]);
  }
  
// ===== input value handle =====
  const saveUserID = async (event) => { //userId 값이 입력되는 동시에 실시간으로 userId를 서버로부터 검색
    setUserID(event.target.value);

    if(event.target.value != ""){
      await client.get('/users?nickname=' + event.target.value)
        .then(function(response){
          setUserListFilter(response.data.response);
        }).catch(function(error){
          //console.log(error);
          alert('로그인 세션 만료. 다시 로그인 해주세요.');
          navigate('/onboard');
        });
    } else {
      setUserListFilter([]);
    }
  }

  const saveAlbumTitle = event => {
    setalbumTitle(event.target.value);
  }



  const onCancel = () => {
    props.modalState();
   }

  const goToPage2 = () => { // 사진첩 이름 입력 후 다음 버튼 동작
    setPageIdx(2); // pageIdx를 2로 변경
  }

  const goToPage3 = () => { // 사진첩 이름 입력 후 다음 버튼 동작
    setPageIdx(3); // pageIdx를 2로 변경
  }

  // userId 리스트에 요소 추가
  const pushBackToUserList = (value) => {
    if(userList.find(v => v.id == value.id) != null){
      //console.log("이미 추가된 user입니다.");
    } else {
      //console.log("추가");
      setUserList([...userList, value]);
      setUserIdList([...userIdList, value.id]);
      setUserID('');
      idInputFocus();
      setUserListFilter([]);
      //console.log(userIdList);
    }
  }

  const popUserList = () => {
    if(userList.length != 0){
      //console.log("추가");
      setUserList(userList => userList.slice(0, -1));
      setUserIdList(userIdList => userIdList.slice(0, -1));
      setUserID('');
      idInputFocus();
      setUserListFilter([]);
      //console.log(userIdList);
    }
  }

  let content = [
    <div className={styles.Modal}>
      <div className={styles.ModalBackground} onClick={props.modalState}></div>
      <div className={styles.topScript1}>사진첩을 만들어 보세요</div>
      <div className={styles.titleAria}>
        <div className={styles.nav}>
          <div className={styles.quit}onClick={onCancel}>취소</div>
          <div style={{fontSize:'1.75vh'}}>사진첩 이름</div>
          <NextBtn/>
        </div>
        <div>
          <input ref={titleInputRef} onChange={saveAlbumTitle} value={albumTitle} type="text" placeholder="사진첩 이름 (최대 12글자)" maxLength={10} minLength={1} className={styles.inputAlbumName}></input>
        </div>
        <div className={styles.example}>예: 이멤버리멤버, 최강경영</div>
      </div>
    </div>
      ,
    <div className={styles.Modal}>
      <div className={styles.ModalBackground} onClick={() => {goBackTo(1)}}></div>
      <div className={styles.topScript2}>누군가와 함께 하실건가요?</div>
      <div className={styles.selectAlbumtype}>
        <div className={styles.albumeType1} onClick={!disableBtn ? (goToPage3) : (null)}>
          <div>친구들과 함께하기</div>
          <div>친구들과 사진을 공유해 보세요!</div>
        </div>
        <div className={styles.albumeType2} onClick={onGenarateHandler}>
          <div>{!disableBtn ? ("나만의 사진첩 만들기") : ("생성 중")}</div>
          <div>{!disableBtn ? ("나중에 친구를 추가할 수 있어요!") : ("조금만 기다려 주세요..")}</div>
        </div>
      </div>
    </div>
      ,
    <div className={styles.Modal}>
      <div className={styles.ModalBackground} onClick={() => {goBackTo(2)}}></div>
      <div className={styles.inviteAria}>
        <div className={styles.nav}>
        <div className={styles.quit} onClick={() => {goBackTo(2)}}>취소</div>
        <div onClick={() => idInputFocus()} style={{fontSize:'1.75vh'}}>초대하기</div>
        <GenarateBtn/>
        </div>
        <div className={styles.inputUserIdArea}>
          친구 닉네임 : &nbsp;
          {userList.map((userList, index) => <span key={index} style={{color:"black"}} onClick={popUserList}>{userList.nickname}&nbsp;</span>)}
          <input ref={idInputRef} onChange={saveUserID} value={userID} type="text" maxLength={12} className={styles.inputUserId}></input>
        </div>
        <div className={styles.filterUsers}>
          {userListFilter.map((userListFilter, index) => <div className={styles.filterUser} key={index} onClick={() => pushBackToUserList(userListFilter)}><img loading="lazy" src={userListFilter.image} onError={Alterimg}></img>{userListFilter.nickname}</div>)}
        </div>
      </div>
    </div>
      ];

  async function imageURLtoFileObject(imageURL, fileName) {
    const response = await fetch(imageURL);
    const imageBlob = await response.blob();
    const imageFile = new File([imageBlob], fileName, { type: imageBlob.type });
    return imageFile;
  }

  const genarateAlbume = (fileObject) => {

    const inputs = {
      "name" : albumTitle,
      "userIdList" : userIdList
    }
    setDisableBtn(true);

    const joinData = new Blob([JSON.stringify(inputs)], { type: "application/json" });

    formData.append('requestDTO', joinData);
    formData.append('file', fileObject);

    client.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');

    client.post('/albums', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then(function(response){
      //console.log(response);
      alert("새 앨범을 만들었어요!");
      props.modalState();
      window.location.replace('/mainpage');
    })
    .catch(function(error){
      console.log(error);
      alert("생성 실패..! 다시 시도해주세요.");
      props.modalState();
    })
    .finally(function(){
      setDisableBtn(false);
    });
  }
  
  const imageURL = defaultImg; 
  const fileName = 'defaultImg.png';

  function onGenarateHandler(event) {
    imageURLtoFileObject(imageURL, fileName)
      .then((fileObject) => {
        setFile(fileObject);
        genarateAlbume(fileObject);
      })
      .catch((error) => {
        console.error('파일 변환 에러 발생:', error);
        alert("생성 실패..! 다시 시도해주세요.");
        props.modalState();
      });
  }

  function NextBtn() { // input의 조건을 검사하여 일치할 시 활성화 된 '다음' 버튼 return
    if(albumTitle.length > 0 && albumTitle.length < 11){ // album title 의 조건 검사 (중복검사, 글자 수 제한)
      return <div style={{fontSize:'1.75vh', color:'#1C66FD'}} onClick={goToPage2}>다음</div> // 활성화됨
    } else {
      return <div style={{fontSize:'1.75vh',color:'#B7B6B4'}}>다음</div> // 비활성화
    }
  }

  function GenarateBtn() { // input의 조건을 검사하여 일치할 시 활성화 된 '생성' 버튼 return
    if(userIdList.length > 0){ // userId의 조건 검사
      if(!disableBtn)  
        return <div style={{fontSize:"1.75vh",color:'#1C66FD'}} onClick={onGenarateHandler}>생성</div> // 활성화됨
      else
        return <div style={{fontSize:"1.75vh",color:'#1C66FD'}}>생성 중..</div> // 활성화됨
    } else {
      return <div style={{fontSize:"1.75vh",color:'#B7B6B4'}}>생성</div> // 비활성화
    }
  }
  

  if(pageIdx == 1){
    return content[0];
  } else if (pageIdx == 2) {
    return content[1];
  } else if (pageIdx == 3){
    return content[2];
  }
}

export default App;