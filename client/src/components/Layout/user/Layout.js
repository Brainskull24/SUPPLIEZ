import React from 'react'
import { NavLink} from 'react-router-dom';
import { useAuth } from "../../../context/auth";
import {toast,Toaster} from "react-hot-toast";
export default function Layout({ children }) {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto ">
              <li className="nav-item mx-2">
                <NavLink className="nav-link active" aria-current="page" to="/dashboard/user">Home</NavLink>
              </li>
                <li className="nav-item mx-2">
                    <NavLink className="nav-link" to="/dashboard/user/orders">Orders</NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink className="nav-link" to='/dashboard/user/profile'>About</NavLink>
                </li>
              <li className="nav-item mx-2">
                <NavLink className="nav-link" onClick={handleLogout} to = "/">Logout</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main style={{ minHeight: "100vh" }}>
        <Toaster />
        {children}
      </main>
    </div>
  )
}
