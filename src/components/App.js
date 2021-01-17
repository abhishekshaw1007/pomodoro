import React, { useState, useEffect } from "react";
import "../styles/App.css";

function App() {
  const [workingInterval, setworkingInterval] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [flag, setFlag] = useState(false);
  const [worksecond, setWorkinSecs] = useState(1500);
  const [breaksecond, setBreakSecs] = useState(300);
  const [currentStateofEmp, setCurrentStatus] = useState("work");
  const [resetFlag, ResetFlag] = useState(true);

  useEffect(() => {
    if (flag && currentStateofEmp === "work") {
      if (worksecond > 0) {
        const timer = setTimeout(() => {
          setWorkinSecs(worksecond - 1);
        }, 1000);
        return () => clearTimeout(timer);
      }
      if (worksecond === 0) {
        setCurrentStatus("break");
        setWorkinSecs(workingInterval * 60);
        alert("work duration is over");
      }
    }
    if (flag && currentStateofEmp === "break") {
      if (breaksecond > 0) {
        const timer = setTimeout(() => {
          setBreakSecs(breaksecond - 1);
        }, 1000);
        return () => clearTimeout(timer);
      }
      if (breaksecond === 0) {
        setBreakSecs(breakDuration * 60);
        alert("break duration is over");
        setCurrentStatus("work");
      }
    }
  }, [
    workingInterval,
    breakDuration,
    breaksecond,
    flag,
    currentStateofEmp,
    worksecond,
  ]);

  function reset() {
    console.log("INSIDE RESET");
    ResetFlag(true);
    setFlag(false);
    setCurrentStatus("work");
    setworkingInterval(25);
    setBreakDuration(5);
    setBreakSecs(300);
    setWorkinSecs(1500);
  }
  const secondsToMins = (secs) => {
    console.log(secs);
    let minis = parseInt(secs / 60) + "";
    let secos = parseInt(secs % 60) + "";
    if (minis.length === 1) {
      minis = "0" + minis;
    }
    if (secos.length === 1) {
      secos = "0" + secos;
    }
    return minis + ":" + secos;
  };
  const validateData = (d) => {
    try {
      if (!isNaN(d) && parseInt(d) >= 0) {
        return parseInt(d);
      } else return "";
    } catch (err) {}
  };
  const setEnteredTime = (e) => {
    console.log(e);
    if (breakDuration + workingInterval <= 0) {
      reset();
      return;
    }
    ResetFlag(false);
    setCurrentStatus("work");
    setWorkinSecs(workingInterval * 60);
    setBreakSecs(breakDuration * 60);
  };
  return (
    <div className="App">
      <div className="clock">
        <h1 className="timer">
          {currentStateofEmp === "work"
            ? secondsToMins(worksecond)
            : secondsToMins(breaksecond)}
        </h1>
        <h3>{currentStateofEmp === "work" ? "Work" : "Break"}-Time</h3>
      </div>
      <div>
        <button
          id="stop-btn"
          key="stop"
          onClick={() => {
            setFlag(false);
            ResetFlag(false);
          }}
          disabled={!flag}
        >
          Stop
        </button>
        <button
          id="start-btn"
          key="start"
          onClick={() => {
            setFlag(true);
            ResetFlag(false);
          }}
          disabled={flag}
        >
          start
        </button>
        <button
          id="reset-btn"
          key="reset"
          onClick={() => {
            reset();
          }}
          disabled={resetFlag}
        >
          Reset
        </button>
      </div>
      <br></br>
      <div>
        <input
          id="work-duration"
          placeholder="work duration"
          required
          type="Number"
          value={workingInterval}
          disabled={flag}
          onChange={(e) => setworkingInterval(validateData(e.target.value))}
        ></input>
        <input
          id="break-duration"
          placeholder="break duration"
          required
          type="Number"
          value={breakDuration}
          disabled={flag}
          onChange={(e) => setBreakDuration(validateData(e.target.value))}
        ></input>
        <button
          onClick={setEnteredTime}
          id="set-btn"
          type="submit"
          disabled={flag}
        >
          set
        </button>
      </div>
    </div>
  );
}
export default App;
