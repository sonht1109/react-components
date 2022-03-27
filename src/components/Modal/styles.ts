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

  .rc-md {
    &__overlay {
      background-color: rgba(41, 37, 37, 0.6);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      transition: 0.2s;
      opacity: 0;
    }

    &__content {
      width: 100%;
      height: auto;
      max-height: 100%;
      overflow: auto;
      background: white;
      border-radius: 4px;
      transform: translate3d(0, -20px, 0);
      opacity: 0;
      transition: 0.2s;

      .rc-md__content-header {
        position: relative;
        padding-right: 15px;
        .rc-md__header-close {
          position: absolute;
          right: 15px;
          top: 15px;
          z-index: 1;
        }
      }
    }
  }

  @keyframes overlayEnter {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes overlayLeave {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  @keyframes modalContentEnter {
    from {
      opacity: 0;
      transform: translate3d(0, -20px, 0);
    }
    to {
      transform: translate3d(0, 0px, 0);
      opacity: 1;
    }
  }

  @keyframes modalContentLeave {
    from {
      transform: translate3d(0, 0px, 0);
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: translate3d(0, -20px, 0);
    }
  }
`;
