import styled from "styled-components";
import { DATE_PICKER_ROW, MONTH_PICKER_ROW } from "./constants";
import { PickerProps } from "./types";

export const SDatePicker = styled.div`
  position: relative;
  text-align: left;
`;

const SPickerBase = styled.div<
  Pick<PickerProps, "horizontalPosition" | "verticalPosition">
>``;

export const SPicker = styled(SPickerBase)`
  user-select: none;
  position: absolute;
  z-index: 10;
  top: ${({ verticalPosition }) =>
    verticalPosition === "bottom" ? "calc(100% + 4px)" : "auto"};
  bottom: ${({ verticalPosition }) =>
    verticalPosition === "top" ? "calc(100% + 4px)" : "auto"};
  left: ${({ horizontalPosition }) =>
    horizontalPosition === "left" ? "0" : "auto"};
  right: ${({ horizontalPosition }) =>
    horizontalPosition === "right" ? "0" : "auto"};
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  padding: 10px;
  max-width: 500px;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
    0 9px 28px 8px #0000000d;
  .divider {
    width: 100%;
    height: 1px;
    margin: 10px 0;
    background-color: #d9d9d9;
  }

  .today-btn {
    font-size: 14px;
    text-align: center;
    color: #1890ff;
    border: 1px solid #1890ff;
    padding: 4px;
    border-radius: 2px;
    cursor: pointer;
    margin-top: 10px;
    transition: 0.2s;
    &:hover {
      color: white;
      background-color: #1890ff;
    }
  }
`;

export const SPickerShow = styled.div`
  display: grid;
  width: 224px;
  min-height: 192px;
  max-height: 224px;
`;

export const SPickerShowDates = styled(SPickerShow)`
  grid-template-columns: repeat(${DATE_PICKER_ROW}, 1fr);
`;

export const SPickerShowMonths = styled(SPickerShow)`
  grid-template-columns: repeat(${MONTH_PICKER_ROW}, 1fr);
`;

export const SPickerShowYears = styled(SPickerShow)`
  grid-template-columns: repeat(${MONTH_PICKER_ROW}, 1fr);
`;

export const SPickerCell = styled.button`
  text-align: center;
  background-color: white;
  padding: 0;
  outline: none !important;
  padding: 2px;
  border: none;
  color: #413939;
  & > span {
    border: 1px solid transparent;
    display: block;
    font-size: 14px;
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 2px;
  }

  &.active {
    span {
      color: white !important;
      background-color: #1890ff;
      border-color: #1890ff;
    }
  }

  &.disabled {
    cursor: not-allowed;
    span {
      border-color: transparent !important;
      color: #d9d9d9 !important;
      text-decoration: line-through;
    }
  }
`;

export const SPickerDayInWeek = styled(SPickerCell)`
  color: #8b9898;
`;

export const SPickerDateInMonth = styled(SPickerCell)`
  cursor: pointer;
  &:hover {
    span {
      border-color: #1890ff;
      color: #1890ff;
    }
  }
`;

export const SPickerMonth = styled(SPickerCell)`
  cursor: pointer;
  &:hover {
    span {
      border-color: #1890ff;
      color: #1890ff;
    }
  }
  span {
    width: 100%;
    height: 30px;
    line-height: 30px;
  }
`;

export const SPickerYear = styled(SPickerMonth)``;

export const SPickerControl = styled.div`
  display: flex;
  color: #413939;

  button {
    border: none;
    outline: none;
    cursor: pointer;
  }
  .picker__control {
    &-navigate {
      border-radius: 2px;
      font-size: 12px;
      &:hover {
        background-color: #1890ff;
        color: white;
      }
    }
    &-preview {
      padding: 4px 0;
      flex-grow: 1;
      display: flex;
      justify-content: center;
      font-size: 14px;
      letter-spacing: 1px;
      .control {
        &__month,
        &__year {
          margin: 0 4px;
          cursor: pointer;
          &:hover {
            color: #1890ff;
          }
        }
      }
    }
  }
`;
