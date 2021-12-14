import React, { Children } from "react";

interface Props {
  total: number;
  current: number;
  size?: number;
  onChange?: (page: number) => void;
  delta?: number;
}

const JUMP_STRING = "...";

const paging = (
  current: number,
  totalPage: number,
  delta: number
): (string | number)[] => {
  let range: number[] = [],
    rangeWithDots: (string | number)[] = [],
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
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push(JUMP_STRING);
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};

export default function Pagination(props: Props) {
  const { total, current, size = 10, onChange, delta = 1 } = props;

  const pageArray = paging(current, total / size + 1, Math.floor(delta));

  return (
    <div style={{display: 'flex'}}>
      {Children.toArray(
        pageArray.map((p) => (
          <div
            style={{
              width: 10,
              height: 10,
              border: `1px solid`
            }}
          >
            {p}
          </div>
        ))
      )}
    </div>
  );
}
