export interface ModalProps {
  children?: any;
  open?: boolean;
  toggle: (state?: boolean) => void;
}

export interface ModalContentHeaderProps {
  header: string;
  renderClose?: any;
}

export interface ModalContentBodyProps {
  children: any;
}

export type ModalContextValue = Pick<ModalProps, "open" | "toggle">;
