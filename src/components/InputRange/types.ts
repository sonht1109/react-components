import { MouseEvent, ReactNode, TouchEvent } from "react";

export interface ReactInputRangeProps<T extends Value> {
  value: T;
  onChangeStart?: (val: T) => void;
  onChangeEnd?: (val: T) => void;
  onChange?: (val: T) => void;
  step?: number;
  range: Range;
  renderAxisLabel?: (val: number) => ReactNode;
  renderValueLabel?: (val: number) => ReactNode;
  disabled?: boolean;
  allowTheSameValues?: boolean;
  draggableTrack?: boolean;
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
  draggableTrack: boolean;
  handleTrackDrag?: (prevEvent: Event, currentEvent: Event) => void;
}

export interface ReactInputRangeSliderProps {
  type: keyof Range;
  children: ReactNode;
  percentage: number;
  onSliderDrag: (e: Event, type: keyof Range) => void;
}