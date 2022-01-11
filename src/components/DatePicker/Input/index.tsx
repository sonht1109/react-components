import React, { useEffect, useState } from "react";
import { VI_PATTERN } from "../constants";
import { DatePickerFormatString, InputProps } from "../types";

export default function Input({
  defaultValue,
  onTest,
  onFocus,
  format,
  inputProps,
}: {
  defaultValue: string;
  onTest: (args: string) => void;
  onFocus: () => void;
  format: DatePickerFormatString;
  inputProps?: Partial<InputProps>;
}) {
  const [value, setValue] = useState<string>(defaultValue);

  const pattern = VI_PATTERN;

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const onChange = (e: any) => {
    const val: string = e.target.value;
    setValue(val);
    if (pattern.test(val)) {
      onTest(val);
    }
  };

  return (
    <input
      className="datepicker__input"
      value={value}
      onChange={onChange}
      placeholder={format}
      onFocus={onFocus}
      {...inputProps}
    />
  );
}
