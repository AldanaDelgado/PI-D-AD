import React from 'react';
import { Link } from 'react-router-dom';
import style from './about.module.css';

const About = () => {
    return (
        <div className={style.layout}>
            <div className={style.contenedor}>

                <h1>Hola! Mi nombre es Aldana Delgado</h1>
                <div className={style.info}>
                    <div className={style.info1}>
                        <div className={style.foto}/>
                        <div className={style.platfomrs}>
                            <h3>Contacto:</h3>
                            <div className={style.btnsContact}>
                                <a href='https://www.linkedin.com/in/aldanadelgado/' rel="noopener noreferrer" target="_blank">
                                    <button className={style.linkedin}><span className={style.tooltip1}>@aldanadelgado</span></button>
                                </a>
                                <a href='https://github.com/aldanadelgado' rel="noopener noreferrer" target="_blank">
                                    <button className={style.github}><span className={style.tooltip2}>@aldanadelgado</span></button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={style.info2}>
                        <span>
                            Teniendo 6 perros, se me hizo divertido que me haya tocado este Proyecto Integrador. Además de aprender mucho de programación, también terminé aprendiendo sobre razas de perros y temperamentos que ni siquiera sabía que existían.
                            <br/>
                        </span>
                        <div className={style.bot}>
                            <h2>Sobre mí:</h2>
                            <span>
                                Disfruto pasar tiempo con mis perros, leer, ver películas y aprender cosas nuevas. 
                                <br/>
                                Una de mis metas es seguir aprendiendo y desarrollándome en el mundo de la programación, siempre buscando nuevos desafíos y oportunidades.
                                <br/>
                            </span>
                        </div>
                        
                    </div>
                </div>
            </div>
            <Link to='/home'>
                <button className={style.btnHome}> HOME </button>
            </Link>
        </div>
    );
};

export default About;