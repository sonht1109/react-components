export const padTimer = (val: number | null, padNumber: number) =>
  (val || 0).toString().padStart(padNumber, "0");
