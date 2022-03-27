import styled from "styled-components";
import { TooltipProps } from "./types";

type TooltipStyleProps = Pick<
  TooltipProps,
  "delay" | "offset" | "placement"
> & { show: boolean; x: number; y: number };

export const STooltip = styled.span<TooltipStyleProps>`
  pointer-events: none;
  display: inline-block;
  white-space: nowrap;
  position: fixed;
  z-index: 999;
  top: ${({y}) => y + 'px'};
  left: ${({x}) => x + 'px'};
  transition: 0.2s;
  transition-delay: ${({ delay }) => delay + "s"};

  opacity: ${({ show }) => (show ? 1 : 0)};

  .tool-tip--container {
    padding: 6px 8px;
    border-radius: 4px;
    font-size: 12px;
    color: white;
    background-color: rgba(0, 0, 0, 0.8);
    letter-spacing: 0.02rem;
  }
`;
