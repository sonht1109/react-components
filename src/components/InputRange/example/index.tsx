import React, { useState } from "react";
import InputRange from "..";

export default function InputRangeExample() {
  const [val, setVal] = useState({min: 20, max: 50});

  return (
    <>
      <InputRange
        range={{ max: 100, min: 0 }}
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
