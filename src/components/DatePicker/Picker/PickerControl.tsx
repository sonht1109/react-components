import React from "react";
import { PickerShowType } from ".";
import { MONTHS } from "../constants";
import { SPickerControl } from "../styles";

interface Props {
  previewDate: Date;
  onNavigate: (val: 1 | -1) => void;
  switchType: (type: PickerShowType) => void;
  isShowNavigate?: boolean;
}

export default function PickerControl(props: Props) {
  const { previewDate, onNavigate, switchType, isShowNavigate = true } = props;

  const previewMonth = previewDate.getMonth() + 1;
  const previewYear = previewDate.getFullYear();

  return (
    <SPickerControl>
      {isShowNavigate && (
        <button
          className="picker__control picker__control-navigate"
          onClick={() => onNavigate(-1)}
        >
          {"<"}
        </button>
      )}
      <div className="picker__control picker__control-preview">
        <div className="control__month" onClick={() => switchType("month")}>
          {(MONTHS as any)[previewMonth]}
        </div>
        <div className="control__year" onClick={() => switchType("year")}>
          {previewYear}
        </div>
      </div>
      {isShowNavigate && (
        <button
          className="picker__control picker__control-navigate"
          onClick={() => onNavigate(1)}
        >
          {">"}
        </button>
      )}
    </SPickerControl>
  );
}
