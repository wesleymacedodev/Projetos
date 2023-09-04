import React from 'react'
import {KeyStyled} from '../styled'

export default function Key({letter, letters, setLetters}) {
  return (
    <KeyStyled contain={(letters.includes(letter)).toString()} onClick={() => setLetters(letter)}>{letter}</KeyStyled>
  )
}
