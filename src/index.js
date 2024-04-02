import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppContext } from "./Context/AppContext";
import AppContextProvider from "./Context/AppContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <BrowserRouter>
    <AppContextProvider>
          <App />
    </AppContextProvider>
  </BrowserRouter>
  

);
