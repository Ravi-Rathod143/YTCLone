import React from "react";
import { createRoot } from "react-dom/client";
import { SnackbarProvider } from "notistack";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SnackbarProvider
      maxSnack={2}
      autoHideDuration={2000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </SnackbarProvider>
  </BrowserRouter>
);