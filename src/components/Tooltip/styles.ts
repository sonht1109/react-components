import styled from "styled-components";
import { TooltipPoint, TooltipProps } from "./types";
import { Position } from "./utils";

type TooltipStyleProps = Pick<
  TooltipProps,
  "delay" | "offset" | "placement"
> & { show: boolean } & TooltipPoint;

const STooltipBase = styled.span<TooltipStyleProps>``;

export const STooltip = styled(STooltipBase).attrs((p: TooltipStyleProps) => {
  const placement = p.placement || "top";
  const position = new Position(placement);
  return {
    transformOrigin: position.negate(),
    transformDirection: position.isVertical() ? "translateY" : "translateX",
    transformSpace: ["top", "left"].includes(placement) ? 4 : -4,
  };
})`
  pointer-events: none;
  display: inline-block;
  white-space: nowrap;
  position: fixed;
  z-index: 999;

  top: ${({ y }) => y + "px"};
  left: ${({ x }) => x + "px"};

  transform: ${({ transformDirection, transformSpace, show }) =>
    `${transformDirection}(${show ? 0 : transformSpace}px)`};
  transition: 0.2s;
  transition-delay: ${({ delay }) => delay + "ms"};
  transform-origin: ${({ transformOrigin }) => transformOrigin};
  opacity: ${({ show }) => (show ? 1 : 0)};

  .tool-tip--container {
    padding: 6px 8px;
    border-radius: 4px;
    font-size: 12px;
    color: white;
    background-color: rgba(0, 0, 0, 0.8);
    letter-spacing: 1px;
  }
`;
