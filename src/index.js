import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./contexts/user.context";
import { SemesterProvider } from "./contexts/semester.context";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <SemesterProvider>
          <App />
        </SemesterProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>
);
