import React from "react";
import {NavLink} from 'react-router-dom'
import style from './landing.module.css'

function Landing(){
    return(
      <div className={style.layout}>
          <div className={style.land}>
              <h1>Welcome to Dog's World!</h1>
              <NavLink to='/home' style={{textDecoration:'none'}}>
                  <button></button>
              </NavLink>
              
          </div>
        
      </div>
    )
}

export default Landing;