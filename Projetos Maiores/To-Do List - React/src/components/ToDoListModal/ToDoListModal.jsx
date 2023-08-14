import React, { useState } from "react";
import {
  ToDoListBox,
  ToDoListClose,
  ToDoListTitle,
  ToDoListInput,
  ToDoListButton,
  ToDoListForm,
} from "./ToDoListModalStyle";
import { FaRegTimesCircle } from "react-icons/fa";

export default function ToDoListModal(props) {

  const [newTask, setNewTask] = useState(props.content)

  function editTask() {
      let taskList = JSON.parse(localStorage.getItem("tasks")) || []
      taskList.map((value) => {
        if(value.task.id === props.task_id) {
          value.task.name = newTask
        }
        return null
      })
      localStorage.setItem("tasks", JSON.stringify(taskList))
  }

  return (
    <ToDoListBox>
      <ToDoListClose onClick={() => {props.setModalStatus(!props.modalStatus)}}> 
        <FaRegTimesCircle />
      </ToDoListClose>
      <ToDoListForm>
        <ToDoListTitle>Editar</ToDoListTitle>
        <ToDoListInput value={newTask} onChange={e => setNewTask(e.target.value)}/>
        <ToDoListButton onClick={() => {editTask(); props.setModalStatus(!props.modalStatus); props.setUpdater(!props.updater)}}>Salvar</ToDoListButton>
      </ToDoListForm>
    </ToDoListBox>
  );
}
