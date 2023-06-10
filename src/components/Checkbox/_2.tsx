import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  size?: number;
  borderRadius?: number;
}

export default function Checkbox2({
  size = 16,
  borderRadius = size / 4,
  ...rest
}: Props) {
  const checkboxPathLength =
    (size - borderRadius * 2) * 4 + Math.PI * borderRadius * 2;
  return (
    <SCheckbox
      className="container"
      size={size}
      checkboxPathLength={checkboxPathLength}
    >
      <input type="checkbox" {...rest} />
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <path
          d={`M 0 ${size / 4}
          V ${size - borderRadius}
          A ${borderRadius},${borderRadius} 0 0 0 ${borderRadius},${size}
          H ${size - borderRadius}
          A ${borderRadius},${borderRadius} 0 0 0 ${size},${size - borderRadius}
          V ${borderRadius}
          A ${borderRadius},${borderRadius} 0 0 0 ${size - borderRadius},0
          H ${borderRadius}
          A ${borderRadius},${borderRadius} 0 0 0 0,${borderRadius}
          V ${size / 4}
          L ${size / 2} ${size * 0.75}
          L ${size} ${size / 4}
          `}
        />
      </svg>
    </SCheckbox>
  );
}

const SCheckbox = styled.label<{ size: number; checkboxPathLength: number }>`
  cursor: pointer;

  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    display: none;
    &:checked ~ svg path {
      stroke-dashoffset: ${({ size, checkboxPathLength }) =>
        -1 * (checkboxPathLength + Math.sqrt(Math.pow(size / 4, 2) * 2))};
      stroke-dasharray: ${({ size }) =>
          Math.sqrt(Math.pow(size / 4, 2) * 2) * 3}
        9999999999;
    }
  }

  svg {
    overflow: visible;
    path {
      stroke: #4096ff;
      stroke-width: 2px;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      stroke-dashoffset: 0;
      stroke-dasharray: ${({ checkboxPathLength }) => checkboxPathLength}
        9999999999;
      transition: stroke-dasharray 0.5s ease, stroke-dashoffset 0.5s ease;
    }
  }
`;
