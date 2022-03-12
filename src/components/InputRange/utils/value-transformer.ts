import { Position, Range } from "../types";

/**
 * Convert a point into a percentage
 * @param position position of mousedown
 * @param clientRect DOMRect of InputRange
 * @returns percentage
 */
export function getPercentageFromPosition(
  position: Position,
  clientRect: DOMRect
): number {
  return position.x / clientRect.width || 0;
}

/**
 * Convert a position into a value on the Track
 * @param pos position of mousedown
 * @param range min and max value of range
 * @param domRect DOMRect of InputRange
 * @returns value in Track
 */
export const getValueOnTrackFromMousePosition = (
  pos: Position,
  range: Range,
  domRect: DOMRect
): number => {
  const sizePercentage = getPercentageFromPosition(pos, domRect);
  const valueDiff = range.max - range.min;
  return range.min + valueDiff * sizePercentage;
};

/**
 * Convert a float value on Track into a round value
 * @param value float value on Track
 * @param step 
 * @returns round value from step and float value
 */
export function getRoundValueFromValueOnTrack(value: number, step: number): number {
  return Math.round(value / step) * step;
}