import React, { useEffect, useState } from 'react'
import logo from "../../images/logo.svg"
import style from './Navbar.module.css'
import {
  FaBars,
  FaTimes
} from "react-icons/fa"

export default function Navbar() {
  const [mobileMenu, setmobileMenu] = useState(false);
  useEffect(() => {
    document.body.style.overflowY = mobileMenu ? "hidden" : "auto";
  } ,[mobileMenu])

  return (
    <header>
    <nav className={style.navbar}>
        <img className={style.logo} src={logo} alt="logo"/>

        <ul className={`${style.elements} ${mobileMenu ? style.active_elements : null}`}>
          <li>Home</li>
          <li>Sobre</li>
          <li>Inscrever-se</li>
          <li className={style.download}>Baixar</li>
        </ul>
        { mobileMenu
          ? <FaTimes className={style.mobile} onClick={() => {setmobileMenu(!mobileMenu)}} />
          : <FaBars className={style.mobile} onClick={() => {setmobileMenu(!mobileMenu)}} />
        }
        
    </nav>
    </header>
  )
}
