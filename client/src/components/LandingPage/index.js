import React from 'react';
import FirstCap from './firstcap/FirstCap';
import SecondCap from './secondcap/SecondCap';
import ThirdCap from './thirdcap/ThirdCap';
import NavBar from './NavBar/NavBar';

function LandingPage() {
  return (
    <>
    <NavBar/>
    <FirstCap/>
    <SecondCap/>
    <ThirdCap/>
    </>
  )
}

export default LandingPage