export const padTimerElemen = (val: number, showDivider = true) => {
  return val.toString().padStart(2, "0") + (showDivider ? ":" : "");
};