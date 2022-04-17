export interface TransitionProps {
  shouldRender: boolean;
  timeout?: number | TransitionTimeout;
  entering?: boolean;
  exiting?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  onEnter?: () => void;
  onEntering?: () => void;
  onEntered?: () => void;
  onExit?: () => void;
  onExiting?: () => void;
  onExited?: () => void;
  children: (args: EnumTransitionState) => JSX.Element
}

export enum EnumTransitionState {
  UNMOUNT = 'unmount',
  ENTERING = 'entering',
  ENTERED = 'entered',
  EXITING = 'exiting',
  EXITED = 'exited'
}

export interface TransitionTimeout {
  enter: number;
  exit: number;
}