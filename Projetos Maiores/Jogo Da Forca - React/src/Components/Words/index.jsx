import React from 'react'
import { Key, Words } from './styled'

export default function Index({Word, Accert}) {

  return (
    <Words>
        {
        Word.split("").map(
          (value, index) => Accert.includes(value) ? <Key key={index}>{value}</Key> : <Key key={index}>-</Key>)
        }
    </Words>
  )
}
