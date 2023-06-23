import React from 'react'
import Plans from '../plans/Plans'
import style from './Plan.module.css'

export default function Plan() {
  return (
    <section className={style.plans_section}>
        <div className={style.header}>
        <h3 className={style.title}>Planos</h3>
        <p className={style.description}>Seja um usuário vip, aproveite ao máximo sua experiência musical com nossos planos.</p>
        </div>
        <div className={style.plans}>
        <Plans 
        title="Plano Gratuito"
        description="Suporta apenas uma conta."
        benefits={
        ["Presença de anúncios",
        "Musicas apenas on-line",
        "Sem suporte a playlists personalizadas",
        "Limite de 100 músicas por dia"
        ]}
        price="0R$"
        button="Assinar"/>

        <Plans 
        title="Plano Normal"
        description="Suporta apenas uma conta."
        benefits={[
        "Sem anúncios",
        "Musicas on-line e off-line",
        "Playlist personalizada",
        "Sem limite de músicas diárias",
        "Músicas disponíveis para download"
        ]}
        price="10R$"
        button="Assinar"/>

        <Plans 
        title="Plano Família"
        description="Suporta até 5 contas."
        benefits={[
        "Sem anúncios",
        "Musicas on-line e off-line",
        "Playlist personalizada",
        "Sem limite de músicas diárias",
        "Músicas disponíveis para download"
        ]}
        price="30R$"
        button="Assinar"/>
        </div>
    </section>
  )
}
