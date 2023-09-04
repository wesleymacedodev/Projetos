import React, {useRef, useEffect} from 'react'
import {Keys} from './styled'
import Key from "./Components/Key"

export default function Index({letters, setLetters}) {
  const keyboard = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L","Ç"],
    ["Z","X","C","V","B","N","M"]
  ]
  return (
    <div>
      {keyboard.map(
        (_, index) => (
        <Keys key={index}>
          {
          keyboard[index].map(
            (valueKey, valueIndex) => (
            <Key key={valueIndex} letter={valueKey} letters={letters} setLetters={setLetters}>{valueKey}</Key>
            ))
          }
        </Keys>)
      )}

    </div>
  )
}
