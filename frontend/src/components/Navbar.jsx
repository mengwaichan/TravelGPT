import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "./UserAuth";
import logo from "../assets/travel-logo.png";
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
      <nav class="bg-gray-200">
        <div class="flex flex-wrap justify-between items-center px-3 mx-auto">

          <a href="/about" class="flex items-center space-x-4 py-3 px-3">
          <img class="h-8 w-8" src={logo} alt="Logo" />
          <span>TravelGPT</span>
        </a>
          <div class={`${isMenuOpen ? "" : "hidden  w-full md:block md:w-auto"}`} id="navbar-default">
            <ul class="flex items-center space-x-3 py-3 px-3 font-bold">
              {user ? (
                <>
                  <li>
                    <Link to="/Home" onClick={closeMenu}>
                      Home
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
                    <Link to="/settings" onClick={closeMenu}>
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogOut}>Log out</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/contact" onClick={closeMenu} class="p-3">
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

            <button
              class="md:hidden flex items-center"
              data-toggle="collapse"
              data-target="navbar-default"
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <img class="h-8 w-8" src={menu} alt="Menu" />
            </button>


        </div>

      </nav >

  );
};

export default Navbar;
