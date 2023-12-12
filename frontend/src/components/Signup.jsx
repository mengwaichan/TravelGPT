import React, {useState} from 'react'
import { useUserAuth } from "./UserAuth"
import { useNavigate, Link } from "react-router-dom"

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {signUp} = useUserAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signUp(email, password)
            navigate("/login")
          } catch (err) {
            console.log(err)
          }
      }
    

  return (
    <div>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} name="username"/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} name="password"/>
            <button type="submit">Sign Up</button>
            <Link to="/login">Go to Login Page</Link>
        </form>
    </div>
  )
}

export default Signup