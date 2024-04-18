import { NavLink } from "react-router-dom";

import style from './Nav.module.css'

function Nav(){
    return(
        <div className={style.navBar}>
            <NavLink to='/home' className={style.link}> Home</NavLink>
            <NavLink to='/about' className={style.link}> About Us</NavLink>
            <NavLink to='/newdog' className={style.link}> New Dog </NavLink>
        </div>
    )
}

export default Nav;