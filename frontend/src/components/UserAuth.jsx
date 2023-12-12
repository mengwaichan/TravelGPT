import React, { useState, useContext, useEffect, createContext } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
} from "firebase/auth"
import { auth } from "../firebase"

{/* User Authentication handles firebase login, signup, logout, and identification if User is valid */}

const userAuthContext = createContext()

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({}) 

  {/* Check verification of email before logging in User */}
//   function logIn(email, password) {
//     return signInWithEmailAndPassword(auth, email, password).then((cred) => {
//       if (cred.user.emailVerified) {
//         return cred.user
//       } else {
//         return logOut()
//       }
//     })
//   }
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  {/* Send Verification email when User signs up */}
//   function signUp(email, password) {
//     return createUserWithEmailAndPassword(auth, email, password).then((cred) => {
//       return sendEmailVerification(cred.user)
//     })
//   }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  {/* Call to logout current user */}
  function logOut() {
    return signOut(auth);
  }

  {/* Ensures user stays logged in until logged out (cookies keeps logged in unless logged out) */}
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    })
    return () => {
      unsubscribe()
    }
  }, [])

  {/* Functions to use when importing Auth to other components */}
  return (
    <userAuthContext.Provider value={{ user, logIn, signUp, logOut }}> 
      {children}
    </userAuthContext.Provider>
  )
}

export function useUserAuth() {
  return useContext(userAuthContext)
}
