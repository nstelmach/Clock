import { useEffect, useState } from "react";

const useCountdown = (sessionLength, isEnabled, isDefault) => {
  let timeInMiliseconds = sessionLength * 60000;

  const [timeLeft, setTimeLeft] = useState(timeInMiliseconds);

  useEffect(() => {
    if (isEnabled) {
      const myInterval = setInterval(() => {
        setTimeLeft((prevState) => {
          return prevState - 1000;
        });
      }, 1000);

      return () => clearInterval(myInterval);
    } else if (!isEnabled) {
      if (isDefault) {
        setTimeLeft(timeInMiliseconds);
      }
      setTimeLeft((prevState) => {
        return prevState;
      });
    }
  }, [isEnabled, timeInMiliseconds, isDefault]);

  return getReturnValues(timeLeft);
};

const getReturnValues = (timeLeft) => {
  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return [minutes, seconds];
};

export { useCountdown };
