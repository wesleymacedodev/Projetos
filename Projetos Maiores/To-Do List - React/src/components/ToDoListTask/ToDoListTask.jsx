import React, { useEffect, useState } from "react";
import { FaTimes, FaRegEdit } from "react-icons/fa";
import { Task, TaskTitle, TaskActions, TaskAction } from "./ToDoListTaskStyle";
import ToDoListModal from "../ToDoListModal/ToDoListModal";

export default function ToDoListTask(props) {
  const [removeTask, setRemoveTask] = useState(false);
  const [statusTask, setStatusTask] = useState();
  const [modalTask, setModalTask] = useState(false);

  function deleteTask() {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskRemove = taskList.filter(
      (value) => value.task.id !== props.task_id
    );
    localStorage.setItem("tasks", JSON.stringify(taskRemove));
    setRemoveTask(true);
  }

  function setTaskStatus() {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.map((value) => {
      if (value.task.id === props.task_id) {
        value.task.status === "false"
          ? (value.task.status = "true")
          : (value.task.status = "false");
      }
      return null
    });
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }

  function getTaskStatus() {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.map((value) => {
      if (value.task.id === props.task_id) {
        setStatusTask(value.task.status);
      }
      return null
    });
  }

  useEffect(() => {
    getTaskStatus();
  });

  return removeTask ? null : (
    <>
      <Task status={statusTask}>
        <TaskTitle
          onClick={() => {
            setTaskStatus();
            getTaskStatus();
            props.setUpdater(!props.updater);
          }}
        >
          {props.task}
        </TaskTitle>
        <TaskActions>
          <TaskAction>
            <FaRegEdit
              onClick={() => {
                props.setUpdater(!props.updater);
                setModalTask(!modalTask);
              }}
            />
          </TaskAction>
          <TaskAction>
            <FaTimes
              onClick={() => {
                props.setUpdater(!props.updater);
                deleteTask();
              }}
            />
          </TaskAction>
        </TaskActions>
      </Task>
      {modalTask ? (
        <ToDoListModal
          modalStatus={modalTask}
          setModalStatus={setModalTask}
          content={props.task}
          task_id={props.task_id}
          updater={props.updater}
          setUpdater={props.setUpdater}
        ></ToDoListModal>
      ) : null}
    </>
  );
}
