import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postDog, getTemperament } from '../../../redux/actions'
import validation from '../../../utils/validationNewDog'
import styles from './createNewDog.module.css'
import Nav from '../../Nav/Nav';

export default function Create(){
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const allTemperaments = useSelector((state) => state.dogTemps); 

    const [newDog, setNewDog] = useState({
        name: '',
        image: '',
        life_span:'',
        weight_min: '',
        weight_max: '',
        height_min: '',
        height_max: '',
        temperament: []
    });   

    const [errors, setErrors] = useState({
        name:'dogs name is required',
        life_span:'',
        weight_min:'',
        weight_max:'',
        height_min:'',
        height_max:'',
        temperament:''
    });


    useEffect(()=>{
        dispatch(getTemperament())
    },[dispatch]);

    function handleChange(e){
        e.preventDefault();

        setNewDog({
            ...newDog,
            [e.target.name]: e.target.value
        });

        setErrors(validation({
            ...newDog,
            [e.target.name]: e.target.value
        }));
    };

    function handleTemperament(e){
        e.preventDefault();
        const selectedTemperament=e.target.value;

        if (newDog.temperament.includes(selectedTemperament)) {     //Para evitar que se agregue dos veces el mismo temperamento
            setNewDog({
              ...newDog,
              temperament: newDog.temperament.filter(temp => temp !== selectedTemperament)
            });
          } else {
            setNewDog({
              ...newDog,
              temperament: [...newDog.temperament, selectedTemperament]
            });
            setErrors({
                ...errors,
                temperament:null
            });
          }
    };



    function handleTemperamentDelete(temperament){
        const updatedTemperaments = newDog.temperament.filter((temp) => temp !== temperament);
        setNewDog({
            ...newDog,
            temperament: updatedTemperaments
        });
    };

    

    function handleSubmit(e){
        e.preventDefault();
        console.log("Valores de altura mínima y máxima:", newDog.height_min, newDog.height_max);
        console.log("Valores del nuevo perro:", newDog.temperament);

        if(!errors.name&&!errors.life_span&&!errors.weight_min&&!errors.weight_max&&!errors.height_max&&!errors.height_min&&!errors.temperament){
            dispatch(postDog(newDog));
    
            alert('Dog created successfully!');

            setNewDog({
                name: '',
                image:'',
                life_span:'',
                weight_min: '',
                weight_max: '',
                height_min: '',
                height_max: '',
                temperament: []
            });
    

            navigate('/home');
        } else alert('Data is missing or incorrect!')
    }


    return(
        <div className={styles.layout}>
            <Nav/>
            
            <form className={styles.form} onSubmit={(e)=>handleSubmit(e)}>
            <h1>NEW DOG!</h1>
                <div className={styles.inputBox}>
                    <label>Name</label>
                    <input type="text" value={newDog.name} name='name' placeholder="Dog's name..." autoComplete='off' onChange={(e)=>handleChange(e)}></input>
                    {errors.name && (
                        <span className="error">{errors.name}</span>
                    )}
                </div>
                <div className={styles.inputBox}>
                    <label>Image</label>
                    <input type="text" value={newDog.image} name='image' autoComplete='off' placeholder='Enter url of the image...' onChange={(e)=>handleChange(e)}></input>
                    {errors.image && (
                        <span className="error">{errors.image}</span>
                    )}
                </div>
                <div className={styles.inputBox}>
                    <label>Life Span</label>
                    <input type="text" value={newDog.life_span} name='life_span' autoComplete='off' placeholder="Dog's lifespan in years..." onChange={(e)=>handleChange(e)}></input>
                    {errors.life_span && (
                        <span className="error">{errors.life_span}</span>
                    )}  
                </div>
                <div className={styles.inputBox}>
                <div className={styles.minmax}>
                    <div>
                        <label>Weight Min</label>
                        <input type="number" value={newDog.weight_min} name='weight_min' autoComplete='off' placeholder="Weight min in kg..." onChange={(e)=>handleChange(e)}></input>
                        {errors.weight_min && (
                        <span className="error">{errors.weight_min}</span>
                        )}  
                    </div>
                    
                    <div>
                        <label>Weight Max</label>
                        <input type="number" value={newDog.weight_max} name='weight_max' autoComplete='off' placeholder="Weight max in kg..." onChange={(e)=>handleChange(e)}></input>
                        {errors.weight_max && (
                            <span className="error">{errors.weight_max}</span>
                        )}  
                    </div>
                </div>
                </div>
                <div className={styles.inputBox}>
                    <div className={styles.minmax}>
                    <div>
                        <label>Height Min</label>
                        <input type="number" value={newDog.height_min} name='height_min' autoComplete='off' placeholder="Height min in cm..." onChange={(e)=>handleChange(e)}></input>
                        {errors.height_min && (
                            <span className="error">{errors.height_min}</span>
                        )}  
                    </div>
                    <div>
                        <label>Height Max</label>
                        <input type="number" value={newDog.height_max} name='height_max' autoComplete='off' placeholder="Height max in cm..." onChange={(e)=>handleChange(e)}></input>
                        {errors.height_max && (
                            <span className="error">{errors.height_max}</span>
                        )}
                    </div>
                    </div>
                </div>
                
                <div className={styles.inputBox}>
                    <label>Temperaments</label>
                    <select onChange={(e) => handleTemperament(e)} defaultValue={""}>
                        <option value="" disabled>Select temperaments</option>
                            {allTemperaments && allTemperaments.map((temperament) => (
                                <option key={temperament} value={temperament}>
                                    {temperament}
                                </option>
                            ))}
                    </select>
                            
                    {newDog.temperament.length > 0 && (
                     <div>
                        <label>Selected temperaments: </label>
                        {newDog.temperament.map((temp, index) => (
                            <p key={index}> {index===0 ?temp: `, ${temp}`} <button className={styles.deleteTemp} type='button' onClick={() => handleTemperamentDelete(temp)}>x</button></p>
                        ))}
                     </div>
                    )}
                    {errors.temperament && (
                                <span className="error">{errors.temperament}</span>
                            )}
                </div>

                <button type="submit" className={styles.submit}>Create Dog!</button>
            </form>
        </div>
    )
}
