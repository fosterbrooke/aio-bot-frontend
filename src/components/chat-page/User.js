import React, {useState} from 'react';
import avatar from '../../assets/img/Avatars.png'
import s from './Chat.module.css'
import menu from '../../assets/img/menu.svg'
import SettingsModal from "../common/modal/SettingsModal";
import {useSelector} from "react-redux";
import {selectTheme} from "../../scripts/store/slices/app/selectors";

const User = ({isMenu,user}) => {

    const [isMenuOpen,setIsMenuOpen]=useState(false)
    const [isOpenSettings,setIsOpenSettings]=useState(false)

    const theme=useSelector(selectTheme)

    const  handleSettings=()=>{
        setIsMenuOpen(false)
        setIsOpenSettings(true)
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
                    >Logout</p>
                </div>}

            <SettingsModal isOpen={isOpenSettings} setIsOpen={(value)=>setIsOpenSettings(value)}/>

        </div>
    );
};

export default User;
