import React from 'react'
import { WrongKeys, Keys } from './styled'

export default function Index({WrongWords}) {
  return (
    <WrongKeys>
        Letras Errada : 
        {WrongWords.map((value, index) => <Keys key={index}>{value}</Keys>)}
    
    </WrongKeys>
  )
}
