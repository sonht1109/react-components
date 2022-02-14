import { ReactNode } from "react";

export type ModalProps = {
  isOpen: boolean;
  toggleModal: () => void;
  title: string | ReactNode;
  children: ReactNode;
  renderClose?: ReactNode;
  onUnmount?: () => void;
  className?: string;
};
