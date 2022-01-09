export enum EWeekDay {
  Su = 0,
  Mo = 1,
  Tu = 2,
  We = 3,
  Th = 4,
  Fr = 5,
  Sa = 6,
}

export interface PickerProps {
  verticalPosition: 'top' | 'bottom';
  horizontalPosition: 'left' | 'right';
}

export interface DatePickerProps {
  value: Date;
  onChange: (args: Date) => void;
}