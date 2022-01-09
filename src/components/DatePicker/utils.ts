import { DATE_PICKER_COL, DATE_PICKER_ROW } from "./constants";

const isLeap = (year: number) => {
  if (year % 4 || (year % 100 === 0 && year % 400)) return 0;
  return 1;
};

const getDaysPerMonth = (month: number, year: number) =>
  month === 2 ? 28 + isLeap(year) : 31 - (((month - 1) % 7) % 2);

export const _calendar = (month: number, year: number) => {
  const totalElm = DATE_PICKER_COL * DATE_PICKER_ROW;
  const startIndex = new Date(year, month - 1, 1).getDay();
  const endIndex = getDaysPerMonth(month, year);

  const res = Array.from({ length: totalElm }).map(() => 0);
  for (let i = startIndex; i < endIndex + startIndex; i++) {
    res[i] = i - startIndex + 1;
  }
  return res;
};

export const formatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
};