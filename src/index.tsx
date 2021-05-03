import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";

const theme = {
  buttons: {
    small: {
      padding: "5px",
      fontsize: "0.8rem",
    },
    medium: {
      padding: "8px",
      fontsize: "1rem",
    },
    large: {
      padding: "16px",
      fontsize: "1.4rem",
    },
    variant: {
      primary: "#1976d2",
      secondary: "rgb(220, 0, 78)",
      fancy: "#ffcc66",
    },
  },
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
