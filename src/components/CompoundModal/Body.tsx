import React from "react";
import { ModalContentBodyProps } from "./types";

export default function Body({ children }: ModalContentBodyProps) {
  return <div className="modal__content__body">{children}</div>;
}
