import React from 'react'
import style from './Plans.module.css'
import {FaAngleDoubleRight} from 'react-icons/fa'

export default function Plans({title, description, price, benefits, button}) {
  return (
    <div className={style.plan}>
        <div className={style.header}>
        <h3>{title}</h3>
        <span>{price}</span>
        </div>
        <p className={style.description}>{description}</p>
        <ul className={style.list}>
            {benefits.map((value, index) => (
                <li className={style.list_element}><FaAngleDoubleRight className={style.list_element_icon}/>{value}</li>
        ))}
        </ul>
        <button className={style.button}>{button}</button>
    </div>
  )
}


