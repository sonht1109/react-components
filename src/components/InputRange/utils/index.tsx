import { Position, Value } from "../types";

export const isDefined = (value: any) => value !== undefined && value !== null;

export const isObject = (value: Value) =>
  value !== null && typeof value === "object";

export const isNumber = (val: any) => typeof val === 'number';

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function distanceTo(pointA: Position, pointB: Position): number {
  const xDiff = (pointB.x - pointA.x) ** 2;
  const yDiff = (pointB.y - pointA.y) ** 2;

  return Math.sqrt(xDiff + yDiff);
}