import React, { Children } from "react";
import styled, { css } from "styled-components";

interface Props {
  total: number;
  current: number;
  size?: number;
  onChange?: (page: number) => void;
  delta?: number;
  hideOnSinglePage?: boolean;
}

const JUMP_STRING = "...";

const paging = (
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

export default function Pagination(props: Props) {
  const {
    total,
    current,
    size = 10,
    onChange,
    delta = 1,
    hideOnSinglePage = true,
  } = props;

  const totalPage = Math.ceil(total / size);

  const pageArray = paging(current, totalPage, Math.floor(delta));

  const canNext = current !== totalPage;
  const canPrev = current !== 1;

  if (hideOnSinglePage && totalPage === 1) {
    return null;
  }

  return (
    <SPagination>
      <SPaginationItem disabled={!canPrev} onClick={() => onChange?.(current - 1)}>
        {"<"}
      </SPaginationItem>
      {Children.toArray(
        pageArray.map((p) => (
          <SPaginationItem
            current={current === p?.value}
            isJumpString={p.label === JUMP_STRING}
            onClick={() => onChange?.(p.value)}
            arial-label={p.value}
          >
            {p.label}
          </SPaginationItem>
        ))
      )}
      <SPaginationItem disabled={!canNext} onClick={() => onChange?.(current + 1)}>
        {">"}
      </SPaginationItem>
    </SPagination>
  );
}

const SPagination = styled.div`
  display: flex;
`;

const SPaginationItem = styled.button<{
  current?: boolean;
  isJumpString?: boolean;
  disabled?: boolean;
}>`
  cursor: ${({disabled}) => disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({disabled}) => disabled ? 0.2 : 1};
  min-width: 20px;
  height: 20px;
  padding: 0 4px;
  text-align: center;
  border: none;
  ${({ isJumpString }) =>
    !isJumpString &&
    css`
      border: 1px solid;
    `};
  background-color: ${({ current }) => (current ? "black" : "white")};
  color: ${({ current }) => (!current ? "black" : "white")};
  user-select: none;
`;
