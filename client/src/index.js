import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import {SearchProvider} from "./context/search";
import {CartProvider} from "./context/cart";
ReactDOM.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
  </SearchProvider>
</AuthProvider>,
  document.getElementById('root')
)