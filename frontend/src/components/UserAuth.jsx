import React, { useState, useContext, useEffect, createContext } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { auth } from "../firebase"

/* User Authentication handles firebase login, signup, logout, and identification if User is valid */

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [uid, setUid] = useState(null);
  const [email, setEmail] = useState(null);

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const loggedInUser = userCredential.user;
        setUid(loggedInUser.uid);
        setEmail(loggedInUser.email);
        return userCredential;
      })
      .catch((error) => {
        console.error("Login Error:", error.message);
        throw error;
      });
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = userCredential.user;
        setUid(newUser.uid);
        setEmail(newUser.email);
        return userCredential;
      })
      .catch((error) => {
        console.error("Sign Up Error:", error.message);
        throw error;
      });
  }

  function logOut() {
    setUid(null);
    setEmail(null);
    return signOut(auth);
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;
        setUid(user.uid);
        setEmail(user.email);
        return userCredential;
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error.message);
        throw error;
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUid(currentUser.uid);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, uid, email, logIn, signUp, logOut, signInWithGoogle }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
