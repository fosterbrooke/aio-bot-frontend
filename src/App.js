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
import InformPage from "./components/auth-page/InformPage";
import PrivateRoute, {AuthRedirectLayout} from "./components/common/auth-redirect/PrivateRout";
export const DataContext = createContext();

function App() {
  const [data, setData] = useState({});
  const location = useLocation();
  const dispatch = useDispatch();


  const isChatPath = location?.pathname === '/chat';

  // useEffect(()=>{
  //
  //     console.log('USER',auth)
  //   if (!isLoading) {
  //     dispatch(setIsAuth(auth))
  //   }
  //
  // },[isLoading, auth])
  //
  // useEffect(()=>{
  //   dispatch(setMe(user))
  // },[user])


  useEffect(()=>{
    const theme= getLocalStorage('theme')
    dispatch(setTheme(theme))

  },[])



  return (
    <DataContext.Provider value={{ data, setData }}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={"/login"} element={<PrivateRoute path={"login"}/>}>
              <Route path="/login" element={ <LoginPage />} />
            </Route>
            <Route path={"/registration"} element={<PrivateRoute path={"registration"}/>}>
              <Route path="/registration" element={ <RegistrationPage />} />
            </Route>
              <Route path={"/chat"} element={<PrivateRoute path={"chat"}/>}>
                  <Route path="/chat"  element= { <Dashboard />}/>
              </Route>
            {/*<Route path="/login" element={auth ? <Navigate to="/" /> : <LoginPage />} />*/}
            {/*<Route path="/chat"  element= {!auth ? <Navigate to="/login" /> : <Dashboard />}/>*/}
            <Route path="/train" element={<Train />} />
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
