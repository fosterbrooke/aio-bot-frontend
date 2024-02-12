import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import "./assets/nucleo-icons.css";
import Dashboard from "./components/chat-page/Dashboard";
import Train from "./components/Train";
import {createContext, useEffect, useState} from "react";
import Login from "./components/auth-page/Login";
import Registration from "./components/auth-page/Registration";
import Footer from "./components/common/footer/Footer";
import VerifyAccount from "./components/auth-page/VerifyAccount";
import RecoveryPassword from "./components/auth-page/RecoveryPassword";
import Home from "./components/home-page/Home";
import ResetPassword from "./components/auth-page/ResetPassword";
import {getLocalStorage} from "./scripts/common/helpers/localStorage";
import {useDispatch} from "react-redux";
import {setIsAuth, setTheme} from "./scripts/store/slices/app/app-slices";
import {useMeQuery} from "./scripts/api/auth-api";
export const DataContext = createContext();

function App() {
  const [data, setData] = useState({});
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, data:auth } = useMeQuery();



  const isChatPath = location?.pathname === '/chat';

  useEffect(()=>{
    const theme= getLocalStorage('theme')
    dispatch(setTheme(theme))
    dispatch(setIsAuth())


  },[])

  useEffect(()=>{

    if (!isLoading) {
      console.log('auth!')
      console.log(data)
      console.log(isSuccess)
      dispatch(setIsAuth(auth));
    }

  },[isLoading, auth])


  return (
    <DataContext.Provider value={{ data, setData }}>
 {/*     <Sidebar />*/}
      <div className="App">
       {/* <Header />*/}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={auth ? <Navigate to="/" /> : <Login />} />
          {/*<Route path="/chat"  element= {!auth ? <Navigate to="/login" /> : <Dashboard />}/>*/}
          <Route path="/chat"  element= { <Dashboard />}/>
          <Route path="/train" element={<Train />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/verify" element={<VerifyAccount/>}/>
          <Route path="/recovery" element={<RecoveryPassword/>}/>
          <Route path="/reset_password" element={<ResetPassword/>}/>
        </Routes>
        {!isChatPath && <Footer />}
      </div>
    </DataContext.Provider>
  );
}

export default App;
