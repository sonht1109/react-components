import { DATE_PICKER_COL, DATE_PICKER_ROW, MONTH_PICKER_COL, MONTH_PICKER_ROW } from "./constants";

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

export const formatOptions: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
}

export const generateYearOptions = (
  start = new Date().getFullYear() - 15,
  end = new Date().getFullYear() + 15,
  step = 1
) => {
  const res = [];
  for (let i = start; i <= end; i += step) {
    res.push(i);
  }
  return res.reverse();
}

export const generateYearPicker = (currentYear: number, step = 1) => {
  const res = [];
  const total = MONTH_PICKER_COL * MONTH_PICKER_ROW
  const startYear = Math.trunc(currentYear / total) * total + 1;
  const endYear = startYear + total - 1;
  for (let i = startYear; i <= endYear; i += step) {
    res.push(i);
  }
  return res;
}