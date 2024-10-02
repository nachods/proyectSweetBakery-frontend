import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router/App";
import "bootstrap-icons/font/bootstrap-icons.css";
import { UserContext } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserContext>
      <Router>
        <AppRouter />
      </Router>
    </UserContext>
  </React.StrictMode>
);
