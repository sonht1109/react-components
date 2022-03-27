import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { STooltip } from "./styles";
import { TooltipPoint, TooltipProps } from "./types";
import { getPoint } from "./utils";

export default function Tooltip(props: TooltipProps) {
  const {
    children,
    label,
    delay = 0,
    offset = 4,
    placement = "top",
    disabled = false,
  } = props;

  const [show, toggle] = useState<boolean>(false);

  const refPoint = useRef<TooltipPoint>({ x: 0, y: 0 });
  const refTt = useRef<HTMLSpanElement>(null);

  const onMouseEnter = (e: Event) => {
    toggle(true);
    if (e.currentTarget && refPoint.current) {
      const ttRect = refTt.current?.getBoundingClientRect()
      if(ttRect) {
        refPoint.current = getPoint(
          (e.currentTarget as HTMLElement).getBoundingClientRect(),
          ttRect,
          placement,
          offset
        );
      }
    }
  };

  const onMouseLeave = (e: Event) => {
    toggle(false);
  };

  return (
    <>
      {disabled
        ? children
        : React.cloneElement(children, { onMouseEnter, onMouseLeave })}
      {!disabled &&
        createPortal(
          <STooltip
            ref={refTt}
            {...{ placement, delay, offset, show, ...refPoint.current }}
          >
            <div className="tool-tip--container">{label}</div>
          </STooltip>,
          document.body
        )}
    </>
  );
}
