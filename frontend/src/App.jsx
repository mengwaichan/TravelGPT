import React from "react";
import { Route, Routes } from "react-router-dom";

{
  /* Components */
}
import { UserAuthContextProvider } from "./components/UserAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Settings from "./components/Settings";

{
  /* pages */
}
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Travel from "./pages/Travel";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateProfile from "./pages/CreateProfile";

const App = () => {
  return (
    <UserAuthContextProvider>
      <Navbar />
      <div className = "bg-gray-100">
      <Routes>
        {/* User Logged In = False : Routing */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />

        {/* User Logged In = True : Routing, Component must be wrapped by Protected Route to ensure User Auth check */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/travel"
          element={
            <ProtectedRoute>
              <Travel />
            </ProtectedRoute>
          }
        />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      </div>
    </UserAuthContextProvider>
  );
};

export default App;