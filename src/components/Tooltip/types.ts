import { ReactElement, ReactNode } from "react";

export interface TooltipProps {
  label: string;
  labelRenderer?: (label: string) => ReactNode;
  offset?: number;
  delay?: number;
  placement?: TooltipPlacement;
  children: ReactElement;
  disabled?: boolean;
}


export type TooltipPlacement = 'top' | 'left' | 'right' | 'bottom'

export interface TooltipPoint {
  x: number | null;
  y: number | null;
}

export interface TooltipRect {
  t: number;
  l: number;
  b: number;
  r: number;
}