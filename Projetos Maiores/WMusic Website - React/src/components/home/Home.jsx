import React from 'react'
import style from "./Home.module.css"
import Download from "../elements/button/style_1/button"
import hand_phone from "../../images/hand_phone.svg"
import { FaGooglePlay, FaAppStore } from 'react-icons/fa'
import Plan from '../plan/Plan'
import About from '../about/About'
import Signup from '../signup/Signup'
import Community from '../community/Community'
import Doubts from '../doubts/Doubts'

export default function Home() {



  return (
    <section className={style.home}>
        <div className={style.home_content}>
        <h1 className={style.title}>W<span>MUSIC</span></h1>
        <p className={style.description}>Descubra sua trilha sonora perfeita com WMUSIC! Explore uma biblioteca vasta de musicas e novas experiências.</p>
        <div className={style.buttons}>
        
        <Download 
        icon={<FaGooglePlay style={{fontSize:"1.1rem"}}/>} 
        title="Download"
        description="Google Play"
        color="var(--default-text-color)"
        border="var(--android-text-color)"
        bgcolor="transparent"/>

        <Download 
        icon={<FaAppStore style={{fontSize:"1.1rem"}}/>} 
        title="Download"
        description="Apple Store"
        color="var(--default-text-color)"
        border="var(--ios-text-color)"
        bgcolor="transparent"/>
        </div>
        </div>
        <img className={style.hand_phone} src={hand_phone} alt="Imagem ilustrativa do aplicativo" />
        
        <Plan/>
        <About/>
        <Signup/>
        <Community/>
        <Doubts />

    </section>
  )
}
