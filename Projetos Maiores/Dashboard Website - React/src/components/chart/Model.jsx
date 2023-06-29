import React from 'react'
import style from './Model.module.css'

export default function Model(props) {

  return (
    <div className={style.model} style={{gridArea: props.grid}}>
        <h3 className={style.title}>{props.title}</h3>
        {props.children}
    </div>
  )
}
