import React, { MouseEvent, useEffect, useRef } from "react";
import Label from "./Label";
import { SSlider } from "./styles";
import { ReactInputRangeSliderProps } from "./types";

export default function Slider(props: ReactInputRangeSliderProps) {
  const { type, children, percentage, onSliderDrag } = props;

  const refNode = useRef<HTMLDivElement>(null);

  const leftByPercentage = percentage * 100 + "%";

  /**
   * add and remove "mousemove" listener
   */
  const addMouseMoveListener = () => {
    refNode.current?.ownerDocument.addEventListener('mousemove', onMouseMove);
  }
  const removeMouseMoveListener = () => {
    refNode.current?.ownerDocument.removeEventListener('mousemove', onMouseMove);
  }

  /**
   * add and remove "mouseup" listener
   */
  const addMouseUpListener = () => {
    refNode?.current?.ownerDocument?.addEventListener('mouseup', onMouseUp)
  }
  const removeMouseUpListener = () => {
    refNode?.current?.ownerDocument?.removeEventListener('mouseup', onMouseUp)
  }

  /**
   * add and remove "touchmove" listener
   */
   const addTouchMoveListener = () => {
    refNode.current?.ownerDocument.addEventListener('touchmove', onTouchMove);
  }
  const removeTouchMoveListener = () => {
    refNode.current?.ownerDocument.removeEventListener('touchmove', onTouchMove);
  }

  /**
   * add and remove "touchend" listener
   */
  const addTouchEndListener = () => {
    refNode?.current?.ownerDocument.addEventListener('touchend', onTouchEnd);
  }
  const removeTouchEndListener = () => {
    refNode?.current?.ownerDocument.removeEventListener('touchend', onTouchEnd);
  }

  /**
   * Handle "mouseup"
   */
  const onMouseUp = (): void => {
    removeMouseMoveListener();
    removeMouseUpListener();
  }

  /**
   * Handle "mousemove"
   */
  const onMouseMove = (e: Event): void => {
    onSliderDrag(e, type);
  }

  /**
   * Handle "touchend"
   */
   const onTouchEnd = (): void => {
    removeTouchMoveListener();
    removeTouchEndListener();
  }

  /**
   * Handle "touchmove"
   */
   const onTouchMove = (e: Event): void => {
    onSliderDrag(e, type);
  }

  /**
   * Handle "mousedown"
   */
  const onMouseDown = (): void => {
    addMouseMoveListener();
    addMouseUpListener();
  };

  /**
   * Handle "touchstart"
   */
  const onTouchStart = (): void => {
    addTouchMoveListener();
    addTouchEndListener();
  };

  useEffect(() => {
    return () => {
      removeMouseMoveListener();
      removeMouseUpListener();
      removeTouchMoveListener();
      removeTouchEndListener();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SSlider
      ref={refNode}
      className="rc-ir__slider-container"
      style={{ left: leftByPercentage }}
    >
      <Label type="value">{children}</Label>
      <div {...{ onMouseDown, onTouchStart }} className="rc-ir__slider"></div>
    </SSlider>
  );
}
