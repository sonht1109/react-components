import React, { Children, memo, useEffect, useState } from "react";
import { generateYearPicker, _calendar } from "../utils";
import {
  SPicker,
  SPickerDateInMonth,
  SPickerDayInWeek,
  SPickerMonth,
  SPickerShowDates,
  SPickerShowMonths,
  SPickerShowYears,
  SPickerYear,
} from "../styles";
import { DatePickerProps, PickerProps } from "../types";
import PickerControl from "./PickerControl";
import {
  daysInWeek,
  MONTHS,
  YEAR_PICKER_COL,
  YEAR_PICKER_ROW,
} from "../constants";
import classNames from "classnames";

interface InternalPickerProps
  extends Partial<PickerProps>,
    Partial<Pick<DatePickerProps, "disabledDays" | "disabledRange">> {
  date?: Date;
  onPickerChange: (args: Date) => void;
}

export type PickerShowType = "date" | "month" | "year";

function Picker({ date, onPickerChange, ...rest }: InternalPickerProps) {
  const {
    horizontalPosition = "left",
    verticalPosition = "bottom",
    disabledDays,
    disabledRange,
    showTodayButton = true,
  } = rest;

  const [previewDate, setPreviewDate] = useState<Date>(date || new Date());
  const [pickerYears, setPickerYears] = useState<number[]>([]);
  const [type, setType] = useState<PickerShowType>("date");

  const m = previewDate?.getMonth();
  const y = previewDate?.getFullYear();
  const d = previewDate?.getDate();
  const calendar = _calendar(m + 1, y);

  const mappedDisabledDays = disabledDays?.map((d) => d.getTime());

  const onSelectDate = (val: number) => {
    onPickerChange(new Date(y, m, val));
  };

  const onChangeMonth = (val: number) => {
    const tmp = new Date(previewDate);
    tmp.setMonth(val);
    setPreviewDate(tmp);
    setType("date");
  };

  const onChangeYear = (val: number) => {
    const tmp = new Date(previewDate);
    tmp.setFullYear(val);
    setPreviewDate(tmp);
    setType("date");
  };

  useEffect(() => {
    if (date && date.getTime() !== previewDate.getTime()) {
      setPreviewDate(date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const switchType = (type: PickerShowType) => {
    setType(type);
  };

  const onNavigate = (val: 1 | -1) => {
    if (type === "date") {
      onChangeMonth(m + val);
    }
    if (type === "year" && pickerYears.length) {
      setPickerYears(
        generateYearPicker(
          pickerYears[0] + val * YEAR_PICKER_ROW * YEAR_PICKER_COL
        )
      );
    }
  };

  const onSelectToday = () => {
    onPickerChange(new Date());
  };

  useEffect(() => {
    if (type === "year") {
      setPickerYears(generateYearPicker(y));
    }
  }, [type, y]);

  return (
    <SPicker {...{ horizontalPosition, verticalPosition }}>
      <PickerControl
        isShowNavigate={type !== "month"}
        onNavigate={onNavigate}
        switchType={switchType}
        {...{ previewDate }}
      />
      <div className="divider"></div>
      {type === "date" ? (
        <SPickerShowDates>
          {Children.toArray(
            Object.values(daysInWeek).map((val) => (
              <PickerDayInWeek {...{ val }} />
            ))
          )}
          {Children.toArray(
            calendar.map((val) => {
              if (val !== 0) {
                const active =
                  val === d &&
                  previewDate.getMonth() ===
                    (date?.getMonth() || new Date().getMonth()) &&
                  previewDate.getFullYear() ===
                    (date?.getFullYear() || new Date().getFullYear());

                const disabledBefore = disabledRange?.before;
                const disabledAfter = disabledRange?.after;
                const cellGetTime = new Date(y, m, val).getTime();

                const disabled =
                  mappedDisabledDays?.includes(cellGetTime) ||
                  (disabledBefore &&
                    new Date(disabledBefore).getTime() > cellGetTime) ||
                  (disabledAfter &&
                    new Date(disabledAfter).getTime() < cellGetTime);

                return (
                  <PickerDateInMonth
                    {...{ val }}
                    active={!disabled && active}
                    disabled={disabled}
                    onClick={onSelectDate}
                  />
                );
              }
              return <div></div>;
            })
          )}
        </SPickerShowDates>
      ) : type === "month" ? (
        <SPickerShowMonths>
          {Children.toArray(
            Object.entries(MONTHS).map(([k, v]: [string, string]) => (
              <PickerMonth
                active={Number(k) === m + 1}
                val={[k, v]}
                onClick={onChangeMonth}
              />
            ))
          )}
        </SPickerShowMonths>
      ) : (
        <SPickerShowYears>
          {Children.toArray(
            pickerYears.map((v: number) => (
              <PickerYear active={v === y} val={v} onClick={onChangeYear} />
            ))
          )}
        </SPickerShowYears>
      )}
      {showTodayButton && (
        <div className="today-btn" onClick={onSelectToday}>
          Today
        </div>
      )}
    </SPicker>
  );
}

export default memo(Picker);

// Picker cell

const PickerDayInWeek = ({ val }: { val: string }) => (
  <SPickerDayInWeek>
    <span>{val}</span>
  </SPickerDayInWeek>
);

const PickerDateInMonth = ({
  val,
  onClick,
  active,
  disabled = false,
}: {
  val: number;
  onClick: (args: number) => void;
  active: boolean;
  disabled?: boolean;
}) => {
  return (
    <SPickerDateInMonth
      className={classNames({
        active: active,
        disabled: disabled,
      })}
      onClick={() => !disabled && onClick(val)}
    >
      <span>{val}</span>
    </SPickerDateInMonth>
  );
};

const PickerMonth = ({
  val,
  onClick,
  active,
}: {
  val: [string, string];
  onClick: (args: number) => void;
  active: boolean;
}) => {
  return (
    <SPickerMonth
      className={classNames({
        active: active,
      })}
      onClick={() => onClick(Number(val[0]) - 1)}
    >
      <span>{val[1]}</span>
    </SPickerMonth>
  );
};

const PickerYear = ({
  val,
  onClick,
  active,
}: {
  val: number;
  onClick: (args: number) => void;
  active: boolean;
}) => {
  return (
    <SPickerYear
      className={classNames({
        active: active,
      })}
      onClick={() => onClick(val)}
    >
      <span>{val}</span>
    </SPickerYear>
  );
};
