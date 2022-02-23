import React, { useEffect, useRef, useState } from "react";
import { SCollapse } from "./styles";
import { CollapseProps } from "./types";

const prefixCls = "rc-collapse";

export default function Collapse(props: CollapseProps) {
  const { children, isOpen, transition = "0.2s linear" } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>(isOpen ? "auto" : "0");

  useEffect(() => {
    if (ref.current) {
      if (isOpen && maxHeight !== "auto") {
        const clientHeight = ref.current.getBoundingClientRect().height;
        setMaxHeight(clientHeight + "px");
      } else {
        setMaxHeight("0");
      }
    }
  }, [isOpen, maxHeight]);

  return (
    <SCollapse
      className={`${prefixCls}__container`}
      transition={transition}
      style={{ maxHeight }}
    >
      <div ref={ref} className={`${prefixCls}__content`}>
        {children}
      </div>
    </SCollapse>
  );
}
