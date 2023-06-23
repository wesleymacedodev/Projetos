import React from 'react'
import Dropdown from '../dropdown/Dropdown'
import style from './Doubts.module.css'


export default function Doubts() {
  return (
    <div className={style.doubts}>
        <Dropdown
        title="Como faço para criar uma playlist no aplicativo?"
        description='Criar uma playlist é simples! Basta navegar até a seção de músicas, selecionar as faixas que deseja adicionar à playlist e clicar no botão "Adicionar à playlist". Você pode criar uma nova playlist ou adicionar as faixas a uma playlist existente.'/>
        <Dropdown
        title="É possível baixar músicas para ouvir offline?"
        description='Sim, você pode baixar suas músicas favoritas para ouvir offline. Basta encontrar a música desejada, clicar no ícone de download e ela será baixada para o seu dispositivo. Assim, você pode aproveitar sua música mesmo quando estiver sem conexão com a internet.'/>
        <Dropdown
        title="Posso criar minha própria biblioteca de músicas no aplicativo?"
        description="Com certeza! O aplicativo permite que você crie sua própria biblioteca de músicas personalizada. Basta adicionar as músicas que você mais gosta à sua biblioteca e elas ficarão disponíveis para acesso rápido e fácil sempre que desejar ouvi-las novamente."/>
    </div>
  )
}
