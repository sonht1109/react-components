import { ModalProps } from "./types";
import { SModal } from "./styles";
import useDelayUnmount from "../../hooks/useDelayUnmount";
import { useEffect } from "react";

const prefixCls = "rc-md";

export default function Modal(props: ModalProps) {
  const { children, isOpen, title, toggleModal, renderClose, className } =
    props;

  const { shouldRender } = useDelayUnmount(isOpen);

  const overlayAnimation = `${
    isOpen ? "overlayEnter" : "overlayLeave"
  } 0.2s ease-out forwards`;

  const modalContentAnimation = `${
    isOpen ? "modalContentEnter" : "modalContentLeave"
  } 0.2s ease-out forwards`;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    const listener = (e: Event) => {
      if ((e as unknown as KeyboardEvent).key === "Escape" && isOpen) {
        toggleModal();
      }
    };
    document?.addEventListener("keydown", listener);

    return () => {
      document.body.style.overflow = "auto";
      document?.removeEventListener("keydown", listener);
    };
  }, [isOpen, toggleModal]);

  if (!shouldRender) return <></>;

  return (
    <SModal {...{ className }}>
      <div
        className={`${prefixCls}__overlay`}
        style={{ animation: overlayAnimation }}
        onClick={toggleModal}
      ></div>
      <div
        className={`${prefixCls}__content`}
        style={{ animation: modalContentAnimation }}
      >
        <div className={`${prefixCls}__content-header`}>
          {title}
          <div className={`${prefixCls}__header-close`} onClick={toggleModal}>
            {renderClose || <CloseBtn />}
          </div>
        </div>

        <div className="md-content__container">{children}</div>
      </div>
    </SModal>
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
