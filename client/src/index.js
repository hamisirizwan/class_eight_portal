import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5000/api";

axios.defaults.baseURL = "https://class-eight-api.vercel.app//api";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
