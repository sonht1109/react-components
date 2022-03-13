import React, { useState } from "react";
import InputRange from "..";
import { Range } from "../types";

export default function InputRangeExample() {
  const [val, setVal] = useState<Range>({ min: 20, max: 100 });

  return (
    <>
      VAL: {val.min} {val.max}
      <InputRange
      draggableTrack={false}
        range={{ max: 200, min: 0 }}
        value={val}
        onChange={(val: Range) => {
          setVal(val);
        }}
      />
    </>
  );
}
