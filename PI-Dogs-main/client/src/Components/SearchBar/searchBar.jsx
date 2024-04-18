import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from '../../redux/actions';
import style from './searchBar.module.css'

export default function SearchBar(){
    const dispatch=useDispatch()


    let [name,setName]=useState('')

 
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }


    function handleSubmit(e){
        e.preventDefault()
        dispatch(getByName(name))


        setName('')
    }

    function handleKey(e){
        if(e.key==='Enter'){
            handleSubmit(e)
        }
    }

    return(
        <div className={style.group}>
            <input type="text" placeholder='Search...' value={name} onKeyDown={(e)=>handleKey(e)} onChange={(e)=>handleInputChange(e)}></input>
            <button className={style.btnS} type='submit' onClick={(e)=>handleSubmit(e)}>🔍︎</button>
        </div>
    )
}
