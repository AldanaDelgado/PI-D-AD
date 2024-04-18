import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { getDogs, getTemperament, filterAndOrder } from "../../redux/actions";

import style from './filter.module.css'

function Filter ({reset}){
    const dispatch = useDispatch();

    const allTemperaments=useSelector((state)=>state.dogTemps)

    const filterOrig = useRef(null);
    const filterTemp = useRef(null);
    const orderName = useRef(null);
    const orderWeight = useRef(null);


    useEffect(()=>{
        dispatch(getTemperament());
    },[dispatch]);


    function handleFilterAndOrder(e) {
        e.preventDefault();
        const origin = filterOrig.current.value;
        const temperament = filterTemp.current.value;
        let orderByName = orderName.current.value;
        let orderByWeight = orderWeight.current.value;
    
        if(orderByName!=='Default'){
            orderWeight.current.value = "Default";
            orderByName = orderName.current.value;
        }
        if(orderByWeight!=='Default'){
            orderName.current.value = "Default";
            orderByWeight = orderWeight.current.value;
        }

        const filtersAndOrder = {
          origin,
          temperament,
          orderByName,
          orderByWeight
        };

        dispatch(filterAndOrder(filtersAndOrder));

        reset(e)
      }

    //Reset Filters
    function handleReset(e){
        e.preventDefault();

        dispatch(getDogs());

        reset(e);

        filterOrig.current.value='All';
        filterTemp.current.value='All';
        orderName.current.value='Default';
        orderWeight.current.value='Default';
    }

    return(
        <div className={style.filters}>
            <h2>Filters</h2>
            
            <button className={style.btnFilter} onClick={e=>{handleReset(e)}}>Reset Filters</button>

            {/*ordenamientos*/}
            {/*Orden alfabetico*/}
            <h5>Alphabetical<br/>order</h5>
            <select onChange={(e)=>handleFilterAndOrder(e)} ref={orderName} defaultValue='Default'>
                <option value='Default' disabled> - </option>
                <option value='nameAsc'>A - Z</option>
                <option value='nameDesc'>Z - A</option>
            </select>
                
            {/*peso*/}
            <h5>Order by weight</h5>
            <select onChange={(e)=>handleFilterAndOrder(e)} ref={orderWeight} defaultValue='Default'>
                <option value='Default' disabled> - </option>
                <option value='weightAsc'>Lower weight</option>
                <option value='weightDesc'>Greater weight</option>
            </select>

            {/*filtros*/}
            {/*temperamento*/}
            <h5>Temperaments</h5>
            <select onChange={e=>handleFilterAndOrder(e)} ref={filterTemp} defaultValue='All'>
                <option value='All'>All temperaments</option>
                {allTemperaments?.map((temp)=>(
                        <option value={temp} key={temp}>{temp}</option>
                ))}
            </select>
            {/*origen*/}
            <h5>Origen</h5>
            <select onChange={e=>handleFilterAndOrder(e)} ref={filterOrig} defaultValue='All'>
                <option value='All'>All dogs</option>
                <option value='API'>Existing dogs</option>
                <option value='DB'>Dogs created</option>
            </select>
        </div>
    )
}

export default Filter;
