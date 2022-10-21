import { useEffect, useState } from "react";
import SettingsItem from "./SettingsItem";
import classes from "./App.module.css";
import CountdownTimer from "./CountdownTimer";
import { useCountdown } from "./hooks/useCountdown";

function App() {
  const [breakLength, setBreakLength] = useState("5");
  const [sessionLength, setSessionLength] = useState("25");
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDefault, setIsDefault] = useState(true);
  const [isEnabledBreak, setIsEnabledBreak] = useState(false);
  const [isDefaultBreak, setIsDefaultBreak] = useState(true);
  const [isBreak, setIsBreak] = useState(false);
  const [isDefaultSession, setIsDefaultSession] = useState(true);

  function decrementBreakClickHandler() {
    setBreakLength((prevState) => {
      if (prevState > 2) {
        return +prevState - 1;
      } else {
        return "1";
      }
    });
  }

  function incrementBreakClickHandler() {
    setBreakLength((prevState) => {
      if (prevState < 59) {
        return +prevState + 1;
      } else {
        return "60";
      }
    });
  }

  function decrementSessionClickHandler() {
    setSessionLength((prevState) => {
      if (prevState > 2) {
        return +prevState - 1;
      } else {
        return "1";
      }
    });
  }

  function incrementSessionClickHandler() {
    setSessionLength((prevState) => {
      if (prevState < 59) {
        return +prevState + 1;
      } else {
        return "60";
      }
    });
  }

  const [minutesSession, secondsSession] = useCountdown(
    sessionLength,
    isEnabled,
    isDefault
  );
  const [minutesBreak, secondsBreak] = useCountdown(
    breakLength,
    isEnabledBreak,
    isDefaultBreak
  );

  function resetClickHandler() {
    setBreakLength("5");
    setSessionLength("25");
    setIsDefault(true);
    setIsEnabled(false);
    setIsDefaultBreak(true);
    setIsEnabledBreak(false);
    setIsBreak(false);
    setIsDefaultSession(true);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  }

  function playClickHandler() {
    if (isBreak) {
      isEnabledBreak ? setIsEnabledBreak(false) : setIsEnabledBreak(true);
      isDefaultBreak && setIsDefaultBreak(false);
      !isDefault && setIsDefault(true);
    } else if (!isBreak) {
      setIsDefaultSession(false);
      isEnabled ? setIsEnabled(false) : setIsEnabled(true);
      isDefault && setIsDefault(false);
      !isDefaultBreak && setIsDefaultBreak(true);
    }
  }

  useEffect(() => {
    if (minutesSession + secondsSession < 0) {
      setIsBreak(true);
    } else if (minutesBreak + secondsBreak < 0) {
      setIsBreak(false);
    }
  }, [minutesBreak, minutesSession, secondsBreak, secondsSession]);

  useEffect(() => {
    if (isBreak) {
      setIsEnabledBreak(true);
      setIsEnabled(false);
      playAudio();
      setIsDefault(true);
      setIsDefaultBreak(false);
    } else if (!isBreak) {
      if (!isDefaultSession) {
        setIsEnabled(true);
        setIsDefault(false);
      }
      setIsDefaultBreak(true);
      setIsEnabledBreak(false);
      playAudio();
    }
  }, [isBreak, isDefaultBreak, isDefaultSession]);

  function playAudio() {
    document.getElementById("beep").play();
  }

  return (
    <div>
      <div className={classes.mainLabel}>25 + 5 Clock</div>
      <div>
        <SettingsItem
          onClickDecrement={decrementBreakClickHandler}
          onClickIncrement={incrementBreakClickHandler}
          idLabel="break-label"
          label="Break Length"
          idButton1="break-decrement"
          idLength="break-length"
          length={breakLength}
          idButton2="break-increment"
        />
        <SettingsItem
          onClickDecrement={decrementSessionClickHandler}
          onClickIncrement={incrementSessionClickHandler}
          idLabel="session-label"
          label="Session Length"
          idButton1="session-decrement"
          idLength="session-length"
          length={sessionLength}
          idButton2="session-increment"
        />
      </div>
      {isBreak ? (
        <div className={classes.timer}>
          <div id="timer-label">Break</div>
          <div id="time-left">
            <CountdownTimer minutes={minutesBreak} seconds={secondsBreak} />
          </div>
        </div>
      ) : (
        <div className={classes.timer}>
          <div id="timer-label">Session</div>
          <div id="time-left">
            <CountdownTimer minutes={minutesSession} seconds={secondsSession} />
          </div>
        </div>
      )}
      <div className={classes.timerControl}>
        <button onClick={playClickHandler} id="start_stop">
          {((isEnabled || isEnabledBreak) && (
            <i className="fa-solid fa-pause fa-2x"></i>
          )) ||
            ((!isEnabled || !isEnabledBreak) && (
              <i className="fa-solid fa-play fa-2x"></i>
            ))}
        </button>
        <button onClick={resetClickHandler} id="reset">
          <i className="fa-solid fa-arrows-rotate fa-2x"></i>
        </button>
      </div>
      <audio
        id="beep"
        allow="autoplay"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

export default App;
