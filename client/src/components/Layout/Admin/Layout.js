import React from "react";
import { Toaster , toast} from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/auth";
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
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto ">
              <li className="nav-item mx-2">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/dashboard/admin"
                >
                  HOME
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink className="nav-link" to="/dashboard/admin/createcategory">
                  ADD CATEGORY
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink className="nav-link" to="/dashboard/admin/createproduct">
                  ADD PRODUCT
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink className="nav-link" to="/dashboard/admin/products">
                  ALL PRODUCTS
                </NavLink>
              </li>
              <li className="nav-item mx-2" >
              <NavLink
            to="/dashboard/admin/orders"
            className="nav-link"
            >
            ORDERS
          </NavLink>
            </li>
              <li className="nav-item mx-2">
                <NavLink className="nav-link" 
                style={{color: "red"}}
                onClick={handleLogout} to="/">
                  LOGOUT
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main style={{ minHeight: "90vh" }}>
        <Toaster />
        {children}
      </main>
    </div>
  );
}
