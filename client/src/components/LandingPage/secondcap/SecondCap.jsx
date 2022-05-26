import React from "react";
import s from './SecondCap.module.css';
import one_step from './img_one_step.png';
import second_step from './img_second_step.png';
import third_step from './img_third_step.png';
import fast from '../../../assets/logo_finder_light_blue.png';

export default function FirstCap(){
    return(
        <div className={s.container}>
            <div className={s.column}>
                <div className={s.title}>Convertite en EMPRENDEDOR</div>
                <p  className={s.p}>Aumenta tu <span className={s.importantText}>visibilidad</span> en el mercado laboral y ofrece tus servicios de forma <span className={s.importantText}>rapida</span> y <span className={s.importantText}>sencilla</span></p>
                <hr/>
                <img  className={s.imgFinder} src={fast} alt='registrate ahora'/>
                <hr/>
                <button className={s.registrateBtn}>REGISTRATE</button>
            </div>
            <div className={s.stepsContainer}>
                <div className={s.stepsCard}>
                    <div className={s.stepsNumber}>1º</div>
                    <div className={s.stepsDetail}>Crea tu perfil de emprendedor registrandote en nuestra app</div>
                    <img className={s.stepsImg} src={one_step} alt='one step'/>
                </div>
                <hr/>
                <hr/>
                <div className={s.stepsCard}>
                    <img className={s.stepsImg} src={second_step} alt='second step'/>
                    <div className={s.stepsDetail}>Comparti tus proyectos a traves de fotos y recomendaciones</div>
                    <div className={s.stepsNumber}>2º</div>
                </div>
                <hr/>
                <hr/>
                <div className={s.stepsCard}>
                    <div className={s.stepsNumber}>3º</div>
                    <div className={s.stepsDetail}>Suma puntos con tus trabajos realizados y destacate en lo te gusta hacer !</div>
                    <img className={s.stepsImg} src={third_step} alt='third step'/>
                </div>
            </div>
        </div>
    )
}