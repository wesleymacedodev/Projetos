import Colors from "./Colors";
import styled from "styled-components";

const Pomodoro = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.primary};
  height: 100%;
  width: 100%;
`;

const PomodoroBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.secondary};
  padding: 20px;
  border-radius: 5px;
  max-width: 400px;
`;

const PomodoroTimers = styled.div`
  display: flex;
  gap: 25px;
  margin-bottom: 25px;
`;

const PomodoroTimersElement = styled.span`
  &:hover {
    background-color: ${(props) =>
      props.pomodorostatus === "true" ? null : Colors.selectedHover};
  }

  color: ${Colors.font};
  background-color: ${(props) =>
    props.pomodorostatus === "true" ? Colors.selected : null};
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.5s;
`;

const PomodoroTimer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  & span {
    color: ${Colors.font};
    font-size: 120px;
  }
`;

const PomodoroActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  margin-top: 25px;

  & button:hover {
    background-color: ${Colors.tertiaryHover};
  }

  & button {
    background-color: ${Colors.tertiary};
    color: ${Colors.font};
    padding: 10px 20px;
    flex-grow: 1;
    text-align: center;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.5s;
  }
`;

const PomodoroConfig = styled.div`
  margin-top: ${(props) => (props.modalstatus === "true" ? "25px" : "0")};
  max-height: ${(props) => (props.modalstatus === "true" ? "500px" : "0")};
  opacity: ${(props) => (props.modalstatus === "true" ? "1" : "0")};
  transition: all 0.5s ease;
  width: 100%;
  & div {
    display: ${(props) => (props.modalstatus === "true" ? "flex" : "none")};
    width: 100%;
  }
  & div label {
    margin-right: 15px;
    width: 35%;
    color: ${Colors.font};
  }
  & div input {
    flex-grow: 1;
    background-color: transparent;
    border: 1px solid ${Colors.font};
    padding: 3px;
    outline: none;
    color: ${Colors.font};
  }
`;

export {
  PomodoroActions,
  PomodoroTimer,
  PomodoroTimers,
  PomodoroTimersElement,
  PomodoroBox,
  PomodoroConfig,
  Pomodoro,
};
