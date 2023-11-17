import styles from './SelectPersonnal.module.css';
import Backnavbar from '../../Components/Layout/Backnavbar';
import SelectPersonBar from '../../Components/Layout/SelectPersonBar';

function App(){ 
  return (
    <div className={styles.App2}>
      <div className={styles.content}>
        <div className={styles.backnavbar}>
          <Backnavbar title={"랜덤포즈 뽑기"} className={styles.title}/>
        </div>
        <div className={styles.inflow2Script}>
          <div className={styles.inflow2ScriptFirst}>몇 명이서 사진을<br/>찍을 건가요?</div>
          <div className={styles.inflow2ScriptSecond}>사람 수에 따른 포즈를 추천해드릴게요!</div>
        </div>
        <SelectPersonBar />
      </div>
    </div>
  )
}

export default App;