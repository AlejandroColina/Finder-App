import React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

function Destacados({ Profesions, logoProfesion, imagen, nombres, descripcion, promedio, id }) {
    let stars = []
    for (let i = 1; i <= promedio; i++) stars.push(i);
    return (
        <div className={styles.container} >
            <div className={styles.card}>
                <Link className={styles.linkCard} to={`/trabajo/${id}`}>
                    <section className={styles.cardImage}>
                        <img className={styles.imgU} src={logoProfesion} alt={nombres} />
                    </section>
                    <section className={styles.cardInfo}>
                        <div className={styles.cardPhoto}>
                            <img className={styles.imgD} src={imagen} alt={nombres} />
                        </div>
                        <div className={styles.cardInfoPerson}>
                            <h1>{Profesions}</h1>
                            <p className={styles.cardP}>{nombres}</p>
                            <p className={styles.cardP}>{descripcion}</p>
                            <p className={styles.cardPI}>
                                {
                                    stars.map(() => '⭐')
                                }
                            </p>
                        </div>
                    </section>
                </Link>
            </div>
        </div>
    )
}

export default Destacados