import styled from "styled-components";

export const SInputRange = styled.div`
  position: relative;
  width: 100%;
  height: 16px;
`;

export const SLabel = styled.span`
  font-size: 14px;
  line-height: 20px;
`;

export const STrack = styled.div`
  position: absolute;
  background-color: #eeeeee;
  border-radius: 4px;
  cursor: pointer;
  left: 0;
  right: 0;
  top: calc(50% - 8px);
  height: 16px;

  .rc-ir__track--active {
    height: 100%;
    border-radius: 4px;
    background-color: #3f51b5;
    position: relative;
  }
`;
