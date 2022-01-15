import React from "react";
import styled from "styled-components";

interface Props {
  checked?: boolean;
  onChange?: () => void;
  text?: string;
}

export default function Radio({ checked = false, onChange, text = "" }: Props) {
  return (
    <SRadio
      className={`${checked ? "checked" : ""}`}
      {...{ onClick: onChange }}
    >
      <div className="radio"></div>
      <span className="label">{text}</span>
    </SRadio>
  );
}

export const SRadio = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  width: fit-content;

  .radio {
    width: 16px;
    height: 16px;
    min-width: 16px;
    border-radius: 8px;
    background-color: white;
    border: 1px solid;
    position: relative;
    margin-right: 8px;
    &:after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
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
    .label {
      color: #718098;
    }
  }
  &:not(.checked) {
    &:hover {
      .radio {
        &:after {
          transform: scale(0.75);
        }
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
    .label {
      color: #333b6a;
      font-weight: 500;
    }
  }
  .label {
    font-size: 16px;
    line-height: 24px;
    user-select: none;
  }
`;
