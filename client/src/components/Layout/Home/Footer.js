import React from 'react'
import { NavLink } from 'react-router-dom'
import "../../../styles/footer.css"
export default function Footer() {
  return (
      <div>
        <div className="footer">
          <div className="footer-up">
              <div className = "f-section3">
                <div className="f-follow">
                  <h2>FOLLOW US</h2>
                  <div className="f-icons">
                    <ul>
                    <li><a to ="#"><ion-icon name="logo-facebook"></ion-icon></a></li>
                    <li><a to ="#"><ion-icon name="logo-instagram"></ion-icon></a></li>
                    <li><a to ="#"><ion-icon name="logo-twitter"></ion-icon></a></li>
                    <li><a to ="#"><ion-icon name="logo-snapchat"></ion-icon></a></li>
                    <li><a to ="#"><ion-icon name="logo-youtube"></ion-icon></a></li>
                    </ul>
                  </div>
                </div>
              </div>
          </div>
          <div className="footer-down">
              <h1 className='text-3xl'>Copyright © Supply Management System 2023 All rights reserved</h1>
              <div className="fd-buttons">
                <NavLink href = "/policy"> Privacy Policy </NavLink> 
                <NavLink href = "/pagenotfound"> Terms of use </NavLink> 
              </div>
          </div>
        </div>
      </div>
  )
}
