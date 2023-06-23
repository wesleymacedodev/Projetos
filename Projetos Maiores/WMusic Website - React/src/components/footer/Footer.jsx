import React from 'react'
import style from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={style.footer}>
        <div>
            © 2023, Feito por <a className={style.author} target='_blank' href='https://github.com/wesleymacedodev' rel='noreferrer'>Wesley Macedo</a>
        </div>
    </footer>
  )
}
