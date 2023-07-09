import { ReactNode } from "react";

export interface Props {
  then: Date;
  onFinish?: () => void;
  renderCompletionist?: () => any;
  renderer: ({
    day,
    hour,
    min,
    sec,
  }: {
    day: string;
    hour: string;
    min: string;
    sec: string;
  }) => ReactNode;
  loading?: ReactNode;
  padNumber?: number;
}

export interface CountdownImperativeHandle {}

export type TimerState = { [key in TimerElement]: number | null };

export enum TimerElement {
  D = "d",
  H = "h",
  M = "m",
  S = "s",
}
