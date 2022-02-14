import { SModal } from "./styles";
import { ModalProps } from "./types";
import ReactDOM from "react-dom";
import { useEffect, useRef } from "react";

export default function Modal(props: ModalProps) {
  const { children, isOpen, title, toggleModal, renderClose, className } =
    props;

  const refModalParent = useRef<HTMLDivElement>(null);
  const refModalContent = useRef<HTMLDivElement>(null);
  const refModalOverlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      refModalParent.current?.classList.add("show");
      setTimeout(() => {
        refModalContent.current?.classList.add("show");
        refModalOverlay.current?.classList.add("show");
      }, 100);
    } else {
      refModalParent.current?.classList.remove("show");
    }
  }, [isOpen]);

  return ReactDOM.createPortal(
    <SModal {...{ className }} ref={refModalParent}>
      {isOpen && (
        <>
          <div
            className="md-overlay"
            ref={refModalOverlay}
            onClick={toggleModal}
          ></div>
          <div className="md-content" ref={refModalContent}>
            <div className="md-content__header">
              {title}
              <div className="md-header__close" onClick={toggleModal}>
                {renderClose || <CloseBtn />}
              </div>
            </div>

            <div className="md-content__container">{children}</div>
          </div>
        </>
      )}
    </SModal>,
    document.body
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
