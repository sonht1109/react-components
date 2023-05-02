import React, { useContext } from "react";
import { ModalContentHeaderProps } from "./types";
import { ModalContext } from "./context/ModalContext";

export default function Header(props: ModalContentHeaderProps) {
  const { toggle } = useContext(ModalContext);

  return (
    <div className="modal__content__header">
      {props.header}
      <div
        className="modal__content__header__close"
        onClick={() => toggle(false)}
      >
        {props?.renderClose || <CloseBtn />}
      </div>
    </div>
  );
}

const CloseBtn = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="2.41212"
        height="14.4727"
        transform="matrix(0.7071 -0.707114 0.7071 0.707114 0.0606689 1.76611)"
        fill="#FF6C6C"
      />
      <rect
        width="2.41212"
        height="14.4727"
        transform="matrix(0.7071 0.707114 -0.7071 0.707114 10.2336 0)"
        fill="#FF6C6C"
      />
    </svg>
  );
};
