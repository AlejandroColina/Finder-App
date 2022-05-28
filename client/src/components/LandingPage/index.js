import React from 'react';
import FirstCap from './firstcap/FirstCap';
import SecondCap from './secondcap/SecondCap';
import ThirdCap from './thirdcap/ThirdCap';
import logo from '../../assets/logo_finder_white.png';
import s from './styles.module.css';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import logoutImg from '../../assets/logout_white.png';

function LandingPage() {
  const { isAuthenticated, user } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  if (isAuthenticated) {
    var onlyFirst = user.name.split(' ');
  }
  return (
    <>
      <div className={s.nav}>
        <a href="/home"><img className={s.logo} src={logo} alt='finder' /></a>
        {isAuthenticated ?
          <div className={s.boxItems}>
            <a href="#3" className={s.navItems}>EXPERIENCIA FINDER</a>
            <div className={s.infoUser}>
              <img className={s.avatarImg} src={user.picture} alt='avatar' />
              <div className={s.salir}>{onlyFirst[0].toUpperCase()}</div>
              <button title='Salir' className={s.salir} onClick={() => logout({ returnTo: window.location.origin })}>
                <img src={logoutImg} alt='logout' height='25px' /></button>
            </div>
          </div> :
          <div className={s.boxItems}>
            <Link to='/home' className={s.navItems}><div>HOME</div></Link>
            <a href="#2" className={s.navItems}>OFRECE</a>
            <a href={() => { loginWithRedirect() }} className={s.navItems}>INGRESA</a>
            <a href="#3" className={s.navItems}>EXPERIENCIA FINDER</a>
          </div>
        }
      </div>
      <section id="1"><FirstCap /></section>
      <section id="2"><SecondCap /></section>
      <section id="3"><ThirdCap /></section>
    </>
  )
}

export default LandingPage