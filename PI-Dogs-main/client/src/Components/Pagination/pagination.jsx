import React from "react";
import style from './pagination.module.css'


export default function Pagination({dogsPerPage, allDogs, paginated, currentPage}){
    const pageNumber=[]

    for(let i=1;i<=Math.ceil(allDogs/dogsPerPage);i++){
        pageNumber.push(i)
    }

    return(
      <nav className={style.page}>
        <ul className={`pagination ${style.pagination}`}>
         {pageNumber?.map((number, index) => {
 
      if (number===currentPage || Math.abs(number-currentPage)===1) {
        return (
          <li className={`${style.number} ${currentPage===number? style.active:''}`} key={number}>
            <button className={style.btn} onClick={()=>paginated(number)}>
              {number}
            </button>
          </li>
        );
      } else if (index===0) {
 
        return (
          <li className={`${style.number}`} key={number}>
            <button className={style.btn} onClick={() => paginated(number)}>
              {number}
            </button>
          </li>
        );
      } else if (index===pageNumber.length-1) {

        return (
          <li className={`${style.number}`} key={number}>
            <button className={style.btn} onClick={() => paginated(number)}>
              {number}
            </button>
          </li>
        );
      }
      // Omitir  renderizado otras página
      return null;
      })}
        </ul>
      </nav>
    )
}