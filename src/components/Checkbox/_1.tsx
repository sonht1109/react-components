import { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
}

export default function Checkbox1({ ...rest }: Props) {
  return <SCheckbox type="checkbox" {...rest} />;
}

export const SCheckbox = styled.input`
  cursor: pointer;
  position: relative;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  margin: 0;
  transition: 0.15s ease-out;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border-style: solid;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-color: #a6b0cf;
  border-width: 1px;
  &::before {
    position: absolute;
    content: "";
    width: 4px;
    height: 7px;
    border-bottom: 2px solid white;
    border-right: 2px solid white;
    transform: translateY(-50%) rotate(45deg) scale(0);
    top: 40%;
    opacity: 0;
    transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  }
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    -webkit-box-shadow: 0 0 0 8px #4096ff;
    box-shadow: 0 0 0 8px #4096ff;
    border-radius: inherit;
    opacity: 0;
    -webkit-transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
  }
  &:checked {
    border-color: #4096ff;
    /* border-width: 8px; */
    background-color: #4096ff;
    &::before {
      opacity: 1;
      transform: translateY(-50%) rotate(45deg) scale(1.1);
    }
  }

  &:hover {
    border-color: #4096ff;
  }

  &:active:not(:checked)::after {
    -webkit-transition: none;
    -o-transition: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    transition: none;
    opacity: 1;
  }
`;
