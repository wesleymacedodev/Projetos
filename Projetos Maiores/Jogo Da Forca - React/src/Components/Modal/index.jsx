import React from 'react'
import { Background, Modal, Message, Description, Button } from './styled'

export default function Index({title, description}) {

  const refreshPage = () => {
    window.location.reload()
  }

  return (
    <Background>
        <Modal>
            <Message>{title}</Message>
            <Description>{description}</Description>
            <Button onClick={refreshPage}>Reiniciar</Button>
        </Modal>
    </Background>
  )
}
