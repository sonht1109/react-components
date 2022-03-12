import { MouseEvent, ReactNode, TouchEvent } from "react";

export interface ReactInputRangeProps {
  onChangeStart?: (val: Value) => void;
  onChangeEnd?: (val: Value) => void;
  onChange?: (val: Value) => void;
  value?: Value;
  step?: number;
  range: Range;
  name?: string;
  renderLabel?: (val: number) => ReactNode;
  disabled?: boolean;
}

export type Range = { min: number; max: number };

export type Value = Range | number;

export type Position = {x: number; y: number};

export interface ReactInputRangeLabelProps {
  children: ReactNode;
  type: 'min' | 'max' | 'value'
}

export interface ReactInputRangeTrackProps {
  handleTrackMouseDown: (e: TouchEvent | MouseEvent, pos: Position) => void;
}