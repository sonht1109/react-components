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
    labelRenderer,
  } = props;

  const [show, toggle] = useState<boolean>(false);

  const refPoint = useRef<TooltipPoint>({ x: null, y: null });
  const refTt = useRef<HTMLSpanElement>(null);

  const onMouseEnter = (e: Event) => {
    toggle(true);
    e.target?.addEventListener('mouseleave', onMouseLeave)

    if (e.currentTarget && refPoint.current) {
      const ttRect = refTt.current?.getBoundingClientRect();
      if (ttRect) {
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
    e.currentTarget?.removeEventListener('mouseleave', onMouseLeave)
  };

  return (
    <>
      {disabled
        ? children
        : React.cloneElement(children, { onMouseEnter })}
      {!disabled &&
        createPortal(
          <STooltip
            ref={refTt}
            {...{ placement, delay, offset, show, ...refPoint.current }}
          >
            <div className="tool-tip--animation">
              {labelRenderer?.(label) || (
                <div className="tool-tip--container">{label}</div>
              )}
            </div>
          </STooltip>,
          document.body
        )}
    </>
  );
}
