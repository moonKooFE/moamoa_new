import styles from "./AllPosesContent.module.css";
import stylesTab1 from "./AllPosesTab1.module.css";
import styled from "styled-components";
import {
  React,
  useState,
  useEffect,
} from "react";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll"
import SelectPeopleModal from "./SelectPeopleModal";
import VectorForSelcectPeople from "../../Assets/VectorDown.svg"

const TabMenu = styled.div`  

  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 2.5vh;
  padding-bottom: 2.5vh;
  padding-left: 5.7vw;
  padding-right: 9.44vw;
  justify-content: space-between;
  list-style: none;
  width: calc(100% - 5.7% - 9.44%);
  background-color:white;

  .submenu {
    // 기본 Tabmenu 에 대한 CSS를 구현
    text-align : center;
    height: 4.5vh;
    line-height: 4.5vh;
    padding-left: 1.6vh;
    padding-right: 1.6vh;
    margin-right: 0.83vw;
    border-radius : 2vh;
    font-size: 1.75vh;
    transition : 0.5s;
    font-family: 'Pretendard-Medium';
  }

  .focused {
    color:white;
    background-color : #1C66FD;
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
  }

  span{
    display : flex;
  }

`;

const App = (props) => {
    // heightOfComponet={props.height}
    // location.state.people

    const location = useLocation();
    const [currentTab, clickTab] = useState(0);
    const [modal, setModal] = useState(false);
    const [init, setInit] = useState(true);

    const modalState = () => {
      setInit(false);
      setModal(!modal);
    }

    const menuArr = [
        { name: "추천", content: <Tab1 currentTab={currentTab} height={props.height}/> },
        { name: "스페셜", content: <Tab2 currentTab={currentTab} height={props.height}/> },
    ];

    const selectMenuHandler = (index) => {
        // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
        // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
        if(index == 0){
          sessionStorage.setItem('category', 'ROLE_ADMIN');
        } else {
          sessionStorage.setItem('category', 'ROLE_USER');
        }
        
        clickTab(index);
    }

    return (
        <div className={styles.App}>
            {/* modal 인터페이스 */}
            { modal == true ? <SelectPeopleModal modalState={modalState} /> : null } 
            <TabMenu>
                <span>
                {menuArr.map((el, index) => (
                <div key={index} className={index === currentTab ? "submenu focused" : "submenu"}
                    onClick={() => selectMenuHandler(index)}>
                    {el.name}
                </div>
                ))}
                </span>
                <div className={styles.selectPeople} onClick={modalState}>
                  { sessionStorage.getItem('people') === undefined || init ? <div>인원수<img style={{marginLeft:"0.83vw"}} src={VectorForSelcectPeople}/></div> : <div style={{textDecoration:"underline"}}>#{sessionStorage.getItem('people')}명이서</div> }
                </div>
            </TabMenu>
            <div className={currentTab == 0 ? styles.borderL : styles.borderR}></div>
            {menuArr[currentTab].content}
        </div>
    );
};
    


const Tab1 = (props) => {
    sessionStorage.setItem('category', 'ROLE_ADMIN'); // Tab1 이 로드될 때 category를 초기화
    const [Tab1headerComponet, setTab1headerComponet] = useState(); // 탭1의 header를 커스텀하는 변수
    
    return(
      <div className={stylesTab1.Tab1}>
        <InfiniteScroll heightOfComponent={props.height} headerComponent={Tab1headerComponet}/>
      </div>
    )
  }
  
const Tab2 = (props) => {
    const [Tab2headerComponet, setTab2headerComponet] = useState();
  
    return( 
      <div className={styles.Tab2}>
        <InfiniteScroll heightOfComponent={props.height} headerComponent={Tab2headerComponet}/>
      </div>
    )
}

export default App;