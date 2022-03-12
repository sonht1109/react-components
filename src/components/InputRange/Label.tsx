import React from "react";
import { prefixClassName } from ".";
import { SLabel } from "./styles";
import { ReactInputRangeLabelProps } from "./types";

export default function Label(props: ReactInputRangeLabelProps) {
  const { children, type } = props;

  return <SLabel className={`${prefixClassName}__label--${type}`}>{children}</SLabel>;
}
