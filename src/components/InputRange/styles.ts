import styled from "styled-components";

const TRACK_HEIGHT = 3;
const PRIMARY_COLOR = "#3f51b5";
const TRACK_BG = "#eeeeee";
const BORDER_RADIUS = 4;
const SLIDER_SIZE = 12;
const LABEL_COLOR = "#3f51b5";
const DISTANCE_FROM_LABEL_TO_TRACK = 20;
const DISABLED_SLIDER_BG = '#cccccc';

export const SLabel = styled.span`
  font-size: 14px;
  line-height: 20px;
  color: ${LABEL_COLOR};
  position: absolute;
  &.rc-ir__label--value {
    top: -${SLIDER_SIZE + DISTANCE_FROM_LABEL_TO_TRACK}px;
    transform: translateX(-50%);
  }
  &.rc-ir__label--min {
    top: ${DISTANCE_FROM_LABEL_TO_TRACK}px;
    left: 0;
    transform: translateX(-50%);
  }
  &.rc-ir__label--max {
    top: ${DISTANCE_FROM_LABEL_TO_TRACK}px;
    right: 0;
    transform: translateX(50%);
  }
`;

export const STrack = styled.div`
  position: absolute;
  background-color: ${TRACK_BG};
  border-radius: ${BORDER_RADIUS}px;
  cursor: pointer;
  left: 0;
  right: 0;
  top: calc(50% - ${TRACK_HEIGHT / 2}px);
  height: ${TRACK_HEIGHT}px;

  .rc-ir__track--active {
    height: 100%;
    border-radius: ${BORDER_RADIUS}px;
    background-color: ${PRIMARY_COLOR};
    position: relative;
    transition: left 0.2s ease-out, width 0.2s ease-out;
  }
`;

export const SSlider = styled.div`
  position: absolute;
  top: 0;
  transition: left 0.2s ease-out;
  .rc-ir__slider {
    width: ${SLIDER_SIZE}px;
    height: ${SLIDER_SIZE}px;
    border-radius: 50%;
    background-color: ${PRIMARY_COLOR};
    position: absolute;
    top: calc(${TRACK_HEIGHT / 2}px - ${SLIDER_SIZE / 2}px);
    left: -${SLIDER_SIZE / 2}px;
    &:active {
      &:after {
        transform: scale(2.5);
      }
    }
    &:after {
      content: "";
      top: 0;
      left: 0;
      position: absolute;
      width: ${SLIDER_SIZE}px;
      height: ${SLIDER_SIZE}px;
      border-radius: 50%;
      background-color: ${PRIMARY_COLOR};
      opacity: 0.3;
      z-index: 0;
      transition: 0.2s ease-out;
    }
  }
`;

export const SInputRange = styled.div`
  position: relative;
  width: 100%;
  height: ${TRACK_HEIGHT}px;
  margin: 40px 0;
  &.disabled {
    ${STrack} {
      .rc-ir__track--active {
        background-color: ${DISABLED_SLIDER_BG};
      }
    }
    ${SSlider} {
      .rc-ir__slider {
        background-color: ${DISABLED_SLIDER_BG};
      } 
    }
    ${SLabel} {
      color: ${DISABLED_SLIDER_BG};
    }
  }
`;