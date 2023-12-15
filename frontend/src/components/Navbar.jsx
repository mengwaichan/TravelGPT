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

  {/* <div>
        <Link to="/about">
          <img class="h-auto max-w-xs" src={logo} alt="Logo" />
          <span>TravelGPT</span>
        </Link>

        </div> */}
  return (
    <div dir="rtl" className="relative h-20">
      <nav className="absolute top-0 inset-x-0 bg-white border-gray-200 dark:bg-gray-900">
        <div className="table-row-group">
          <div className="table-row">
          <div className="table-cell">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <img className="h-auto max-w-xs" src={menu} alt="Menu" />
            </button>
          </div>
          <div className={`${isMenuOpen ? "" : "hidden"} table-cell right-2`}>
            {/* md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"*/}
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-5 rtl:space-x-reverse">
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


        </div>

      </nav >
    </div >
  );
};

export default Navbar;
