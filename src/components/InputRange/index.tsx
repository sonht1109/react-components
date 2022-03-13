import React, {
  MouseEvent,
  TouchEvent,
  useEffect,
  useRef,
} from "react";
import Label from "./Label";
import { SInputRange } from "./styles";
import {
  LabelType,
  Position,
  Range,
  ReactInputRangeProps,
  Value,
} from "./types";
import { distanceTo, isDefined } from "./utils";
import classNames from "classnames";
import Track from "./Track";
import {
  convertValueIntoRange,
  getPercentagesFromValues,
  getPositionsFromValues,
  getRoundedValueFromValueOnTrack,
  getValueOnTrackFromPosition,
  isMultiValue,
} from "./utils/value-transformer";

export const prefixClassName = "rc-ir";

export default function InputRange<T extends Value>(props: ReactInputRangeProps<T>) {
  const {
    onChangeStart,
    onChangeEnd,
    onChange,
    value = 0,
    range,
    renderLabel,
    disabled = false,
    step = 1,
    draggableTrack = true,
  } = props;

  const refStartValue = useRef<Value | null>(null);
  const refNode = useRef<HTMLDivElement>(null);
  const refIsSliderDragging = useRef<boolean>(false);
  const refTrack = useRef<HTMLDivElement>(null);
  const refLastKeyMove = useRef<keyof Range | null>(null);

  const convertedValues = convertValueIntoRange(value, range);

  /**
   *
   * Handle interaction start
   */
  const handleInteractionStart = (e: MouseEvent | TouchEvent) => {
    onChangeStart?.(value as T);
    if (onChangeEnd && !isDefined(refStartValue.current)) {
      refStartValue.current = value;
    }
  };

  /**
   *
   * Handle interaction end
   */
  const handleInteractionEnd = (e: Event) => {
    if (refIsSliderDragging.current) {
      refIsSliderDragging.current = false;
    }

    if (onChangeEnd) {
      if (refStartValue.current !== value) {
        onChangeEnd(value as T);
      }
    }

    refStartValue.current = null;
  };

  /**
   *
   * add and remove "mouseup" listener
   */
  const addMouseUpListener = () => {
    refNode.current?.ownerDocument.addEventListener("mouseup", onMouseUp);
  };
  const removeMouseUpListener = () => {
    refNode.current?.ownerDocument.removeEventListener("mouseup", onMouseUp);
  };

  /**
   *
   * add and remove "touchend" listener
   */

  const addTouchEndListener = () => {
    refNode.current?.ownerDocument.addEventListener("touchend", onTouchEnd);
  };
  const removeTouchEndListener = () => {
    refNode.current?.ownerDocument.removeEventListener("touchend", onTouchEnd);
  };

  /**
   *
   * Handle "mouseup" listener
   */
  const onMouseUp = (e: Event) => {
    handleInteractionEnd(e);
    removeMouseUpListener();
  };

  /**
   *
   * hanlde "touchend" listener
   */

  const onTouchEnd = (e: Event) => {
    handleInteractionEnd(e);
    removeTouchEndListener();
  };

  /**
   *
   * Handle "touchstart": onChangeStart + addTouchendListener -> handleTouchEnd -> onChangeEnd + removeTouchEndListener
   */
  const onTouchStart = (e: TouchEvent) => {
    handleInteractionStart(e);
    addTouchEndListener();
  };

  /**
   *
   * Handle "mousedown": onChangeStart + addMouseUpListener -> handleMouseUp -> onChangeEnd + removeMouseUpListener
   */
  const onMouseDown = (e: MouseEvent) => {
    handleInteractionStart(e);
    addMouseUpListener();
  };

  /**
   * Update the position of the slider
   * @param {string} key position key of "mousedown" point
   * @param {Position} position min and max positions
   */
  const updatePosition = (
    key: keyof Range,
    position: Position
  ): void => {
    if (refTrack.current) {
      const positions = getPositionsFromValues(
        convertedValues,
        range,
        refTrack.current.getBoundingClientRect()
      );
      positions[key] = position;
      refLastKeyMove.current = key;
      updatePositions(positions);
    }
  };

  /**
   * Update min max position
   * @param {min: Position, max: Position} positions min max positions
   * @returns
   */
  const updatePositions = (positions: {
    min: Position;
    max: Position;
  }): void => {
    if (!refTrack.current) return;
    const values = {
      min: getValueOnTrackFromPosition(positions.min, range, refTrack.current.getBoundingClientRect()),
      max: getValueOnTrackFromPosition(positions.max, range, refTrack.current.getBoundingClientRect()),
    };

    const roundedValues = {
      min: getRoundedValueFromValueOnTrack(values.min, step),
      max: getRoundedValueFromValueOnTrack(values.max, step),
    };

    updateValues(roundedValues);
  };

  /**
   * Update values
   * @param values 
   */
  const updateValues = (values: Range): void => {
    onChange?.((isMultiValue(value) ? values : values.max) as T);
  };

  /**
   * Return the position key of "mousedown" position: min or max
   * @param position "mousedown" position
   * @returns
   */
  const getKeyByPosition = (position: Position): keyof Range | null => {
    if (!refNode.current) return null;
    const positions = getPositionsFromValues(convertedValues, range, refNode.current.getBoundingClientRect());

    if (isMultiValue(value)) {
      const distanceToMin = distanceTo(position, positions.min);
      const distanceToMax = distanceTo(position, positions.max);

      if (distanceToMin < distanceToMax) {
        return "min";
      }
    }

    return "max";
  };

  /**
   *
   * Handle track "mousedown"
   */
  const handleTrackMouseDown = (e: MouseEvent | TouchEvent, pos: Position) => {
    if (disabled) return;
    e.preventDefault();

    if (!refNode.current) return;

    const valueOnTrack = getValueOnTrackFromPosition(pos, range, refNode.current.getBoundingClientRect());
    const roundedValue = getRoundedValueFromValueOnTrack(valueOnTrack, step);
    const key = getKeyByPosition(pos);
    if(!key) return;
    
    if (
      !draggableTrack ||
      roundedValue > range.max ||
      roundedValue < range.min
      ) {
      updatePosition(key, pos);
    }
  };

  const percentages = getPercentagesFromValues(convertedValues, range);

  useEffect(() => {}, []);

  return (
    <SInputRange
      className={classNames(`${prefixClassName}__container`, disabled)}
      ref={refNode}
      {...{ onTouchStart, onMouseDown }}
    >
      <Label type="min">{renderLabel?.(range.min) || range.min}</Label>
      <Track percentages={percentages} ref={refTrack} handleTrackMouseDown={handleTrackMouseDown} />
      <Label type="min">{renderLabel?.(range.max) || range.max}</Label>
    </SInputRange>
  );
}
