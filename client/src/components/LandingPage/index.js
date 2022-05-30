import React from 'react';
import FirstCap from './firstcap/FirstCap';
import SecondCap from './secondcap/SecondCap';
import ThirdCap from './thirdcap/ThirdCap';
import logo from '../../assets/logo_finder_white.png';
import s from './styles.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import logoutImg from '../../assets/logout_white.png';
import Help from '../Help/Help';

function LandingPage() {
  const history=useHistory();
  const { isAuthenticated, user } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  if (isAuthenticated) {
    var onlyFirst = user.name.split(' ');
  }
  return (
    <>
      <div className={s.nav}>
        <img className={s.logo} src={logo} alt='finder'onClick={()=>{
          setTimeout(
              history.push('./home'),1000
          )}}  />{
        
            isAuthenticated && user.email==='giulianob94@hotmail.com'
            ||isAuthenticated && user.email==='nicosuasnavar@gmail.com'
            ||isAuthenticated && user.email==='jheinemberstithjn@ufps.edu.co'
            ||isAuthenticated && user.email==='gabrielcontegrand10@gmail.com'
            ||isAuthenticated && user.email==='alejandro.colina@ucp.edu.co' 
             || isAuthenticated && user.email==='cami.zupanovich@gmail.com'? <div className={s.navItems} onClick={()=>{
              setTimeout(
                  history.push('./admin'),1000
              )}}>ADMINISTRAR</div> : null}
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
            <button onClick={() => { loginWithRedirect() }} className={`${s.navItems} ${s.btnIngresa}`}>INGRESA</button>
            <a href="#3" className={s.navItems}>EXPERIENCIA FINDER</a>
          </div>
        }
      </div>
      <section id="1"><FirstCap /></section>
      <section id="2"><SecondCap /></section>
      <section id="3"><ThirdCap /></section>
      <Help/>
    </>
  )
}

export default LandingPage