import React from "react";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";
const Layout = ({ children }) => {
  return (
    <div style={{minHeight: "100vh", zIndex: 1000}}>
      <Navbar/>
      <main style={{marginTop: "5rem", position: "relative",  zIndex: 1}} >
        <Toaster />
        {children}
      </main>
    </div>
  );
};

export default Layout;
