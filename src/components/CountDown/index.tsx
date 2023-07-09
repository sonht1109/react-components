import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  DAY_TO_MILISEC,
  HOUR_TO_MILISEC,
  MIN_TO_MILISEC,
  SEC_TO_MILISEC,
} from "./constants";
import { Props, TimerState } from "./types";
import { padTimer } from "./utils";

const CountDown = React.forwardRef<{}, Props>(
  (props, ref) => {
    const {
      then,
      loading,
      onFinish,
      renderCompletionist,
      renderer,
      padNumber = 2,
    } = props;

    const refInterval = useRef<any>(null);

    const [timer, setTimer] = useState<TimerState>({
      d: null,
      h: null,
      m: null,
      s: null,
    });

    const counting = useCallback(() => {
      const now = new Date();
      const period = then.getTime() - now.getTime();
      const s = Math.floor(period / SEC_TO_MILISEC) % 60;
      const m = Math.floor(period / MIN_TO_MILISEC) % 60;
      const h = Math.floor(period / HOUR_TO_MILISEC) % 24;
      const d = Math.floor(period / DAY_TO_MILISEC);
      if (s >= 0) {
        setTimer((prev) => ({
          ...prev,
          s,
          m,
          h,
          d,
        }));
      } else {
        clearInterval(refInterval.current);
        onFinish?.();
      }
    }, [onFinish, then]);

    useEffect(() => {
      if (then) {
        if (refInterval.current) {
          clearInterval(refInterval.current);
        }
        const interval = setInterval(counting, 1000);
        refInterval.current = interval;
      }

      return () => clearInterval(refInterval.current);
    }, [counting, timer, then]);

    if (timer.s === 0) {
      if (renderCompletionist) {
        return renderCompletionist();
      }
    }

    if (timer.s === null) {
      if (loading) {
        return loading;
      }
      return null;
    }

    return renderer({
      day: padTimer(timer.d, padNumber),
      hour: padTimer(timer.h, padNumber),
      min: padTimer(timer.m, padNumber),
      sec: padTimer(timer.s, padNumber),
    });
  }
);

export default CountDown;
