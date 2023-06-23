import React from 'react'
import style from './About_elements.module.css'

export default function About_elements({img, title, description, alt}) {
  return (
    <div className={style.about_elements}>
        <img className={style.image} src={img} alt={alt}/>
        <div className={style.content}>
            <h3 className={style.title}>{title}</h3>
            <p className={style.description}>{description}</p>
        </div>
    </div>
  )
}
