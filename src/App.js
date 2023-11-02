import { Route ,Routes} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import KakaoBtn from './Components/Layout/KakaoBtn';
import Backnavbar from './Components/Layout/Backnavbar';
import SignUpBtn_active from './Components/Layout/SignUpBtn_active';
import SignUpBtn_disabled from './Components/Layout/SignUpBtn_disabled';
function App(){
  return (
    <BrowserRouter>
      <Backnavbar title={'회원가입'}/>
      <KakaoBtn/>
      <SignUpBtn_active/>
      <SignUpBtn_disabled/> 
    </BrowserRouter>
  );
}

export default App;