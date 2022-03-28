import React, { useState } from "react";
import InputRange from "../";

export default function InputRangeExample() {
  const [val, setVal] = useState(20);

  return (
    <>
      <InputRange
        range={{ max: 100, min: 0 }}
        renderAxisLabel={(val) => val + "px"}
        step={1}
        allowTheSameValues={false}
        value={val}
        onChange={(val) => {
          setVal(val);
        }}
      />
    </>
  );
}
