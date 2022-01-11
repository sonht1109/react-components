export interface PickerProps {
  verticalPosition: "top" | "bottom";
  horizontalPosition: "left" | "right";
  showTodayButton: boolean;
}

export interface InputProps {
  disabled: boolean;
}

export interface DatePickerProps {
  value: Date;
  onChange: (args: Date) => void;
  format: DatePickerFormatString;
  pickerProps: Partial<PickerProps>;
  inputProps: Partial<InputProps>;
  disabledDays: Date[];
  disabledRange: {
    before?: Date;
    after?: Date;
  };
}

export type DatePickerFormatString = "dd/mm/yyyy" | "mm/dd/yyyy";
