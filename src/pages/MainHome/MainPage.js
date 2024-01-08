import styles from "./MainPage.module.css";
import stylesTab1 from "./MainPageTab1.module.css";
import stylesTab2 from "./MainPageTab2.module.css";
import styled from "styled-components";
import {
  React,
  useState,
  useEffect,
  useRef
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PhotoAlbumModal from "./PhotoAlbumModal";
import client from "../../Client"
import AllposesContent from "../../Components/UI/AllposesContent";
import AlbumsIS from "../../Components/InfiniteScroll/AlbumsIS";
import LogoImg from "../../Assets/moamoa.svg"
import DefaultProfile from "../../Assets/defaultImg.png"
import createAlbumImg from "../../Assets/AddAlbum.svg";
import PhotoModal from "../../Components/UI/PhotoModal";
import Albums from "../../Assets/albums.png";
import SessionExpiration from "../../Components/Function/SessionExpiration";

const TabMenu = styled.div`
  margin-top: 2.88vh;
  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  list-style: none;
  width: 100%;

  .submenu {
    // 기본 Tabmenu 에 대한 CSS를 구현

    height : 7vh;
    text-align: center;
    line-height: 7vh;
    width: 47.28%;
    font-size: 1.7vh;
    border-bottom: 0.1vh solid white;
    font-size: 2.2vh;
    
  }

  .focused {
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
  }

`;

const MainPage = (props) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [userIcon, setUserIcon] = useState(DefaultProfile);

  //스왑 이벤트 처리
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current !== null) {
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - touchStartX.current;
      // 여기에서 deltaX를 이용하여 원하는 동작 수행

      if (deltaX > 100) {
        clickTab(0);
      } else if (deltaX < -100) {
        clickTab(1);
      }
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  //세션이 만료되었는지 검사
  SessionExpiration();

  useEffect(()=>{
    sessionStorage.setItem('category', 'ROLE_ADMIN');
    setUserIcon(sessionStorage.getItem('image'));
    setIsLogin(true);
  }, []);

  const location = useLocation();
  
  const [currentTab, clickTab] = useState(location.state!=null?location.state.tab:0);

  //console.log(decodeJWT.parseJwt(token));

  const menuArr = [
    { name: "포즈보기", content: <Tab1/> },
    { name: "사진첩", content: <Tab2/> },
  ];

  const selectMenuHandler = (index) => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    clickTab(index);
  };

  const handleImageError = (event) => {
    event.target.src = DefaultProfile;
  };

  if(isLogin){
    return (
      <div className={styles.App} onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}>
          <div className={styles.topNav}>
            <img className={styles.logo} src={LogoImg} onClick={()=>{navigate('/Random')}}></img>
            <img loading="lazy" className={styles.userIcon} src={userIcon} onError={handleImageError} onClick={()=>navigate('/mypage')}></img>
          </div>
          <TabMenu>
            {/*아래 하드코딩된 내용 대신에, map을 이용한 반복으로 코드를 수정
              li 엘리먼트의 class명의 경우 선택된 tab 은 'submenu focused', 나머지 2개의 tab은 'submenu' 
              <li className="submenu">{menuArr[0].name}</li>
              <li className="submenu">{menuArr[1].name}</li>
              <li className="submenu">{menuArr[2].name}</li> */}
            {menuArr.map((el, index) => (
              <div key={index} className={index === currentTab ? "submenu focused" : "submenu"}
                onClick={() => selectMenuHandler(index)}>
                  {el.name}
              </div>
            ))}
          </TabMenu>
          <div className={currentTab == 0 ? styles.borderL : styles.borderR}></div>
        {menuArr[currentTab].content}
      </div>
    );
  } else {
    return(
      <div className={styles.Loading}>
        <img loading="lazy" src={LogoImg}></img>
      </div>
    );
  }
};

export default MainPage;

const Tab1 = (props) => {

  const [imgUrl, setImgUrl] = useState("");
  const [people, setPeople] = useState(1);
  const [modal1, setModal1] = useState(false);

  const setRandPose = () => { //rand pose를 설정하는 함수
    if (sessionStorage.getItem('people') !== null) {
      setPeople(sessionStorage.getItem('people'));
    }
    client.get('/poses/random?peopleCount=' + people)
    .then(function(res) {
        setImgUrl(res.data.response.image);
    })
    .catch(function(err) {
        //console.log(err);
        //props.modalState();
    }).finally(function() {

    });
  }

  useEffect(()=>{
    setRandPose();
  }, [])


  // 모달창을 호출하기 전에 랜덤이미지를 get요청
  const modalState = () => {
    setRandPose();
    setModal1(!modal1);
  }
  
  
  return(
    <div className={stylesTab1.Tab1}>
      {modal1 ? <PhotoModal modalState={modalState} modal={modal1} imgUrl={imgUrl}/>: null}
      <div className={stylesTab1.B}><div className={stylesTab1.Banner} onClick={modalState}>
        <div className={stylesTab1.BannerComment}>재밌는 포즈가 생각 안나시나요?</div>
        <div className={stylesTab1.BannerComment2}>지금 랜덤 포즈 뽑아보세요!</div>
      </div>
      </div>
      <AllposesContent height='57vh'/>
    </div>
  )
}

const Tab2 = (props) => {
  const [Tab2headerComponent, setTab2headerComponent] = useState(
    <div className={stylesTab2.tap2Header}>
      <div className={stylesTab2.tap2HeaderTitle}><span>{sessionStorage.getItem("nickname")}</span>님의 추억</div>
    </div>
  );

  //console.log(decodeJWT.parseJwt(sessionStorage.getItem('token')));

  const [modal, setModal] = useState(false);
  const [album,setAlbum] = useState([0]);

  const modalState = () => {
    setModal(!modal);
  }

  useEffect(() => {
    client.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
    client.get("/albums", {
      params: { page : 0 }
    }).then(function(res){
      // console.log(res);
      setAlbum(res.data.response);
    }).catch(function(err){
      // console.log(err);
    });
  }, [])

  return(
    <div className={stylesTab2.Tab2}>
      { /* modal 인터페이스 */}
      { modal == true ? <PhotoAlbumModal modalState={modalState} /> : null } 
      { album.length === 0 
      ? <div className={stylesTab2.bg}>
        {Tab2headerComponent}
        <img src={Albums} className={stylesTab2.albumimg}/>
        <div className={stylesTab2.comment1}>아직 사진첩이 없어요</div>
        <div className={stylesTab2.comment2}>화면 아래 사진첩 아이콘을 눌러</div>
        <div className={stylesTab2.comment2}>소중한 사람들과 추억을 공유해보세요!</div> 
      </div>
      
      : <AlbumsIS heightOfComponent={'79vh'} headerScrolledComponent={Tab2headerComponent}/>}
      <div className={stylesTab2.createAlbum} onClick={()=>{setModal(!modal)}}>
        <img src={createAlbumImg}/>
      </div>
    </div>
  )
}
