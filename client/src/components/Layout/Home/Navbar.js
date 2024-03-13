import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../../Forms/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../../context/cart";
import { Badge } from "antd";
import "../../../styles/navbar.css";
import logo from "../../../imgs/logo.png";
// import cartlogo from "../../../imgs/cart.png"
// import { useState } from 'react';
const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  // const handleToggle = () => {
  //   setVisible((current) => !current);
  // };

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
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="nav-container">
          <div className="nav-box">
            <div>
              <li className="nav-item dropdown mx-3">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  SHOP
                </NavLink>
                <ul className="dropdown-menu">
                  <li className="mx-3">
                    <NavLink className="dropdown-item" to={"/categories"}>
                      ALL CATEGORIES
                    </NavLink>
                  </li>
                  {categories?.map((c) => (
                    <li className="mx-3">
                      <NavLink
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item mx-3">
                <NavLink className="nav-link" to="/about">
                  OUR STORY
                </NavLink>
              </li>
              <SearchInput />
            </div>
            <div>
              <li className="nav-item mx-3">
                <NavLink to="/">
                  <img src={logo} className="main-img" alt="SUPPLIEZ"></img>
                </NavLink>
              </li>
            </div>
            <div>
              {!auth?.user ? (
                <>
                  <li className="nav-item mx-3">
                    <NavLink to="/register" className="nav-link">
                      REGISTER
                    </NavLink>
                  </li>
                  <li className="nav-item mx-3">
                    <NavLink to="/login" className="nav-link">
                      LOGIN
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mx-3">
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="nav-link"
                    >
                      DASHBOARD
                    </NavLink>
                  </li>
                  <li className="nav-item mx-3">
                    <NavLink to="/dashboard/orders" className="nav-link">
                      ORDERS
                    </NavLink>
                  </li>
                  <li className="nav-item mx-3">
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="nav-link"
                    >
                      LOGOUT
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item mx-2">
                <NavLink to="/profile" className="nav-link">
                  <i class="fa-regular fa-user fa-xl"></i>
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink to="/wishlist" className="nav-link">
                  <i class="fa-regular fa-heart fa-xl"></i>
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink to="/cart" className="nav-link">
                  <Badge count={cart?.length} showZero className="c-count">
                    <i class="fa-solid fa-bag-shopping fa-xl"></i>
                  </Badge>
                </NavLink>
              </li>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
