import React from "react";
import s from './NavBar.module.css';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import logoutImg from '../../assets/logout_white.png';
import logo from '../../assets/logo_finder_white.png';
import Notificaciones from '../Home/notificaciones/notificaciones';

export default function NavBar() {
  const { isAuthenticated, user } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  if (isAuthenticated) {
    var onlyFirst = user.name.split(' ');
  }
  return (
    <>

      <div className={s.nav}>
        <Link to='/home'><img className={s.logo} src={logo} alt='finder' /></Link>
        {isAuthenticated ?
          <div className={s.boxItems}>
             <Notificaciones/>
            <div className={s.infoUser}>
              <img className={s.avatarImg} src={user.picture} alt='avatar' />
              <Link to={`/perfil/${user?.email}`} className={s.navItems}>  <div className={s.salir}>{onlyFirst[0].toUpperCase()}</div></Link>
              <button title='Salir' className={s.salir} onClick={() => logout({ returnTo: window.location.origin })}>
                <img src={logoutImg} alt='logout' height='25px' /></button>
            </div>
          </div> :
          <div className={s.boxItems}>
            <Link to='/home' className={s.navItems}><div>HOME</div></Link>
            <div onClick={() => { loginWithRedirect() }} className={s.navItems}>INGRESA</div>
          </div>
        }

      </div>
    </>
  )
}