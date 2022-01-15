import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SCollapse } from "./styles";
import { CollapseProps } from "./types";

export default function Collapse(props: CollapseProps) {
  const { children, isOpen, transition = '0.2s linear' } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>(isOpen ? "auto" : "0");

  useEffect(() => {
    if (ref.current) {
      if (isOpen) {
        const clientHeight = ref.current.getBoundingClientRect().height;
        setMaxHeight(clientHeight + "px");
      } else {
        setMaxHeight("0");
      }
    }
  }, [isOpen]);

  return (
    <SCollapse transition={transition} style={{ maxHeight }}>
      <div ref={ref} className="collapse__content">
        {children}
      </div>
    </SCollapse>
  );
}
