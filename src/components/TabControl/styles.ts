import styled from "styled-components";

export const STabControl = styled.div`
  overflow: auto;
  .tab {
    &__control {
      display: flex;
      flex-wrap: nowrap;
      position: relative;
      min-width: 500px;
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
`;
