import React from 'react';
import styles from './styles.module.css';

function Destacados({ Profesions, logoProfesion, imagen, nombres, descripcion, promedio, id }) {

    return (
        <div className={styles.card}>
            <section className={styles.cardImage}>
                <img className={styles.imgU} src={logoProfesion} href={nombres} />
            </section>
            <section className={styles.cardInfo}>
                <div className={styles.cardPhoto}>
                    <img className={styles.imgD} src={imagen} href={nombres} />
                </div>
                <div className={styles.cardInfoPerson}>
                    <h1>{Profesions}</h1>
                    <p className={styles.cardP}>{nombres}</p>
                    <p className={styles.cardP}>{descripcion}</p>
                    <p className={styles.cardP}>{promedio}</p>
                </div>
            </section>
        </div>
    )
}

export default Destacados