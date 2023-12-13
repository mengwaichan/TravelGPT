import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "./UserAuth";
import logo from "../assets/travel.png";
import menu from "../assets/menu.png";

const Navbar = () => {
  const { user, logOut } = useUserAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      console.log("You are logged out");
      setIsMenuOpen(false);
      navigate("/about");
    } catch (e) {
      console.log("Logout failed");
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav>
      <div>
        <Link to="/about">
          <img src={logo} alt="Logo" />
          <span>TravelGPT</span>
        </Link>
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img src={menu} alt="Menu" />
        </button>
        <div className={`${isMenuOpen ? "" : "hidden"}`}>
          <ul>
            {user ? (
              <>
                <li>
                  <Link to="/map" onClick={closeMenu}>
                    Map
                  </Link>
                </li>
                <li>
                  <Link to="/contact" onClick={closeMenu}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/about" onClick={closeMenu}>
                    About
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogOut}>Log out</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/contact" onClick={closeMenu}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/login" onClick={closeMenu}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" onClick={closeMenu}>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
