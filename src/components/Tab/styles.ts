import styled from "styled-components";

export const STab = styled.div`
  .tab {
    &__control {
      display: flex;
      overflow: auto;
      position: relative;

      &__active {
        position: absolute;
        bottom: 0;
        height: 4px;
        background-color: red;
        transition: 0.2s;
      }

      &__item {
        margin: 0 10px;
        padding: 10px;
        text-align: center;
        height: 40px;
        border: 1px solid;
        cursor: pointer;
      }
    }
  }
`