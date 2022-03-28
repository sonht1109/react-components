import React from "react";
import Tooltip from "..";

export default function TooltipExample() {
  return (
    <div style={{marginLeft: 100}}>
      <Tooltip label="Left label" placement="left">
        <button>Left</button>
      </Tooltip>
      <Tooltip label="Top label" placement="top">
        <button>Top</button>
      </Tooltip>
      <Tooltip label="Right label" placement="right">
        <button>Right</button>
      </Tooltip>
      <Tooltip label="Bottom label" placement="bottom">
        <button>Bottom</button>
      </Tooltip>
      <Tooltip label="Delay label" delay={200}>
        <button>Delay by 200ms</button>
      </Tooltip>
      <Tooltip label="Disabled label" disabled>
        <button>Disabled</button>
      </Tooltip>
      <Tooltip label="Custom label" labelRenderer={(label) => <button>{label}</button>}>
        <button>Custom label</button>
      </Tooltip>
    </div>
  );
}
