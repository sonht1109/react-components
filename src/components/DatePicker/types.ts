export interface PickerProps {
  verticalPosition: "top" | "bottom";
  horizontalPosition: "left" | "right";
}

export interface DatePickerProps {
  value: Date;
  onChange: (args: Date) => void;
}
