import React, { Children } from "react";
import { JUMP_STRING } from "./constants";
import { SPagination, SPaginationItem } from "./styles";
import { PaginationProps } from "./types";
import { paging } from "./utils";
import classNames from "classnames";

export default function Pagination(props: PaginationProps) {
  const {
    total,
    current,
    size = 10,
    onChange,
    delta = 1,
    hideOnSinglePage = true,
    className = "pagination",
  } = props;

  const totalPage = Math.ceil(total / size);

  const pageArray = paging(current, totalPage, Math.floor(delta));

  const canNext = current !== totalPage;
  const canPrev = current !== 1;

  if (hideOnSinglePage && totalPage === 1) {
    return null;
  }

  return (
    <SPagination {...{ className }}>
      <SPaginationItem
        disabled={!canPrev}
        onClick={() => onChange?.(current - 1)}
        className="pagination__item prev"
      >
        {"<"}
      </SPaginationItem>
      {Children.toArray(
        pageArray.map((p) => (
          <SPaginationItem
            onClick={() => onChange?.(p.value)}
            arial-label={p.value}
            className={classNames("pagination__item", {
              jump: p.label === JUMP_STRING,
              current: current === p?.value,
            })}
          >
            {p.label}
          </SPaginationItem>
        ))
      )}
      <SPaginationItem
        disabled={!canNext}
        onClick={() => onChange?.(current + 1)}
        className="pagination__item next"
      >
        {">"}
      </SPaginationItem>
    </SPagination>
  );
}
