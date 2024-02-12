import React, {useState} from 'react';
import s from './Chat.module.css'
import User from "./User";
import moon from '../../assets/img/moon.svg'
import sun from '../../assets/img/sun.svg'
import {useDispatch, useSelector} from "react-redux";
import {selectTheme} from "../../scripts/store/slices/app/selectors";
import {setTheme} from "../../scripts/store/slices/app/app-slices";
import {setLocalStorage} from "../../scripts/common/helpers/localStorage";
const RightSidebar = () => {
    const [isOpen,setIsOpen]=useState(false)
    const theme=useSelector(selectTheme)

    const dispatch = useDispatch();
    const changeTheme=(value)=>{
        dispatch(setTheme(value))
        setLocalStorage('theme',value)
    }


    return (
        <div className={`${s.container_sidebar} ${s[`container_sidebar_${theme}`]}`}>
            <div className={s.container_theme}>

                <img src={sun} onClick={() =>changeTheme('light')} />
                <img src={moon} onClick={() => changeTheme('dark')} />

            </div>
            <div
                className={`${s.sidebar_btn} ${s[`sidebar_btn_${theme}`]}`} onClick={()=>setIsOpen(!isOpen)}>Invite a friend</div>

                <div className={s.invite_friends} style={{display:isOpen?'flex':'none'}}>
                     <input className={s.input_invite} placeholder='Please enter your friend’s email'/>
                         <button className={s.btn_invite}>send</button>
                 </div>

            <div className={s.line}></div>
            <User/>
            <User/>
            <User/>
            <User/>


        </div>
    );
};

export default RightSidebar;
