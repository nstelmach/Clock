import React, { useEffect } from "react";
import classes from "./CountdownTimer.module.css";
import { useState } from "react";

const CountdownTimer = ({ minutes, seconds }) => {
  return (
    <ShowCounter minutes={minutes} seconds={seconds} isDanger={minutes < 1} />
  );
};

const ShowCounter = ({ minutes, seconds, isDanger }) => {
  const [timeLeft, setTimeLeft] = useState();
  useEffect(() => {
    setTimeLeft(() => {
      let finalMinutes;
      let finalSeconds;
      if (minutes.toString().length === 1) {
        finalMinutes = `0${minutes}`;
      } else {
        finalMinutes = `${minutes}`;
      }
      if (seconds.toString().length === 1) {
        finalSeconds = `0${seconds}`;
      } else {
        finalSeconds = `${seconds}`;
      }
      return `${finalMinutes}:${finalSeconds}`;
    });
  }, [minutes, seconds]);

  return (
    <div className={isDanger ? classes.countdownDanger : classes.timeLeft}>
      {timeLeft}
    </div>
  );
};

export default CountdownTimer;
