import { useState } from "react";
import { isDefined } from "util/is-defined";

const useModal = (initOpen = false) => {
  const [state, setState] = useState(initOpen);

  return {
    open: state,
    toggle: (state?: boolean) =>
      setState((prev) => (isDefined(state) ? Boolean(state) : !prev)),
  };
};

export default useModal;
