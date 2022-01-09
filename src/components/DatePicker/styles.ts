import styled from "styled-components";
import { DATE_PICKER_ROW } from "./constants";
import { PickerProps } from "./types";

export const SDatePicker = styled.div`
  position: relative;
  text-align: left;
`;

const SPickerBase = styled.div<
  Pick<PickerProps, "horizontalPosition" | "verticalPosition">
>``;

export const SPicker = styled(SPickerBase)`
  position: absolute;
  z-index: 10;
  top: ${({ verticalPosition }) =>
    verticalPosition === "bottom" ? "calc(100% + 12px)" : "auto"};
  bottom: ${({ verticalPosition }) =>
    verticalPosition === "top" ? "calc(100% + 12px)" : "auto"};
  left: ${({ horizontalPosition }) =>
    horizontalPosition === "left" ? "0" : "auto"};
  right: ${({ horizontalPosition }) =>
    horizontalPosition === "right" ? "0" : "auto"};
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
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
`;

export const SPickerShow = styled.div`
  display: grid;
  grid-template-columns: repeat(${DATE_PICKER_ROW}, 1fr);
`;

export const SPickerCell = styled.button`
  border-radius: 2px;
  text-align: center;
  background-color: white;
  padding: 0;
  outline: none !important;
  padding: 4px;
  border: none;
  & > span {
    border: 1px solid transparent;
    display: block;
    font-size: 14px;
    width: 24px;
    height: 24px;
    line-height: 24px;
  }
`;

export const SPickerDayInWeek = styled(SPickerCell)`
  & > span {
    font-weight: 600;
  }
`;

export const SPickerDateInMonth = styled(SPickerCell)`
  cursor: pointer;
  &:hover {
    span {
      border-color: #d9d9d9;
    }
  }
  &.active {
    color: white;
    background-color: #1890ff;
  }
`;

export const SPickerControl = styled.div`
  display: flex;
  .picker__control {
    &-preview {
      flex-grow: 1;
    }
  }
`;
