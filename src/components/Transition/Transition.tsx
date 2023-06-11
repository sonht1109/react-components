import { useCallback, useEffect, useRef, useState } from "react";
import { EnumTransitionState, TransitionProps } from ".";

const { ENTERED, ENTERING, EXITED, EXITING, UNMOUNT } = EnumTransitionState;

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
    !shouldRender && (unmountOnExit || mountOnEnter) ? UNMOUNT : EXITED
  );

  const refAppearStatus = useRef<EnumTransitionState | null>(
    shouldRender ? ENTERED : null
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
      if (nextState === ENTERING) {
        if (!entering) {
          setState(ENTERED);
          return;
        }
        onEnter?.();
        setState(ENTERING);
      } else if (nextState === EXITING) {
        if (!exiting) {
          setState(EXITED);
          return;
        }
        onExit?.();
        setState(EXITING);
      } else if (unmountOnExit && state === EXITED) {
        setState(UNMOUNT);
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
      if (state === UNMOUNT) {
        setState(EXITED);
      } else if (state !== ENTERING && state !== ENTERED) {
        updateStatus(ENTERING);
      }
    } else {
      if (state === ENTERED || state === ENTERING) {
        updateStatus(EXITING);
      }
    }
  }, [state, shouldRender, updateStatus]);

  useEffect(() => {
    if (state === ENTERED) {
      onEntered?.();
    } else if (state === ENTERING) {
      onEntering?.();
      onTransitionEnd(getTimeouts().enter as number, () => {
        setState(ENTERED);
        onEntered?.();
      });
    } else if (state === EXITED) {
      onExited?.();
    } else if (state === EXITING) {
      onExiting?.();
      onTransitionEnd(getTimeouts().exit as number, () => {
        setState(EXITED);
        onExited?.();
      });
    }
  }, [state, getTimeouts, onEntering, onEntered, onExiting, onExited]);

  if (state === UNMOUNT) return null;

  return children(state);
}
