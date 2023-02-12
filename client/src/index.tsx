import React from "react";
import ReactDOM from "react-dom/client";
import "./app/App";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { Router } from "react-router-dom";
import { createBrowserHistory, History } from "history";
import { Provider } from "react-redux/es/exports";
import { store } from "./app/store/configure-store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const history: History = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router history={history}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
