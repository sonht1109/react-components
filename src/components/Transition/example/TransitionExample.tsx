import React, { useState } from "react";
import Transition from "..";

export default function TransitionExample() {
  const [shouldRender, toggle] = useState(false);

  const styles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0},
  };

  return (
    <div>
      <button onClick={() => toggle((prev) => !prev)}>Toggle transition</button>
      <Transition shouldRender={shouldRender} timeout={1000} enterTransition={false}>
        {(state) => {
          return (
            <div
              className={state}
              style={{
                transition: "0.2s",
                ...styles[state as keyof typeof styles],
              }}
            >
              Transition
            </div>
          );
        }}
      </Transition>
    </div>
  );
}
