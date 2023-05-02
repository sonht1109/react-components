import { createContext } from "react";
import { ModalContextValue } from "../types";

export const ModalContext = createContext<ModalContextValue>({
  open: false,
  toggle: () => {},
});
