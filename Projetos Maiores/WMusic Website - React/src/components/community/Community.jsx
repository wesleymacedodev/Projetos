import React from 'react'
import style from './Community.module.css'
import image_discord from '../../images/discord.png'
import { FaDiscord } from 'react-icons/fa'

export default function Community() {
  return (
    <section className={style.community}>
      <img className={style.image} src={image_discord} alt="" />
      <h3 className={style.title}>Faça parte da nossa comunidade!</h3>
      <p className={style.description}>Temos uma ótima notícia para você! Convidamos você a se juntar à nossa comunidade no Discord, um espaço online dedicado a todos os amantes da música. Aqui, você encontrará uma comunidade acolhedora e engajada, pronta para mergulhar em discussões musicais animadas, recomendar novos artistas e compartilhar playlists incríveis.</p>
      <button className={style.button}><FaDiscord/> Discord</button>
    </section>
  )
}
