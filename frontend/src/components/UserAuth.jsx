import React, { useState, useContext, useEffect, createContext } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth"
import { auth } from "../firebase"

{/* User Authentication handles firebase login, signup, logout, and identification if User is valid */}

const userAuthContext = createContext()

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({}) 
  const [uid, setUid] = useState(null)
  const [email, setEmail] = useState(null)


  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      const loggedInUser = userCredential.user;
      setUid(loggedInUser.uid)
      setEmail(loggedInUser.email)
      return userCredential
    })
  }


  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      const newUser = userCredential.user;
      setUid(newUser.uid)
      setEmail(newUser.email)
      return userCredential
    })
  }

  {/* Call to logout current user */}
  function logOut() {
    setUid(null)
    return signOut(auth)
  }

  {/* Ensures user stays logged in until logged out (cookies keeps logged in unless logged out) */}
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser)
      if (currentUser) {
        setUid(currentUser.uid)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  {/* Functions to use when importing Auth to other components */}
  return (
    <userAuthContext.Provider value={{ user, uid, email, logIn, signUp, logOut }}> 
      {children}
    </userAuthContext.Provider>
  )
}

export function useUserAuth() {
  return useContext(userAuthContext)
}
