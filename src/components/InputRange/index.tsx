import React, {
  Children,
  MouseEvent,
  TouchEvent,
  useEffect,
  useRef,
} from "react";
import Label from "./Label";
import { SInputRange } from "./styles";
import { Position, Range, ReactInputRangeProps, Value } from "./types";
import { distanceTo, isDefined, isWithinRange, isMultiValue } from "./utils";
import classNames from "classnames";
import Track from "./Track";
import {
  convertValueIntoRange,
  getPercentagesFromValues,
  getPositionFromEvent,
  getPositionsFromValues,
  getRoundedValueFromValueOnTrack,
  getValueOnTrackFromPosition,
} from "./utils/value-transformer";
import Slider from "./Slider";

export const prefixClassName = "rc-ir";

export default function InputRange<T extends Value>(
  props: ReactInputRangeProps<T>
) {
  const {
    onChangeStart,
    onChangeEnd,
    onChange,
    value = 0,
    range,
    renderAxisLabel,
    renderValueLabel,
    disabled = false,
    step = 1,
    allowTheSameValues = false,
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
  const updatePosition = (key: keyof Range, position: Position): void => {
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
    const currentValues = {
      min: getValueOnTrackFromPosition(
        positions.min,
        range,
        refTrack.current.getBoundingClientRect()
      ),
      max: getValueOnTrackFromPosition(
        positions.max,
        range,
        refTrack.current.getBoundingClientRect()
      ),
    };

    const roundedValues: Range = {
      min: getRoundedValueFromValueOnTrack(currentValues.min, step),
      max: getRoundedValueFromValueOnTrack(currentValues.max, step),
    };

    updateValues(roundedValues);
  };

  const shouldUpdate = (currentValues: Range) => {
    return isWithinRange(
      currentValues,
      range,
      allowTheSameValues,
      isMultiValue(value)
    );
  };

  /**
   * Update values
   * @param values
   */
  const updateValues = (values: Range): void => {
    if (!shouldUpdate(values)) return;
    onChange?.((isMultiValue(value) ? values : values.max) as T);
  };

  /**
   * Return the position key of "mousedown" position: min or max
   * @param position "mousedown" position
   * @returns
   */
  const getKeyByPosition = (position: Position): keyof Range | null => {
    if (!refNode.current) return null;
    const positions = getPositionsFromValues(
      convertedValues,
      range,
      refNode.current.getBoundingClientRect()
    );

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

    if (disabled || !refNode.current) return;
    e.preventDefault();
    const key = getKeyByPosition(pos);
    if (!key) return;

    updatePosition(key, pos);
  };

  const onSliderDrag = (e: Event, key: keyof Range) => {
    if (disabled || !refTrack.current) return;

    refIsSliderDragging.current = true;
    const position = getPositionFromEvent(
      e,
      refTrack.current.getBoundingClientRect()
    );
    requestAnimationFrame(() => updatePosition(key, position));
  };

  const percentages = getPercentagesFromValues(convertedValues, range);

  const renderSliders = () => {
    const keys: (keyof Range)[] = isMultiValue(value)
      ? (Object.keys(convertedValues) as (keyof Range)[])
      : ["max"];

    return Children.toArray(
      keys.map((key: keyof Range) => {
        const label =
          renderValueLabel?.(convertedValues[key]) || convertedValues[key];
        return (
          <Slider
            onSliderDrag={onSliderDrag}
            type={key}
            percentage={percentages[key]}
          >
            {label}
          </Slider>
        );
      })
    );
  };

  useEffect(() => {
    return () => {
      removeMouseUpListener();
      removeTouchEndListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SInputRange
      className={classNames(`${prefixClassName}__container`, {disabled})}
      ref={refNode}
      {...{ onTouchStart, onMouseDown }}
    >
      <Label type="min">{renderAxisLabel?.(range.min) || range.min}</Label>
      <Track
        percentages={percentages}
        ref={refTrack}
        handleTrackMouseDown={handleTrackMouseDown}
      >
        {renderSliders()}
      </Track>
      <Label type="max">{renderAxisLabel?.(range.max) || range.max}</Label>
    </SInputRange>
  );
}
