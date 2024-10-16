import React from "react";
import ReactDOM from "react-dom/client"; // Updated for React 18
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/search";
import { CartProvider } from "./context/cart";

const root = ReactDOM.createRoot(document.getElementById("root")); // Updated for React 18

root.render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);
