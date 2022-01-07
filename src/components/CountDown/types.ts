export interface Props {
  then: Date;
  onFinish?: () => void;
  renderCompletionist?: () => any;
  hideHour?: boolean;
  hideMin?: boolean;
  hideSec?: boolean;
  hideDay?: boolean;
}

export interface CountdownImperativeHandle {}

export type StateTimer = { [key in ETimerElemen]: number | null };

export enum ETimerElemen {
  D = "d",
  H = "h",
  M = "m",
  S = "s",
}
