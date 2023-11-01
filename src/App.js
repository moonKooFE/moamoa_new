import { Route ,Routes} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import KakaoBtn from './Components/Layout/KakaoBtn';
import SignUpBtn from './Components/Layout/SignUpBtn';
import Backnavbar from './Components/Layout/Backnavbar';
function App(){
  return (
    <BrowserRouter>
      <Backnavbar title={'회원가입'}/>

      <KakaoBtn/>
      <SignUpBtn/>
    </BrowserRouter>
  );
}

export default App;