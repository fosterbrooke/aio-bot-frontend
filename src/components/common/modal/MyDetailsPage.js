import React from 'react';
import s from "./Modal.module.css";
import avatar from '../../../assets/img/Avatars.png'

const MyDetailsPage = () => {
    return (
        <div>
            <div className={s.container}>
                <p>Name</p>
                <div className={s.name_container}>
                    <input className={s.input}/>
                    <button className={s.btn}>Change name</button>
                </div>
            </div>
            <div className={s.container}>
                <p>Profile Photo (Optional)</p>
                <div className={s.photo_container}>
                    <img src={avatar} className={s.avatar}/>
                    <button className={s.btn}>Change photo</button>
                </div>

            </div>
            <div className={s.container}>
                <p>Email</p>
                <input className={s.input}/>
            </div>
            <div className={s.container}>
                <p>Description (Optional)</p>
                <textarea className={s.input}/>
            </div>



        </div>
    );
};

export default MyDetailsPage;
