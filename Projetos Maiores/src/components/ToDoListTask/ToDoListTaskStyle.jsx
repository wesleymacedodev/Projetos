import styled from "styled-components"
import { colorText } from "../../Color"

const Task = styled.ol( props => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textDecoration: props.status === "true" ? "line-through" : "none"
}))

const TaskTitle = styled.span({
    color: colorText,
    fontSize: "1rem",
    textOverflow: "ellipsis", 
    overflow: "hidden",
    width: "80%"
})

const TaskActions = styled.div({
    display: "flex",
    justifyContent: "flex-end",
    width: "20%",
    color: colorText,
    fontSize: "1rem",
    gap: 5
})

const TaskAction = styled.div({
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "filter .5s",
    "&:hover": {
      filter: "brightness(1.05)"
    }
})



export { Task, TaskTitle, TaskActions, TaskAction };