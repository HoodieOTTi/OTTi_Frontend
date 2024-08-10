import React from 'react';
import KakaoLogin from './components/KakaoLogin';
import KakaoRedirectHandler from './pages/KakaoLogin/KakaoRedirectHandler';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import AddOttSubscription from './pages/AddOttSubscription/AddOttSubscription';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Home from './pages/';
// import Community from './pages/';
// import Pot from './pages/';
// import Profile from './pages/';
import MyPage from './pages/MyPage/MyPage';
import EditProfile from './pages/MyPage/EditProfile';
import Onboarding from './pages/Onboarding/OnBoarding';
import Login from './pages/Login/Login';
import SubscriptionDetail from './pages/SubscriptionDetail/SubscriptionDetail';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<KakaoLogin />} />
        <Route path="/api/oauth/kakao" element={<KakaoRedirectHandler />} />
        <Route path="/main" element={<Main />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/myPage/editProfile" element={<EditProfile />} />
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/main/addOttSubscription"
          element={<AddOttSubscription />}
        />
        {/* <Route path="/home" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/pot" element={<Pot />} />
        <Route path="/profile" element={<Profile />} /> */}
        <Route path="/main" element={<Main />} />
        <Route
          path="/main/subscriptionDetail/:id"
          element={<SubscriptionDetail />} //경로 수정 필요 -> userid관련 issue
        />
      </Routes>
    </>
  );
};

export default App;
