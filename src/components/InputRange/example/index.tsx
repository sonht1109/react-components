import React from "react";
import InputRange from "..";

export default function InputRangeExample() {
  return (
    <InputRange range={{ max: 200, min: 0 }} value={12} name="input-range" />
  );
}
