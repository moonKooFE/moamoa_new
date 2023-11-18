import { Route ,Routes} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Onboard from './pages/Onboard/Onboard';
import Oauth from './Components/Function/Oauth';
import FileUpload from './Components/UI/FileUpload';
import Random from './pages/Onboard/Random';
import SelectPersonnal from './pages/Onboard/SelectPersonnal';
import ShowRandPose from './pages/Onboard/ShowRandPose';
import Allpose from './pages/MainHome/Allpose';
import MainPage from './pages/MainHome/MainPage';
import PickPose from './pages/Onboard/PickPose';
import PhotoModal from './pages/MainHome/PhotoModal';
import PrivateFolder from './pages/PrivateFolder/PrivateFolder';
import Upload from "./pages/PrivateFolder/Upload";
import Escape from "./pages/PrivateFolder/EscapeModal";
import ManagingFolderModal from "./pages/PrivateFolder/ManagingFolderModal";
import MemberManageModal from "./pages/PrivateFolder/MemberManageModal";
import ModifyAlbumModal from "./pages/PrivateFolder/ModifyAlbumModal";

// mypage
import MyPage from "./pages/Mypage/myPage";
import ChangeProfile from "./pages/Mypage/changeprofile";
import ChangePW from "./pages/Mypage/changepassword";
import Inquiry from "./pages/Mypage/inquiry";
import Secossion from "./pages/Mypage/secession";
import Terms from './pages/Mypage/Terms';
import Privacy from './pages/Mypage/Privacy';

// 임시 로그인
import LogInForTest from "./pages/LoginForTest/loginpage2"

function App(){
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Random/>}/>
      <Route path="/Onboard" element={<Onboard/>}/>
      <Route path="/FileUpload" element={<FileUpload/>}/>
      <Route path="/Random" element={<Random/>}/>
      <Route path="/Oauth" element={<Oauth/>}/>
      <Route path="/SelectPersonnal" element={<SelectPersonnal/>}/>
      <Route path="/ShowRandPose" element={<ShowRandPose/>}/>
      <Route path="/Allpose" element={<Allpose/>}/> 
      <Route path="/MainPage" element={<MainPage/>}/>
      <Route path="/PickPose" element={<PickPose/>}/>
      <Route path="/PhotoModal" element={<PhotoModal/>}/>
      <Route path="/PrivateFolder" element={<PrivateFolder/>}/>
      <Route path="/Upload" element={<Upload/>}/>
      <Route path="/Escape" element={<Escape/>}/>
      <Route path="/ManagingFolderModal" element={<ManagingFolderModal/>}/>
      <Route path="/MemberManageModal" element={<MemberManageModal/>}/>
      <Route path="/ModifyAlbumModal" element={<Escape/>}/>

      {/* 마이페이지 */}
      <Route path="/mypage" element={<MyPage/>}/> 
      <Route path="/changeprofile" element={<ChangeProfile/>}/>
      <Route path="/changepassword" element={<ChangePW/>}/>
      <Route path="/inquiry" element={<Inquiry/>}/>
      <Route path="/secession" element={<Secossion/>}/>
      <Route path="/terms" element={<Terms/>}></Route>
      <Route path="/privacy" element={<Privacy/>}></Route>
      
      <Route path="/LogInForTest" element={<LogInForTest/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;