import React, {
  MouseEvent,
  ReactNode,
  TouchEvent,
  useEffect,
  useRef,
} from "react";
import Label from "./Label";
import { SInputRange } from "./styles";
import { Position, ReactInputRangeProps, Value } from "./types";
import { capitalize, isDefined, isObject } from "./utils";
import classNames from "classnames";
import Track from "./Track";
import { getRoundValueFromValueOnTrack, getValueOnTrackFromMousePosition } from "./utils/value-transformer";

export const prefixClassName = "rc-ir";

export default function InputRange(props: ReactInputRangeProps) {
  const {
    onChangeStart,
    value = 0,
    onChangeEnd,
    name,
    range,
    renderLabel,
    disabled = false,
    step = 1,
  } = props;

  const refStartValue = useRef<Value | null>(null);
  const refNode = useRef<HTMLDivElement>(null);
  const refIsSliderDragging = useRef<boolean>(false);

  const isMultiValue = isObject(value);

  /**
   *
   * Handle interaction start
   */
  const handleInteractionStart = (e: MouseEvent | TouchEvent) => {
    onChangeStart?.(value);
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
        onChangeEnd(value);
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
   *
   * Handle track "mousedown"
   */
  const handleTrackMouseDown = (e: MouseEvent | TouchEvent, pos: Position) => {
    if (disabled) return;
    e.preventDefault();
    const domRect = refNode.current?.getBoundingClientRect();
    if(!domRect) return;
    const valueOnTrack = getValueOnTrackFromMousePosition(pos, range, domRect);
    const roundValue = getRoundValueFromValueOnTrack(valueOnTrack, step);
    console.log(roundValue);
  };

  /**
   * Render hidden input
   * @returns ReactNode
   */
  const renderHiddenInputs = (): ReactNode => {
    if (!name) return <></>;
    const values = isMultiValue ? value : { value };

    return Object.entries(values).map(([key, value]: [string, number]) => {
      const inputName = name + (isMultiValue ? capitalize(key) : "");
      return <input key={key} name={inputName} value={value} />;
    });
  };

  useEffect(() => {}, []);

  return (
    <SInputRange
      className={classNames(`${prefixClassName}__container`, disabled)}
      ref={refNode}
      {...{ onTouchStart, onMouseDown }}
    >
      <Label type="min">{renderLabel?.(range.min) || range.min}</Label>
      <Track handleTrackMouseDown={handleTrackMouseDown} />
      <Label type="min">{renderLabel?.(range.max) || range.max}</Label>
      {renderHiddenInputs()}
    </SInputRange>
  );
}
