import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Inter', sans-serif;
    outline: none;
  }

  body {
    background: #1a1e22;
    padding: 5px;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
  }

`