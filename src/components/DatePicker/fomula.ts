import { DATE_PICKER_COL, DATE_PICKER_ROW } from "./constants";

const zellerGetWeekDay = ({
  day,
  month,
  year,
  century,
}: {
  day: number;
  month: number;
  year: number;
  century: number;
}) => {
  const res =
    ((13 * month - 1) / 5 + year / 4 + century / 4 + day + year - 2 * century) %
    7;
  // only get integer
  return Math.trunc(res);
};

const zellerGetCentury = (year: number) => Math.floor(year / 100);

const zellerGetMonth = (month: number) => {
  if (month < 3) return month + 10;
  else return month;
};

const zellerGetYear = (year: number) => year % 100;

const _zeller = (d: number, m: number, y: number) =>
  zellerGetWeekDay({
    day: d,
    month: zellerGetMonth(m),
    year: zellerGetYear(y),
    century: zellerGetCentury(y),
  });

const isLeap = (year: number) => {
  if (year % 4 || (year % 100 === 0 && year % 400)) return 0;
  return 1;
};

const getDaysPerMonth = (month: number, year: number) =>
  month === 2 ? 28 + isLeap(year) : 31 - (((month - 1) % 7) % 2);

export const getCanlendar = (month: number, year: number) => {
  const totalElm = DATE_PICKER_COL * DATE_PICKER_ROW;
  const startIndex = new Date(year, month - 1, 1).getDay();
  const endIndex = getDaysPerMonth(month, year);

  const res = Array.from({ length: totalElm }).map(() => 0);
  for (let i = startIndex; i < endIndex + startIndex; i++) {
    res[i] = i - startIndex + 1;
  }
  return res;
};
