import { JUMP_STRING } from "./constants";

export const paging = (
  current: number,
  totalPage: number,
  delta: number
): { label: string; value: number }[] => {
  let range: number[] = [],
    rangeWithDots: { label: string; value: number }[] = [],
    left = current - delta,
    right = current + delta,
    l = 0;

  // init array of page which can be shown
  for (let i = 1; i <= totalPage; i++) {
    if (i === 1 || i === totalPage || (i >= left && i <= right)) {
      range.push(i);
    }
  }

  // generate array of page with JUMP_STRING
  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push({ label: (l + 1).toString(), value: l + 1 });
      } else if (i - l !== 1) {
        rangeWithDots.push({
          label: JUMP_STRING,
          value: Math.floor((i + l) / 2),
        });
      }
    }
    rangeWithDots.push({ label: i.toString(), value: i });
    l = i;
  }

  return rangeWithDots;
};