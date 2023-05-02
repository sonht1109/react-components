import { ModalContext } from "./context/ModalContext";
import { SModal } from "./styles";
import { ModalProps } from "./types";

export default function InternalModal({ children, open, toggle }: ModalProps) {
  return (
    <ModalContext.Provider value={{ open, toggle }}>
      {open ? (
        <SModal>
          <div className="modal__overlay"></div>
          <div className="modal__content">{children}</div>
        </SModal>
      ) : (
        <></>
      )}
    </ModalContext.Provider>
  );
}
