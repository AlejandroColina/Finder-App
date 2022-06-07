import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { Helmet } from 'react-helmet'

function Error() {
  return (
    <div className={styles.notFound}>
      <Helmet><title>Error</title></Helmet>
      <div className={styles.container}>
        <Link className={styles.linkError} to='/'>
          Ir a Finder
        </Link>
      </div>
    </div>
  )
}

export default Error