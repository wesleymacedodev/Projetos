import {
  PomodoroActions,
  PomodoroTimer,
  PomodoroTimers,
  PomodoroTimersElement,
  PomodoroBox,
  Pomodoro,
  PomodoroConfig,
} from "./AppStyle";
import { useState } from "react";
import { FaCog } from "react-icons/fa";

function App() {
  const [defaultTime, setDefaultTime] = useState({
    pomodoro: 2700,
    short: 900,
    long: 1800,
  });
  const [time, setTime] = useState(defaultTime);
  const [intervalID, setIntervalID] = useState(null);
  const [pomodoro, setPomodoro] = useState("pomodoro");
  const [configModal, setConfigModal] = useState(false);

  const audio = new Audio(require("./alarm.mp3"));

  function convertTime() {
    const formatTime = time[pomodoro];
    const minutes = Math.floor(formatTime / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(formatTime % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function stopTimer() {
    if (intervalID !== null) {
      clearInterval(intervalID);
      setIntervalID(null);
    }
  }

  function startTimer() {
    if (intervalID === null && time[pomodoro] > 0) {
      const startInterval = setInterval(() => {
        setTime((newTime) => {
          if (newTime[pomodoro] >= 1) {
            let oldTime = { ...newTime };
            oldTime[pomodoro]--;
            return oldTime;
          } else {
            audio.play();
            clearInterval(startInterval);
            setIntervalID(null);
            return newTime;
          }
        });
      }, 1000);
      setIntervalID(startInterval);
    }
  }

  function resetTimer() {
    if (intervalID === null) {
      clearInterval(intervalID);
      setIntervalID(null);
      setTime(defaultTime);
    }
  }

  function configSave() {
    const valuePomodoro = document.getElementById("pomodoro").value;
    const valueShort = document.getElementById("short").value;
    const valueLong = document.getElementById("long").value;
    setDefaultTime({
      pomodoro: valuePomodoro,
      short: valueShort,
      long: valueLong,
    });
    resetTimer();
  }

  return (
    <Pomodoro className="App">
      <PomodoroBox>
        <PomodoroTimers>
          <PomodoroTimersElement
            pomodorostatus={String(pomodoro === "pomodoro")}
            onClick={() => setPomodoro("pomodoro")}
          >
            Pomodoro
          </PomodoroTimersElement>
          <PomodoroTimersElement
            pomodorostatus={String(pomodoro === "short")}
            onClick={() => setPomodoro("short")}
          >
            Pausa Pequena
          </PomodoroTimersElement>
          <PomodoroTimersElement
            pomodorostatus={String(pomodoro === "long")}
            onClick={() => setPomodoro("long")}
          >
            Pausa Longa
          </PomodoroTimersElement>
        </PomodoroTimers>
        <PomodoroTimer>
          <span>{convertTime()}</span>
        </PomodoroTimer>
        <PomodoroActions>
          <button
            onClick={() => {
              startTimer();
            }}
          >
            Começar
          </button>
          <button
            onClick={() => {
              stopTimer();
            }}
          >
            Parar
          </button>
          <button
            onClick={() => {
              resetTimer();
            }}
          >
            Resetar
          </button>
          <button
            onClick={() => {
              setConfigModal(!configModal);
              configSave();
            }}
          >
            <FaCog />
          </button>
        </PomodoroActions>
        <PomodoroConfig modalstatus={configModal.toString()}>
          <div>
            <label htmlFor="pomodoro">Pomodoro</label>
            <input
              type="text"
              id="pomodoro"
              value={defaultTime["pomodoro"]}
              onChange={() => configSave()}
            />
          </div>
          <div>
            <label htmlFor="short">Pausa Pequena</label>
            <input
              type="text"
              id="short"
              value={defaultTime["short"]}
              onChange={() => configSave()}
            />
          </div>
          <div>
            <label htmlFor="long">Pausa Longa</label>
            <input
              type="text"
              id="long"
              value={defaultTime["long"]}
              onChange={() => configSave()}
            />
          </div>
        </PomodoroConfig>
      </PomodoroBox>
    </Pomodoro>
  );
}

export default App;
