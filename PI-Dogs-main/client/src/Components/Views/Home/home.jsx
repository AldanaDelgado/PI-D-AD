import React from "react";
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from '../../../redux/actions';
import Loading from "../Loading/loading";
import SearchBar from "../../SearchBar/searchBar";
import Nav from "../../Nav/Nav";
import Card from "../../Card/card"
import style from './home.module.css'
import Filter from "../../Filter/filter";
import Pagination from "../../Pagination/pagination";
import Icon from "../../../assets/icono-home.jpeg"

export default function Home(){
    const dispatch = useDispatch();
    

    const allDogs = useSelector((state)=>state.dogs);       

    //PAGINACION

    const [currentPage, setCurrentPage]=useState(1)     //Pagina actual y seteo de pagina actual, empieza en 1 porque siempre voy a entrar a la primera pagina


    const [dogsPerPage, setDogsPerPage]=useState(8)  //Cuantos dogs por pagina quiero


    const indexOfLastDog=currentPage*dogsPerPage  
    const indexOfFirstDog=indexOfLastDog-dogsPerPage


    const currentDogs= allDogs.slice(indexOfFirstDog,indexOfLastDog) //Esta const contiene los perros que van a tener la pagina actual


    function paginated(pageNumber){
        setCurrentPage(pageNumber)
    }


    useEffect(()=>{
        dispatch(getDogs());
    },[dispatch]);
      
    //LOADING
    const [loading, setLoading] = useState(true);       //para controlar si se debe mostrar LoadingPage o las cartas

    useEffect(()=>{
        if(currentDogs && currentDogs.length>0){    //verifico que los perros se carguen
            setLoading(false)
        }
    },[currentDogs]);


    function reset(e){
        e.preventDefault();
        setCurrentPage(1);
    }


    return(
        <div className={style.layout}>
            <div className={style.header}>  
                <img src={Icon} alt="Perro" className={style.Icon} />
                <h1>DOGS!</h1>
                <div className={style.nav}>
                    <Nav/>
                </div>
            </div>

        <div className={style.main}>

            <div className={style.leftSide}>
                <div className={style.search}>
                    <SearchBar/>
                </div> 
                {/* filtros y orden*/}
                <div className={style.filter}>
                    <Filter reset={(e)=>reset(e)}/>
                </div>
            </div>

            {/*cards y paginación*/}
            <div className={style.body}>
                {loading?(
                    <Loading />    
                ):(
                <><div className={style.spacePagination}>
                                {/*paginado*/}
                                <Pagination currentPage={currentPage} dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginated={paginated} />
                            </div><div className={style.spaceCards}>
                                    {currentDogs?.length === 0 ? (
                                        <h2 className={style.noDogs}>No dogs with these characteristics were found.</h2>
                                    ) : (
                                        currentDogs.map(el => {
                                            return (
                                                <Card key={el.id} id={el.id} name={el.name} image={el.image} temperament={el.temperament ? el.temperament : el.temperaments} weight_min={el.weight_min} weight_max={el.weight_max} />
                                            );
                                        }
                                        ))}
                                </div><div className={style.spacePagination}>
                                    
                                    <Pagination currentPage={currentPage} dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginated={paginated} />
                                </div></>
                )}
            </div>        
        </div>
        </div>
    )
}