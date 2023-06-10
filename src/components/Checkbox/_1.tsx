import React, { HTMLAttributes } from "react";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";

interface Props extends HTMLAttributes<HTMLDivElement> {
  checked: boolean;
  label?: string;
}

export default function Checkbox1({ checked, label = "", ...rest }: Props) {
  return (
    <SCheckbox checked={checked} {...rest}>
      <div className="checkbox">
        <FaCheck
          color={checked ? "white" : "transparent"}
          size={8}
          style={{ minWidth: "8px" }}
        />
      </div>
      {label && <span className="label">{label}</span>}
    </SCheckbox>
  );
}

export const SCheckbox = styled.div<{ checked: boolean }>`
  user-select: none;
  display: flex;
  align-items: center;
  cursor: pointer;

  .checkbox {
    margin: 0;
    transition: 0.15s ease-out;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border-color: ${({ checked }) => (checked ? "#00CB82" : "#A6B0CF")};
    border-width: ${({ checked }) => (checked ? "8px" : "1px")};
    border-style: solid;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }

  .label {
    margin-left: 8px;
  }

  &:hover {
    .checkbox {
      border-color: #00cb82;
    }
  }
`;
