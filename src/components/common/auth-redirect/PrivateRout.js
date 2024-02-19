import { Navigate, Outlet } from "react-router-dom";
import {useMeQuery} from "../../../scripts/api/auth-api";
import {useEffect, useState} from "react";
import {useGetUserQuery} from "../../../scripts/api/chat-api";
import {useDispatch} from "react-redux";
import {setMe} from "../../../scripts/store/slices/chat/chat-slice";
import ProgressBar from "../progress-bar/ProgressBar";
import {setIsAuth} from "../../../scripts/store/slices/app/app-slices";


function PrivateRoute({path}) {
    const [skip, setSkip] = useState(true)
    const { isLoading, isSuccess, isError, data:auth } = useMeQuery();
    const { data: user } = useGetUserQuery(auth?.id, { skip });

    const dispatch = useDispatch();


    useEffect(()=>{
        if(auth?.id){
           setSkip(false)
        }
    },[auth])

    useEffect(()=>{
        if(user){
            dispatch(setIsAuth(true))
            dispatch(setMe(user))
        }
    },[user])




    if (isLoading) {
        return <ProgressBar add_style={{background:"rgba(9, 1, 25)",opacity:1}} />
    }


    if(path==='chat'){
        return auth ? <Outlet /> : <Navigate to={'/login'}/>
    }
    if(path==='login'||path==='registration'){
        return !auth? <Outlet /> : <Navigate to={'/chat'}/>
    }


}

export default PrivateRoute;
