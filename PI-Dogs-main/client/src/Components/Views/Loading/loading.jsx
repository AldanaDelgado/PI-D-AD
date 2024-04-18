import React from 'react';
import style from './loading.module.css'
import gif from "../../../assets/perrito-corriendo.gif";
import gif2 from "../../../assets/loading_blue.gif";


export default function LoadingPage(){
    return(
        <div className={style.layout}>
            <img src={gif} alt="Wait..." />
            <div className={style.loader}/>
            <h1>{'Please wait...'}</h1>
            <img src={gif2} alt="Loading..."style={{ width: '100px', height: '120px' }} />
        </div>
    )
}