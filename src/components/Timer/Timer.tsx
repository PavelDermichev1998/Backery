import React, { useState } from 'react';
import { TimerProps } from './Timer.type.';
import TIMER_CONST from './Timer.dictionary';

interface ICountUp {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountDownTimer({ isRun, isReset, setIsReset }: TimerProps) {
  const [time, setTime] = useState<ICountUp>({
    hours: TIMER_CONST.HOURS,
    minutes: TIMER_CONST.MINUTES,
    seconds: TIMER_CONST.SECONDS,
  });

  const reset = () => {
    setTime({
      hours: TIMER_CONST.HOURS,
      minutes: TIMER_CONST.MINUTES,
      seconds: TIMER_CONST.SECONDS,
    });
    setIsReset(!isReset);
  };
  const tick = () => {
    if (time.seconds === 59 && time.minutes === 59) {
      setTime({
        hours: time.hours + 1,
        minutes: TIMER_CONST.MINUTES,
        seconds: TIMER_CONST.SECONDS,
      });
    } else if (time.seconds === 59) {
      setTime({
        hours: time.hours,
        minutes: time.minutes + 1,
        seconds: TIMER_CONST.SECONDS,
      });
    } else {
      setTime({ hours: time.hours, minutes: time.minutes, seconds: time.seconds + 1 });
    }
  };

  React.useEffect(() => {
    if (isRun) {
      if (isReset) {
        reset();
      }
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId);
    }
  });

  return (
    <div>
      <p>
        {`${time.hours
          .toString()
          .padStart(TIMER_CONST.TARGETLENGTH, TIMER_CONST.PADSTR)}:${time.minutes
          .toString()
          .padStart(TIMER_CONST.TARGETLENGTH, TIMER_CONST.PADSTR)}:${time.seconds
          .toString()
          .padStart(TIMER_CONST.TARGETLENGTH, TIMER_CONST.PADSTR)}`}
      </p>
    </div>
  );
}
