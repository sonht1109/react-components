import React, { useCallback, useRef } from "react";
import styled, { css } from "styled-components";
import { InfiniteScrollProps } from "./types";

const prefixCls = "rc-isc";

export default function InfiniteScroll(props: InfiniteScrollProps) {
  const {
    fetchMore,
    hasMore,
    renderChildren,
    isReverse = false,
    containerStyle = {},
    scrollableStyle = {},
    loader,
  } = props;

  const observer = useRef<any>();

  const refObserver = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            fetchMore();
          }
        },
        { threshold: 0 }
      );
      if (node) observer.current.observe(node);
    },
    [fetchMore, hasMore]
  );

  return (
    <SIsc
      className={`${prefixCls}__scrollable`}
      {...{ isReverse }}
      style={{ ...scrollableStyle }}
    >
      <SIscContainer
        className={`${prefixCls}__container`}
        {...{ isReverse }}
        style={{ ...containerStyle }}
      >
        {renderChildren(refObserver)}
      </SIscContainer>
      {hasMore &&
        (loader ?? <p className={`${prefixCls}__loader`}>Loading ...</p>)}
    </SIsc>
  );
}

const SIscReverse = styled.div<{ isReverse: boolean }>`
  ${({ isReverse }) =>
    isReverse &&
    css`
      display: flex;
      flex-direction: column-reverse;
    `}
`;

const SIsc = styled(SIscReverse)`
  overflow: auto;
`;

const SIscContainer = styled(SIscReverse)``;
