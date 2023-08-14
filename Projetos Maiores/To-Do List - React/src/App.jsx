import { useState } from "react";
import { Title, ToDoList, ToDoListInput, ToDoListTasks, ToDoListProgress, ToDoListProgressElement } from "./AppStyle"
import ToDoListTask from "./components/ToDoListTask/ToDoListTask";
import {FaList, FaTimes, FaCheck} from "react-icons/fa"

function App() {
  const [task, setTask] = useState("")
  const [updater, setUpdater] = useState("");

  function addTask() {
    let oldList = JSON.parse(localStorage.getItem("tasks")) || []
    let taskid = Math.floor(Math.random() * 10000);
    oldList.push({"task": {name: task, id: taskid, status: "false"}})
    localStorage.setItem("tasks", JSON.stringify(oldList))
    setTask("")
  }

  function loadTask() {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || []
    return taskList
  }

  function statusTask () {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || []
    let taskCompleted = taskList.filter(value => value.task.status === "true")
    let taskPending = taskList.filter(value => value.task.status === "false")
    return [taskList.length, taskCompleted.length, taskPending.length]
  } 

  return (
    <div className="App">
      <ToDoList>
          <Title>To-Do List</Title>
          <ToDoListInput>
            <input type="text" placeholder="Nome da tarefa" value={task} onChange={(e) => {setTask(e.target.value)}}/>
            <button onClick={() => {addTask(); setUpdater(!updater)}}>Adicionar</button>
          </ToDoListInput>
          <ToDoListTasks>
            {
              loadTask().map((value) => (
                <ToDoListTask task={value.task.name} key={value.task.id} task_id={value.task.id} updater={updater} setUpdater={setUpdater}/>
              ))
            }
          </ToDoListTasks>
          <ToDoListProgress>
            <ToDoListProgressElement><FaCheck/> {statusTask()[1]}</ToDoListProgressElement>
            <ToDoListProgressElement><FaTimes/> {statusTask()[2]}</ToDoListProgressElement>
            <ToDoListProgressElement><FaList/> {statusTask()[0]}</ToDoListProgressElement>
          </ToDoListProgress>
      </ToDoList>
    </div>
  );
}

export default App;
