import styled from 'styled-components'
import { colorSecundary, colorTertiary , colorText} from '../../Color'


const ToDoListBox = styled.div({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  backgroundColor: colorSecundary,
  borderRadius: 15,
  padding: 20,
}) 

const ToDoListForm = styled.div({})

const ToDoListClose = styled.div({
  color: colorText,
  fontSize: "1rem",
  cursor: "pointer",
  transition: "filter .5s",
  "&:hover": {
    filter: "brightness(1.05)"
  }
})

const ToDoListTitle = styled.h1({
  color: colorText
})

const ToDoListInput = styled.input({
  width: "100%",
  padding: 5,
  border: "none",
  backgroundColor: colorTertiary,
  color: colorText,
  "&:focus": {
    outline: "none"
  }
})

const ToDoListButton = styled.button({
  width: "100%",
  padding: 5,
  border: "none",
  backgroundColor: colorTertiary,
  color: colorText,
  transition: "filter .5s",
  cursor: "pointer",
  "&:hover": {
    filter: "brightness(1.05)"
}

})



export {ToDoListBox, ToDoListTitle, ToDoListInput, ToDoListButton, ToDoListClose, ToDoListForm}