import React, { useState } from "react";
import Input from "./Input";
import Picker from "./Picker";
import { SDatePicker } from "./styles";
import { DatePickerProps } from "./types";
import { formatOptions } from "./utils";

interface InternalDatePickerProps extends Partial<DatePickerProps> {}

export default function DatePicker(props: InternalDatePickerProps) {
  const {
    onChange,
    value = undefined,
    format = "dd/mm/yyyy",
    inputProps,
    pickerProps,
    disabledDays,
    disabledRange
  } = props;

  const [isPickerOpen, togglePicker] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(value);

  const onPickerChange = (val: Date) => {
    setDate(val);
    onChange && onChange(val);
    togglePicker(false);
  };

  const onInputFocus = () => {
    togglePicker(true);
  };

  const onInputTest = (val: string) => {
    const splits = val.split("/");
    const tmp = new Date(
      Number(splits[2]),
      Number(splits[1]) - 1,
      Number(splits[0])
    );
    setDate(tmp);
  };

  return (
    <SDatePicker className="datepicker">
      <Input
        inputProps={inputProps}
        onFocus={onInputFocus}
        format={format}
        defaultValue={
          typeof date === "object"
            ? date.toLocaleDateString("vi", { ...formatOptions })
            : ""
        }
        onTest={onInputTest}
      />
      {isPickerOpen && (
        <Picker
          {...{ date, disabledDays, disabledRange }}
          {...pickerProps}
          onPickerChange={onPickerChange}
        />
      )}
    </SDatePicker>
  );
}
