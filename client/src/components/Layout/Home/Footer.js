import { NavLink } from "react-router-dom";
import "../../../styles/Layout.css";
import logo from "../../../imgs/logo.png";
export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="container1">
          <NavLink>
            <img src={logo} className="main-img" alt="SUPPLIEZ"></img>
          </NavLink>
        </div>
        <div className="container2">
          <NavLink href="/catalog" className="nav-link">
            Shop All
          </NavLink>
          <NavLink href="/dashboard" className="nav-link">
            Categories
          </NavLink>
          <NavLink href="/best" className="nav-link">
            Best Sellers
          </NavLink>
          <NavLink href="/about" className="nav-link">
            Our Story
          </NavLink>
          <NavLink href="/listing" className="nav-link">
            Contact
          </NavLink>
        </div>
        <div className="container3">
          <NavLink href="/catalog" className="nav-link">
            FAQ
          </NavLink>
          <NavLink href="/dashboard" className="nav-link">
            Shipping & Returns
          </NavLink>
          <NavLink href="/best" className="nav-link">
            Store Policy
          </NavLink>
          <NavLink href="/about" className="nav-link">
            Payment Methods
          </NavLink>
          <NavLink href="/listing" className="nav-link">
            Stocklists
          </NavLink>
        </div>
        <div className="container3">
          <NavLink href="/catalog" className="nav-link">
            Facebook
          </NavLink>
          <NavLink href="/dashboard" className="nav-link">
            Whatsapp
          </NavLink>
          <NavLink href="/best" className="nav-link">
            Instagram
          </NavLink>
          <NavLink href="/about" className="nav-link">
            Twitter
          </NavLink>
          <NavLink href="/listing" className="nav-link">
            Pinterest
          </NavLink>
        </div>
        <div className="container4">
          <h1 className="nav-linkk">JOIN US !</h1>
          <div className="email-link">
            <span className="text-black">Email*</span>
            <input className="email-input" type="email"></input>
          </div>
          <button>
            <NavLink to="" className="nav-link">Subscribe</NavLink>
          </button>
        </div>
      </div>
      <div className="copyright">
        <span className="text-black">Copyright © Suppliez 2023 Inc. All rights reserved</span>
      </div>
    </div>
  );
}
