import React, { useState } from "react";
import { INPUT_PATTERN } from "./constants";
import Picker from "./Picker";
import { SDatePicker } from "./styles";
import { DatePickerProps } from "./types";
import { formatOptions } from "./utils";

interface InternalDatePickerProps extends Partial<DatePickerProps> {}

export default function DatePicker(props: InternalDatePickerProps) {
  const { onChange, value = undefined } = props;

  const [isPickerOpen, togglePicker] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(value);

  const onPickerChange = (val: Date) => {
    setDate(val);
    onChange && onChange(val);
    togglePicker(false);
  };

  const onInputChange = (e: any) => {
    const val: string = e.target.value;
    if (INPUT_PATTERN.test(val)) {
      const splits = val.split("/");
      setDate(
        new Date(Number(splits[2]), Number(splits[1]) - 1, Number(splits[0]))
      );
    }
  };

  return (
    <SDatePicker className="datepicker">
      <input
        className="datepicker__input"
        defaultValue={
          date
            ? date.toLocaleDateString("vi", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : ""
        }
        onChange={onInputChange}
        placeholder="dd/mm/yyyy"
        onFocus={() => {
          togglePicker(true);
        }}
        // onBlur={() => togglePicker(false)},
      />
      {isPickerOpen && <Picker {...{ date }} onPickerChange={onPickerChange} />}
    </SDatePicker>
  );
}
