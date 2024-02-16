import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import "./assets/nucleo-icons.css";
import Dashboard from "./components/chat-page/Dashboard";
import Train from "./components/Train";
import {createContext, useEffect, useState} from "react";
import LoginPage from "./components/auth-page/LoginPage";
import RegistrationPage from "./components/auth-page/RegistrationPage";
import Footer from "./components/common/footer/Footer";
import VerifyAccountPage from "./components/auth-page/VerifyAccountPage";
import RecoveryPasswordPage from "./components/auth-page/RecoveryPasswordPage";
import Home from "./components/home-page/Home";
import ResetPassword from "./components/auth-page/ResetPasswordPage";
import {getLocalStorage} from "./scripts/common/helpers/localStorage";
import {useDispatch} from "react-redux";
import {setIsAuth, setTheme} from "./scripts/store/slices/app/app-slices";
import {useMeQuery} from "./scripts/api/auth-api";
import {useGetUserQuery} from "./scripts/api/chat-api";
import {setMe} from "./scripts/store/slices/chat/chat-slice";
import InformPage from "./components/auth-page/InformPage";
import {AuthRedirectLayout} from "./components/common/auth-redirect/AuthRedirect";
export const DataContext = createContext();

function App() {
  const [data, setData] = useState({});
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, data:auth } = useMeQuery();
 const {data:user}=useGetUserQuery("005c00b4-c441-45af-9190-f94f23262db9", {enabled: isSuccess})

  const isChatPath = location?.pathname === '/chat';

  useEffect(()=>{

    if (!isLoading) {
      dispatch(setIsAuth(auth))
    }

  },[isLoading, auth])

  useEffect(()=>{
    dispatch(setMe(user))
  },[user])


  useEffect(()=>{
    const theme= getLocalStorage('theme')
    dispatch(setTheme(theme))

  },[])



  return (
    <DataContext.Provider value={{ data, setData }}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={ <LoginPage />} />
            {/*<Route path="/login" element={auth ? <Navigate to="/" /> : <LoginPage />} />*/}
            {/*<Route path="/chat"  element= {!auth ? <Navigate to="/login" /> : <Dashboard />}/>*/}
            <Route path="/chat"  element= { <Dashboard />}/>
            <Route path="/train" element={<Train />} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/registration" element={<RegistrationPage/>}/>
            <Route path="/verify" element={<VerifyAccountPage/>}/>
            <Route path="/recovery" element={<RecoveryPasswordPage/>}/>
            <Route path="/reset_password" element={<ResetPassword/>}/>
            <Route path="/inform" element={<InformPage/>}/>
          </Routes>
          {!isChatPath && <Footer />}
        </div>
    </DataContext.Provider>
  );
}

export default App;
