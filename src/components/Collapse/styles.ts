import styled from "styled-components";
import { CollapseProps } from "./types";

export const SCollapse = styled.div<Pick<CollapseProps, 'transition'>>`
  overflow: hidden;
  transition: ${({transition}) => transition};
`;
