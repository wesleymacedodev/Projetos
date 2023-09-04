import React from 'react'
import Images from '../../images'
import { Hangman } from './styled'


export default function Index({number}) {
  return (
    <Hangman src={Images[number]} alt="Hangman"/>
  )
}
