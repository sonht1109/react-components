import styled, { css, keyframes } from "styled-components";

interface Props {
  hideAnimation?: boolean;
}

const skeletonAnimation = keyframes`
  0% {
    transform: translateX(-200px);
  }
  90%, 100% {
    transform: translateX(800px);
  }
`;

const Skeleton = styled.div<Props>`
  width: 200px;
  height: 20px;
  background-color: #f2f2f2;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  margin: 4px;
  ${({ hideAnimation }) =>
    !hideAnimation &&
    css`
      &:after {
        position: absolute;
        width: 200px;
        content: "";
        top: 0;
        left: 0;
        transform: translateX(-200px);
        bottom: 0;
        /* background: linear-gradient(to right, #f2f2f2, #e8e8e8, #f2f2f2); */
        background: linear-gradient(
          to right,
          transparent 0%,
          rgba(0, 0, 0, 0.03) 40%,
          rgba(0, 0, 0, 0.03) 60%,
          transparent
        );
        animation: ${skeletonAnimation} 3s infinite linear;
      }
    `}
`;

export default Skeleton;
