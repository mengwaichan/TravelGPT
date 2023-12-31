import React, { useState } from "react";
import { useUserAuth } from "../components/UserAuth";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import logo from "../assets/travel.png";
import google from "../assets/google.png"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, signInWithGoogle } = useUserAuth();
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
      setError("Invalid email or password. Please try again.");
      console.error(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/"); // Adjust the destination page after Google login
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-stone-400 to-green-900 justify-center items-center px-4 sm:px-6 lg:px-8 sm:mt-0">
      <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl bg-[#e8e7d5] rounded-lg shadow-md p-6 sm:p-8 text-center">
      <div className="flex justify-center items-center text-center ">
        <Link to="/about">
          <img className="object-contain h-auto w-40" src={logo} alt="Logo" />
        </Link>
      </div>
      <hr className="w-40 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>
      <div className="text-center mt-5">
        <div className="w-full max-w-sm m-auto rounded-lg">
          <form onSubmit={handleSubmit} className="text-center">
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
            {error && (
                <div className="mt-4 text-red-600">
                  {error}
                </div>
              )}
            <div className="mt-4 flex flex-row text-center justify-center items-start">
              <button
                  type="submit"
                  className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                  style={{ margin: '0px' }}  
              >
                Login
            </button>

              {/* Google Sign In Button */}
              <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="flex items-center"
                  style={{ marginLeft: '30px' }} 
              >
                  <img className="mx-auto h-7" src={google} />
              </button>
          </div>

              <div className="mt-4 font-semibold text-sm text-slate-500 text-center">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="text-red-600 hover:underline hover:underline-offset-4">
                  Register
                </Link>
              </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;