import React, {useState} from 'react';
import avatar from '../../assets/img/Avatars.png'
import s from './Chat.module.css'
import menu from '../../assets/img/menu.svg'
import SettingsModal from "../common/modal/SettingsModal";
import {useDispatch, useSelector} from "react-redux";
import {selectTheme} from "../../scripts/store/slices/app/selectors";
import {clearLocalStorage} from "../../scripts/common/helpers/localStorage";
import {useLogoutQuery} from "../../scripts/api/auth-api";
import {setIsAuth} from "../../scripts/store/slices/app/app-slices";
import {setMe} from "../../scripts/store/slices/chat/chat-slice";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

const User = ({isMenu,user}) => {

    const [isMenuOpen,setIsMenuOpen]=useState(false)
    const [isOpenSettings,setIsOpenSettings]=useState(false)
    const [skip, setSkip] = useState(true)

    const { data } = useLogoutQuery( { skip:true });
    const [cookies,setCookies,removeCookie]=useCookies(['refresh_token'])
    const theme=useSelector(selectTheme)
    const dispatch = useDispatch();
    const navigate=useNavigate()

    const  handleSettings=()=>{
        setIsMenuOpen(false)
        setIsOpenSettings(true)
    }


    const handleLogout=()=>{
        setSkip(false)
        clearLocalStorage('access-token');
        dispatch(setIsAuth(false))
        dispatch(setMe(null))
        removeCookie('refresh_token');
        navigate('/login')
    }

    return (
        <div  className={`${s.user_container} ${s[`user_container_${theme}`]}`}>
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <img src={avatar} className={s.img_avatar}/>
                <p>{user.username||user.email}</p>
            </div>
            {isMenu&&   <img src={menu} className={s.img_menu} onClick={()=>setIsMenuOpen(!isMenuOpen)} />}
            {isMenuOpen&&
                <div className={`${s.menu_container} ${s[`menu_container_${theme}`]}`}>
                    <p
                       className={`${s.menu_item} ${s[`menu_item_${theme}`]}`}
                       onClick={()=>handleSettings()}
                       style={{borderRadius:'10px 10px 0px 0px'}}
                    >Setting</p>
                    <p
                        className={`${s.menu_item} ${s[`menu_item_${theme}`]}`}
                        style={{borderRadius:'0px 0px 10px 10px'}}
                        onClick={()=>handleLogout()}
                    >Logout</p>
                </div>}

            <SettingsModal isOpen={isOpenSettings} setIsOpen={(value)=>setIsOpenSettings(value)}/>

        </div>
    );
};

export default User;
