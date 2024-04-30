import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Router from "./router";
import { darkTheme, lightTheme } from "./theme";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Gothic+A1&family=Sunflower:wght@300&display=swap');
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
    font-family: "Sunflower", sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    &::-webkit-scrollbar {
      width: 10px;
      background-color: ${(props) => props.theme.bgColor};
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: ${(props) => props.theme.cardBgColor};
    }
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`
const Footer = styled.footer`
  height: 10vh;
  line-height: 10vh;
  text-align: center;
  font-size: 12px;
  color: ${(props) => props.theme.textColor};
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  const date = new Date();
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
      <Footer>
        © {date.getFullYear()} MLB Advanced Media, LP. All rights reserved.
      </Footer>
    </>
  );
}

export default App;
