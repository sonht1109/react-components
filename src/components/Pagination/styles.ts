import styled from "styled-components";

export const SPagination = styled.div`
  display: flex;
`;

const SPaginationItemBase = styled.button<{
  disabled?: boolean;
}>``;

export const SPaginationItem = styled(SPaginationItemBase)`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};
  min-width: 20px;
  height: 20px;
  padding: 0 4px;
  text-align: center;
  border: none;
  &:not(.jump) {
    border: 1px solid;
  }
  &:not(.current) {
    color: black;
    background-color: white;
  }
  &.current {
    background-color: black;
    color: white;
  }
  user-select: none;
`;
