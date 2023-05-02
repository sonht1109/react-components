import Header from "./Header";
import Body from "./Body";
import InternalModal from "./InternalModal";

type CompoundComponent = {
  Header: typeof Header;
  Body: typeof Body;
} & typeof InternalModal;

const Modal = InternalModal as CompoundComponent;
Modal.Header = Header;
Modal.Body = Body;

export default Modal;

export * from "./types";
export * from "./hooks";
