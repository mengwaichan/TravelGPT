import React, { useState } from "react";
import { useUserAuth } from "./UserAuth";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import logo from "../assets/travel.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useUserAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await logIn(email, password);
      const user = userCredential.user;

      if (user) {
        const uid = user.uid;
        console.log("User UID:", uid);

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // User exists in the 'users' collection, navigate to the home page
          console.log("Navigating to landing page");

          navigate("/");
        } else {
          // User doesn't exist in the 'users' collection, navigate to the profile creation page
          console.log("Navigating to /create-profile");

          navigate("/create-profile");
        }
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };


  return (
    <div className = "mt-20">
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

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
          >
            Login
          </button>

          <div className="mt-4 font-semibold text-sm text-slate-500 text-center">
            Don&apos;t have an account?{" "}
            <a
              className="text-red-600 hover:underline hover:underline-offset-4"
              href="#"
            >
              <Link to="/signup">Register</Link>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;