import React, {
  forwardRef,
  MouseEvent,
  MutableRefObject,
  TouchEvent,
  useRef,
} from "react";
import { STrack } from "./styles";
import { ReactInputRangeTrackProps } from "./types";

const Track = forwardRef<HTMLDivElement, ReactInputRangeTrackProps>(
  (props, ref) => {
    const { handleTrackMouseDown, percentages, children } = props;

    const refTrack = useRef<HTMLDivElement | null>(null);

    const handleMouseDown = (e: TouchEvent | MouseEvent) => {
      if (!refTrack.current) return;

      let clientX;
      
      if ("touches" in e) {
        clientX = e.touches[0].clientX;
      } else {
        clientX = e.clientX;
      }

      if (clientX) {
        const position = {
          x: clientX - refTrack.current.getBoundingClientRect().left,
          y: 0,
        };
        handleTrackMouseDown(e, position);
      }
    };

    const widthByPercentage = (percentages.max - percentages.min) * 100 + "%";
    const leftByPercentage = percentages.min * 100 + "%";

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

    return (
      <STrack
        className="rc-ir__track"
        ref={(node: HTMLDivElement) => {
          refTrack.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as MutableRefObject<HTMLDivElement>).current = node;
          }
        }}
        {...{ onMouseDown, onTouchStart }}
      >
        <div
          className="rc-ir__track--active"
          style={{ width: widthByPercentage, left: leftByPercentage }}
        ></div>
        {children}
      </STrack>
    );
  }
);

export default Track;
