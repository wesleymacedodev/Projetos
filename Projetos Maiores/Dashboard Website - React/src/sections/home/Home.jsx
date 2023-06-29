import React from 'react'
import style from './Home.module.css'
import Dashboard from '../../components/dashboard/dashboard'
import NavBar from '../../components/navbar/NavBar'

export default function Home() {
  return (
    <section className={style.home}>
      <NavBar/>
        <div className={style.content}>
            <Dashboard/>
        </div>
    </section>
  )
}
