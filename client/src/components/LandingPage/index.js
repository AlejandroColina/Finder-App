import React from 'react';
import FirstCap from './firstcap/FirstCap';
import SecondCap from './secondcap/SecondCap';
import ThirdCap from './thirdcap/ThirdCap';
import logo from '../../assets/logo_finder_white.png';
import s from './styles.module.css';
import {Link} from 'react-router-dom';

function LandingPage() {
  return (
    <>
    <div className={s.nav}>
      <a href="#1"><img className={s.logo} src={logo} alt='finder'/></a>
      <div className={s.boxItems}>
      <Link to='/home' className={s.navItems}><div>CONTRATA</div></Link>
      <a href="#2" className={s.navItems}>OFRECE</a>
      <a href="#3" className={s.navItems}>EXPERIENCIA FINDER</a>
      </div>
    </div>
    <seccion id="1"><FirstCap/></seccion>
    <section id="2"><SecondCap/></section>
    <section id="3"><ThirdCap/></section>
    </>
  )
}

export default LandingPage