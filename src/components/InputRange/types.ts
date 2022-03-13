import { MouseEvent, ReactNode, TouchEvent } from "react";

export interface ReactInputRangeProps<T extends Value> {
  value: T;
  onChangeStart?: (val: T) => void;
  onChangeEnd?: (val: T) => void;
  onChange?: (val: T) => void;
  step?: number;
  range: Range;
  renderLabel?: (val: number) => ReactNode;
  disabled?: boolean;
  allowTheSameValues?: boolean;
}

export type Range = { min: number; max: number };

export type Value = Range | number;

export type Position = {x: number; y: number};

export type LabelType = keyof Range | 'value';

export interface ReactInputRangeLabelProps {
  children: ReactNode;
  type: LabelType;
}

export interface ReactInputRangeTrackProps {
  handleTrackMouseDown: (e: TouchEvent | MouseEvent, pos: Position) => void;
  percentages: Range;
  children: ReactNode;
}

export interface ReactInputRangeSliderProps {
  type: keyof Range;
  children: ReactNode;
  percentage: number;
  onSliderDrag: (e: Event, type: keyof Range) => void;
}