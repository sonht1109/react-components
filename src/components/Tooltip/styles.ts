import styled from "styled-components";
import { TooltipPoint, TooltipProps } from "./types";
import { Position } from "./utils";

type TooltipStyleProps = Pick<
  TooltipProps,
  "delay" | "offset" | "placement"
> & { show: boolean } & TooltipPoint;

export const STooltip = styled.span<TooltipStyleProps>`
  pointer-events: none;
  display: inline-block;
  white-space: nowrap;
  position: fixed;
  z-index: 999;

  top: ${({ y }) => y + "px"};
  left: ${({ x }) => x + "px"};

  .tool-tip--container {
    transform: scale(${({ show }) => (show ? 1 : 0.7)});
    transition: 0.2s;
    transition-delay: ${({ delay }) => delay + "ms"};
    transform-origin: ${({ placement }) =>
      new Position(placement || "top").negate()};
    opacity: ${({ show }) => (show ? 1 : 0)};
    padding: 6px 8px;
    border-radius: 4px;
    font-size: 12px;
    color: white;
    background-color: rgba(0, 0, 0, 0.8);
    letter-spacing: 0.02rem;
  }
`;
