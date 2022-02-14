import styled from "styled-components";

export const SModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 40px;
  z-index: 99;
  display: flex;
  flex-direction: column;
  display: none;
  &.show {
    display: block;
  }

  .md {
    &-overlay {
      background-color: rgba(41, 37, 37, 0.6);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      transition: 0.2s;
      opacity: 0;
      &.show {
        opacity: 1;
      }
    }

    &-content {
      width: 100%;
      height: auto;
      max-height: 100%;
      overflow: auto;
      background: white;
      border-radius: 4px;
      transform: translate3d(0, -20px, 0);
      opacity: 0;
      transition: 0.2s;
      &.show {
        transform: translate3d(0, 0px, 0);
        opacity: 1;
      }

      .md-content__header {
        position: relative;
        padding-right: 15px;
        .md-header__close {
          position: absolute;
          right: 15px;
          top: 15px;
          z-index: 1;
        }
      }
    }
  }
`;
