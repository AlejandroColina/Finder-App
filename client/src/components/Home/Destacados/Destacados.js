import React from 'react';
import styles from './styles.module.css';
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

import { Link } from "react-router-dom";




export default function Destacados({ Profesions, logoProfesion, imagen, nombres, descripcion, promedio, id, apellidos }) {
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
                            <h1 className={styles.cardH1}>{Profesions}</h1>
                            <p className={styles.cardPI}>{`${nombres}`}</p>
                            <p className={styles.cardP}>{descripcion}</p>

<Box sx={{ "& > legend": { mt: 2 } }}>
<Rating size="small" value={promedio} readOnly />
</Box>
                        </div>
                    </section>
                </Link>
            </div>
        </div>
    )
}