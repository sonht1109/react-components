import React, { Children, useEffect, useState } from "react";
import { _calendar } from "../utils";
import {
  SPicker,
  SPickerDateInMonth,
  SPickerDayInWeek,
  SPickerShow,
} from "../styles";
import { PickerProps } from "../types";
import PickerControl from "./PickerControl";
import { daysInWeek } from "../constants";
import classNames from "classnames";

interface InternalPickerProps extends Partial<PickerProps> {
  date?: Date;
  onPickerChange: (args: Date) => void;
}

export default function Picker({
  date = new Date(),
  onPickerChange,
  ...rest
}: InternalPickerProps) {
  const { horizontalPosition = "left", verticalPosition = "bottom" } = rest;

  const [previewDate, setPreviewDate] = useState<Date>(date);
  useEffect(() => {
    setPreviewDate(date);
  }, [date]);

  const m = previewDate?.getMonth();
  const y = previewDate?.getFullYear();
  const d = previewDate?.getDate();
  const calendar = _calendar(m + 1, y);

  const onSelectDate = (val: number) => {
    onPickerChange(new Date(y, m, val));
  };

  const onChangeMonth = (val: number) => {
    const tmp = new Date(previewDate);
    tmp.setMonth(val);
    setPreviewDate(tmp);
  };

  const onChangeYear = (val: number) => {
    const tmp = new Date(previewDate);
    tmp.setFullYear(val);
    setPreviewDate(tmp);
  };

  return (
    <SPicker {...{ horizontalPosition, verticalPosition }}>
      <PickerControl
        onChangeMonth={onChangeMonth}
        onChangeYear={onChangeYear}
        {...{ previewDate }}
      />
      <div className="divider"></div>
      <SPickerShow>
        {Children.toArray(
          Object.values(daysInWeek).map((val) => <PickerDayInWeek {...{ val }} />)
        )}
        {Children.toArray(
          calendar.map((val) =>
            val !== 0 ? (
              <PickerDateInMonth
                {...{ val }}
                active={val === d}
                onSelectDate={onSelectDate}
              />
            ) : (
              <div></div>
            )
          )
        )}
      </SPickerShow>
    </SPicker>
  );
}

const PickerDayInWeek = ({ val }: { val: string }) => (
  <SPickerDayInWeek>
    <span>{val}</span>
  </SPickerDayInWeek>
);

const PickerDateInMonth = ({
  val,
  onSelectDate,
  active,
}: {
  val: number;
  onSelectDate: (args: number) => void;
  active: boolean;
}) => {
  return (
    <SPickerDateInMonth
      className={classNames({
        active: active,
      })}
      onClick={() => onSelectDate(val)}
    >
      <span>{val}</span>
    </SPickerDateInMonth>
  );
};
