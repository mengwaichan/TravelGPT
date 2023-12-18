import React, { useState } from "react";
import { useUserAuth } from "./UserAuth";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/travel.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp, signInWithGoogle } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    try {
      await signUp(email, password);
      navigate("/create-profile");
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/create-profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-20">
      <div className="flex justify-center items-center text-center">
        <Link to="/about">
          <img class="object-contain h-auto w-40 " src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="text-center mt-5">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              className="text-sm w-700 px-4 py-2 border border-solid border-gray-300 rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="username"
            />
          </div>

          <div>
            <input
              type="password"
              className="text-sm w-700 px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
          </div>
          <div>
            <input
              type="password"
              className="text-sm w-700 px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
          >
            Sign Up
          </button>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
          >
            Sign Up with Google
          </button>

          <div className="mt-4 font-semibold text-sm text-slate-500 text-center">
            Already Registered?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline hover:underline-offset-4"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
