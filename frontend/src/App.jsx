import React from 'react'
import { Route, Routes } from "react-router-dom"

{/* Components */}
import { UserAuthContextProvider } from "./components/UserAuth"
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Signup from './components/Signup'
import Landing from './pages/Landing'
import Home from './pages/Home'
import CreateProfile from './components/CreateProfile'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <UserAuthContextProvider>
      <Navbar />
      <Routes>
        {/* User Logged In = False : Routing */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Landing />} />
        <Route path="/create-profile" element={<CreateProfile />} />


        {/* User Logged In = True : Routing, Component must be wrapped by Protected Route to ensure User Auth check */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
      </Routes>
    </UserAuthContextProvider>
  )
}

export default App