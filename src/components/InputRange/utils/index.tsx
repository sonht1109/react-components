import { Value } from "../types";

export const isDefined = (value: any) => value !== undefined && value !== null;

export const isObject = (value: Value) =>
  value !== null && typeof value === "object";

export const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const isNumber = (val: any) => typeof val === 'number';