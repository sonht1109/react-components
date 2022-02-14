import { useState } from "react";

const useModal = (initOpen = false) => {
  const [state, setState] = useState(initOpen);

  return { isOpen: state, toggleModal: () => setState((prev) => !prev) };
};

export default useModal;
