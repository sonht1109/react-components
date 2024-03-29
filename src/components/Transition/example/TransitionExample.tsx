import React, { useState } from "react";
import Transition, { EnumTransitionState } from "..";

export default function TransitionExample() {
  const [shouldRender, toggle] = useState(false);

  const styles: { [key in EnumTransitionState]?: object } = {
    entering: { opacity: 1, transform: "scale(0.5)" },
    entered: { opacity: 1, transform: "scale(2)" },
    exiting: { opacity: 0, transform: "scale(1)" },
    exited: { opacity: 0, transform: "scale(0)" },
  };

  return (
    <div>
      <button onClick={() => toggle((prev) => !prev)}>Toggle transition</button>
      <Transition shouldRender={shouldRender} timeout={200}>
        {(state) => {
          return (
            <div
              className={state}
              style={{
                transition: "0.2s",
                display: "inline-block",
                transformOrigin: "left",
                ...styles[state],
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
