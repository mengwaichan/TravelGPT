import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "./UserAuth";
import logo from "../assets/travel-logo.png";
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
    <div dir="rtl" className="relative h-20">
      <nav className="absolute top-0 inset-x-0 bg-white border-gray-200 dark:bg-gray-900">
        <div className="table-row-group">
          <div className="table-row">
            <div className="table-cell right-2">
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-5 rtl:space-x-reverse">
                {user ? (
                  // User is authenticated
                  <>
                    <li>
                      <Link to="/Home">Home</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                      <Link to="/about">About</Link>
                    </li>
                    <li>
                      <Link to="/settings">Settings</Link>
                    </li>
                    <li>
                      <button onClick={handleLogOut}>Log out</button>
                    </li>
                  </>
                ) : (
                  // User is not authenticated
                  <>
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/signup">Sign Up</Link>
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
