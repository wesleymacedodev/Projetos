import React, { useState } from 'react'
import {
    FaBars,
    FaChartBar,
    FaCalendar,
    FaColumns,
    FaComments,
    FaCog,
    FaGripLinesVertical
} from 'react-icons/fa'
import style from './NavBar.module.css'

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className={style.navbar}>
    <div className={`${style.elements} ${openMenu ? style.active : ""}`} >
        <div className={style.elements_item}>
          <FaBars className={style.icon}/>
          <h3 className={style.elements_name}>Home</h3>
        </div>
        <div className={style.elements_item}>
          <FaChartBar className={style.icon}/>
          <h3 className={style.elements_name}>Chart</h3>
        </div>
        <div className={style.elements_item}>
          <FaCalendar className={style.icon}/>
          <h3 className={style.elements_name}>Calendar</h3>
          </div>
        <div className={style.elements_item}>
          <FaColumns className={style.icon}/>
          <h3 className={style.elements_name}>Info</h3>
          </div>
        <div className={style.elements_item}>
          <FaComments className={style.icon}/>
          <h3 className={style.elements_name}>Chat</h3>
          </div>
        <div className={style.elements_item}>
          <FaCog className={style.icon}/>
          <h3 className={style.elements_name}>Config</h3>
          </div>
    </div>
    <div className={style.button} onClick={() => {setOpenMenu(!openMenu)}}>
    <FaGripLinesVertical className={style.icon}/>
    </div>
    </nav>
  )
}
