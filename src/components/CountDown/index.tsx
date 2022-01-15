import React, { useEffect, useRef, useState } from "react";
import {
  DAY_TO_MILISEC,
  HOUR_TO_MILISEC,
  MIN_TO_MILISEC,
  SEC_TO_MILISEC,
} from "./constants";
import { SCountDown } from "./styles";
import {
  CountdownImperativeHandle,
  ETimerElemen,
  Props,
  StateTimer,
} from "./types";
import { padTimerElemen } from "./utils";

const CountDown = React.forwardRef<CountdownImperativeHandle, Props>(
  (props, ref) => {
    const {
      then,
      hideHour = false,
      hideMin = false,
      hideSec = false,
      hideDay = false,
      loading,
      onFinish,
      renderCompletionist,
    } = props;

    const refInterval = useRef<any>(null);

    const [timer, setTimer] = useState<StateTimer>({
      d: null,
      h: null,
      m: null,
      s: null,
    });

    const counting = () => {
      const now = new Date();
      const period = then.getTime() - now.getTime();
      const s = Math.floor(period / SEC_TO_MILISEC) % 60;
      const m = Math.floor(period / MIN_TO_MILISEC) % 60;
      const h = Math.floor(period / HOUR_TO_MILISEC) % 24;
      const d = Math.floor(period / DAY_TO_MILISEC);
      if (s >= 0) {
        setTimer({
          ...timer,
          s,
          m,
          h,
          d,
        });
      } else {
        clearInterval(refInterval.current);
        onFinish && onFinish();
      }
    };

    useEffect(() => {
      if (then) {
        if (refInterval.current) {
          clearInterval(refInterval.current);
        }
        const interval = setInterval(counting, 1000);
        refInterval.current = interval;
      }

      return () => clearInterval(refInterval.current);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (renderCompletionist) {
      if (timer.s === 0) {
        return renderCompletionist();
      }
    }

    if (loading && timer.s === null) {
      return loading;
    }

    return (
      <SCountDown>
        <RenderTimerElemen type={ETimerElemen.D} val={timer.d} hide={hideDay} />
        <RenderTimerElemen
          type={ETimerElemen.H}
          val={timer.h}
          hide={hideHour}
        />
        <RenderTimerElemen type={ETimerElemen.M} val={timer.m} hide={hideMin} />
        <RenderTimerElemen type={ETimerElemen.S} val={timer.s} hide={hideSec} />
      </SCountDown>
    );
  }
);

const RenderTimerElemen = ({
  val,
  hide,
  type,
}: {
  val: number | null;
  hide: boolean;
  type: ETimerElemen;
}) => {
  return !hide && val !== null ? (
    <span>
      {type === ETimerElemen.D
        ? `${val} ${val > 1 ? "days " : "day "}`
        : padTimerElemen(val, type !== ETimerElemen.S)}
    </span>
  ) : null;
};

export default CountDown;
