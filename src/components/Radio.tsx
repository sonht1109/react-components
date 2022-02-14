import React from "react";
import styled from "styled-components";

interface Props {
  checked?: boolean;
  onChange?: () => void;
  label?: string;
}

export default function Radio({ checked = false, onChange, label = "" }: Props) {
  return (
    <SRadio
      className={`${checked ? "checked" : ""}`}
      {...{ onClick: onChange }}
    >
      <div className="radio"></div>
      <span className="label">{label}</span>
    </SRadio>
  );
}

export const SRadio = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  width: fit-content;

  .radio {
    width: 14px;
    height: 14px;
    min-width: 14px;
    border-radius: 8px;
    background-color: white;
    border: 1px solid;
    position: relative;
    margin-right: 8px;
    &:after {
      content: "";
      position: absolute;
      top: 2px;
      left: 2px;
      width: 10px;
      height: 10px;
      min-width: 5px;
      border-radius: 5px;
      transform: scale(0);
      transition: 0.1s;
      background-color: #9ab1cc;
    }
  }
  &:not(.checked) {
    .radio {
      border-color: #9ab1cc;
    }
  }
  &:not(.checked) {
    &:hover {
      .radio {
        border-color: #00cb82;
      }
    }
  }
  &.checked {
    .radio {
      border-color: #00cb82;
      &:after {
        transform: scale(1);
        background-color: #00cb82;
      }
    }
  }
  .label {
    font-size: 16px;
    line-height: 24px;
    user-select: none;
  }
`;
