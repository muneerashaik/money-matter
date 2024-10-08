import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { TransactionContextProvider } from "./context/transactionContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TransactionContextProvider>
      <App />
    </TransactionContextProvider>
  </BrowserRouter>
);
