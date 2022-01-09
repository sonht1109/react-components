import React from "react";
import { SPickerControl } from "../styles";

interface Props {
  previewDate: Date;
  onChangeMonth: (val: number) => void;
  onChangeYear: (val: number) => void;
}

export default function PickerControl(props: Props) {
  const { previewDate, onChangeMonth } = props;

  return (
    <SPickerControl>
      <button
        className="picker__control picker__control-navigate"
        onClick={() => onChangeMonth(previewDate.getMonth() - 1)}
      >
        {"<"}
      </button>
      <div className="picker__control picker__control-preview">
        {previewDate.toLocaleDateString("vi")}
      </div>
      <button
        className="picker__control picker__control-navigate"
        onClick={() => onChangeMonth(previewDate.getMonth() + 1)}
      >
        {">"}
      </button>
    </SPickerControl>
  );
}
