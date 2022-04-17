import React, { useCallback, useEffect, useRef, useState } from "react";
import { EnumTransitionState, TransitionProps } from ".";

export default function Transition(props: TransitionProps) {
  const { ENTERED, ENTERING, EXITED, EXITING, UNMOUNT } = EnumTransitionState;

  const {
    shouldRender,
    timeout = 0,
    enterTransition = true,
    exitTransition = true,
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
    shouldRender ? ENTERING : null
  );

  const getTimeouts = () => {
    let exit, enter;
    exit = enter = timeout;

    if (typeof timeout !== "number") {
      exit = timeout.exit;
      enter = timeout.enter;
    }

    return { exit, enter };
  };

  const performEnter = () => {
    if (!enterTransition) {
      setState(ENTERED);
      return;
    }
    onEnter?.();
    setState(ENTERING);
  };

  const performExit = () => {
    if (!exitTransition) {
      setState(EXITED);
      return;
    }
    onExit?.();
    setState(EXITING);
  };

  const updateStatus = useCallback(
    (nextState: EnumTransitionState | null) => {
      if (nextState === ENTERING) {
        performEnter();
      } else if (nextState === EXITING) {
        performExit();
      } else if (unmountOnExit && state === EXITED) {
        setState(UNMOUNT);
      }
    },
    [performEnter, performExit, unmountOnExit, state]
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
