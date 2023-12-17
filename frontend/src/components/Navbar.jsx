import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "./UserAuth";
import logo from "../assets/travelgpt-logo.png";
import menu from "../assets/menu.png";

const Navbar = () => {
  // Hooks and context
  const { user, logOut } = useUserAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Handle logout
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

  // Close the menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // JSX structure
  return (
    <nav className="bg-custom-color">
      <div className="flex flex-wrap justify-between items-center px-3 mx-auto">
        <a href="/about" className="flex items-center space-x-4 py-3 px-3">
          <img className="h-8" src={logo} alt="Logo" />
        </a>
        <div
          className={`${isMenuOpen ? "" : "hidden  w-full md:block md:w-auto"}`}
          id="navbar-default"
        >
          <ul className="flex items-center space-x-3 py-3 px-3 font-bold">
            {user ? (
              <>
                <li>
                  <Link to="/" onClick={closeMenu} style={{ color: "#3a4673" }}>
                    Search
                  </Link>
                </li>
                <li>
                  <Link to="/contact" onClick={closeMenu} style={{ color: "#3a4673" }}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/settings" onClick={closeMenu} style={{ color: "#3a4673" }}>
                    Settings
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogOut} style={{ color: "#3a4673" }}>Log out</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/contact" onClick={closeMenu} className="p-3" style={{ color: "#3a4673" }}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/login" onClick={closeMenu} style={{ color: "#3a4673" }}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" onClick={closeMenu} style={{ color: "#3a4673" }}>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <button
          className="md:hidden flex items-center"
          data-toggle="collapse"
          data-target="navbar-default"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img className="h-8 w-8" src={menu} alt="Menu" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;