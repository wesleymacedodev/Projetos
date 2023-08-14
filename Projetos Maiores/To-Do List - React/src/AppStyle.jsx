import styled from "styled-components"
import { colorSecundary, colorTertiary, colorText } from "./Color"

const ToDoList = styled.section({
    position: "relative",
    minWidth: 250,
    maxWidth: 350,
    width: "30%",
    display: "flex",
    flexDirection: 'column',
    padding: 20,
    backgroundColor: colorSecundary,
    borderRadius: 15,
    gap: 20
})

const Title = styled.h1(
  {
    textAlign: "center",
    color: colorText,
  }
)

const ToDoListInput = styled.div({
    input: {
        width: "70%",
        padding: 5,
        border: "none",
        backgroundColor: colorTertiary,
        color: colorText
    },
    "input::placeholder": {
        color: colorText
    },
    "input:focus": {
        outline: "none"
    },
    button: {
        width: "30%",
        padding: 5,
        border: "none",
        backgroundColor: colorTertiary,
        color: colorText,
        cursor: "pointer",
        transition: "filter .5s"
    },
    "button:hover": {
        filter: "brightness(1.05)"
    }
})

const ToDoListTasks = styled.ul({
    backgroundColor: colorTertiary,
    padding: 5,
    minHeight: 26,
    maxHeight: 200,
    overflow: "auto",
})

const ToDoListProgress = styled.div({
    display: "flex",
    width: "100%",
    flexDirection: "row"
})

const ToDoListProgressElement = styled.span({
    display: "flex",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
    padding: 5,
    backgroundColor: colorTertiary,
    color: colorText,
    fontSize: "1rem",
    width: "100%"
})


export {ToDoList, Title, ToDoListInput, ToDoListTasks, ToDoListProgress, ToDoListProgressElement};