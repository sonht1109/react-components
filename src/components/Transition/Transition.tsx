import { useCallback, useEffect, useRef, useState } from "react";
import { EnumTransitionState, TransitionProps } from ".";

export default function Transition(props: TransitionProps) {
  const {
    shouldRender,
    timeout = 0,
    entering = true,
    exiting = true,
    mountOnEnter = true,
    unmountOnExit = true,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    children,
  } = props;

  const [state, setState] = useState<EnumTransitionState>(
    !shouldRender && (unmountOnExit || mountOnEnter) ? EnumTransitionState.UNMOUNT : EnumTransitionState.EXITED
  );

  const refAppearStatus = useRef<EnumTransitionState | null>(
    shouldRender ? EnumTransitionState.ENTERED : null
  );

  const getTimeouts = useCallback(() => {
    let exit, enter;
    exit = enter = timeout;

    if (typeof timeout !== "number") {
      exit = timeout.exit;
      enter = timeout.enter;
    }

    return { exit, enter };
  }, [timeout]);

  const updateStatus = useCallback(
    (nextState: EnumTransitionState | null) => {
      if (nextState === EnumTransitionState.ENTERING) {
        if (!entering) {
          setState(EnumTransitionState.ENTERED);
          return;
        }
        onEnter?.();
        setState(EnumTransitionState.ENTERING);
      } else if (nextState === EnumTransitionState.EXITING) {
        if (!exiting) {
          setState(EnumTransitionState.EXITED);
          return;
        }
        onExit?.();
        setState(EnumTransitionState.EXITING);
      } else if (unmountOnExit && state === EnumTransitionState.EXITED) {
        setState(EnumTransitionState.UNMOUNT);
      }
    },
    [unmountOnExit, state, entering, onEnter, onExit, exiting]
  );

  const onTransitionEnd = (timeout = 0, handler: () => void) => {
    setTimeout(handler, timeout);
  };

  useEffect(() => {
    updateStatus(refAppearStatus.current);
  }, [updateStatus]);

  useEffect(() => {
    if (shouldRender) {
      if (state === EnumTransitionState.UNMOUNT) {
        setState(EnumTransitionState.EXITED);
      } else if (state !== EnumTransitionState.ENTERING && state !== EnumTransitionState.ENTERED) {
        updateStatus(EnumTransitionState.ENTERING);
      }
    } else {
      if (state === EnumTransitionState.ENTERED || state === EnumTransitionState.ENTERING) {
        updateStatus(EnumTransitionState.EXITING);
      }
    }
  }, [state, shouldRender, updateStatus]);

  useEffect(() => {
    if (state === EnumTransitionState.ENTERED) {
      onEntered?.();
    } else if (state === EnumTransitionState.ENTERING) {
      onEntering?.();
      onTransitionEnd(getTimeouts().enter as number, () => {
        setState(EnumTransitionState.ENTERED);
        onEntered?.();
      });
    } else if (state === EnumTransitionState.EXITED) {
      onExited?.();
    } else if (state === EnumTransitionState.EXITING) {
      onExiting?.();
      onTransitionEnd(getTimeouts().exit as number, () => {
        setState(EnumTransitionState.EXITED);
        onExited?.();
      });
    }
  }, [state, getTimeouts, onEntering, onEntered, onExiting, onExited]);

  if (state === EnumTransitionState.UNMOUNT) return null;

  return children(state);
}
