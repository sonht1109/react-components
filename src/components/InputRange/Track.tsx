import React, { MouseEvent, TouchEvent, useRef } from "react";
import { STrack } from "./styles";
import { ReactInputRangeTrackProps } from "./types";

export default function Track(props: ReactInputRangeTrackProps) {
  const { handleTrackMouseDown } = props;
  const refNode = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: TouchEvent | MouseEvent) => {
    let clientX;
    const domRec = refNode.current?.getBoundingClientRect();
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    if (clientX && domRec) {
      const position = { x: clientX - domRec.left, y: 0 };
      handleTrackMouseDown(e, position);
    }
  };

  /**
   *
   * Handle "mousedown" event
   */
  const onMouseDown = (e: MouseEvent) => {
    handleMouseDown(e);
  };

  /**
   *
   * Handle "mousestart" event
   */
  const onTouchStart = (e: TouchEvent) => {
    handleMouseDown(e);
  };

  return <STrack ref={refNode} {...{ onMouseDown, onTouchStart }}></STrack>;
}
