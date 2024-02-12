import React from 'react';
import s from './ProgressBar.module.css'
import  loading from '../../../assets/img/loading.gif'
const ProgressBar = () => {
    return (
        <div className={s.progress_container}>
            <img className={s.loading} src={loading}/>
        </div>
    );
};

export default ProgressBar;
