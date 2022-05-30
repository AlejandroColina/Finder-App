import React from 'react';
import styles from './styles.module.css';

function Footer() {
    return (
        <div className={styles.container} >
            <div className={styles.footerU}></div>
            <div className={styles.footerD}>
                <div className={styles.div__politicas}>
                    <a href='https://app.websitepolicies.com/policies/questionnaire/privacy-policy'>
                        Política de Privacidad
                    </a>
                    <p> - </p>
                    <a href='https://policies.google.com/technologies/cookies?hl=en-US'>
                        Política de Cookies
                    </a>
                </div>
                <span>
                    Finder Agent S.L. - B.A Argentina, Tomo 32.063, Folio 52, Hoja B-201.583, Inscripción 1 NIF B-62084957
                </span>
            </div>
            <div className={styles.footerT}></div>
        </div>
    )
}

export default Footer