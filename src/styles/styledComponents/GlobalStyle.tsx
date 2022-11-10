import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0; }

*,
*::before,
*::after {
  box-sizing: inherit; }

html {
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
}
`;
