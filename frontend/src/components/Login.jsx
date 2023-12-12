import React, {useState} from 'react'
import { useUserAuth } from "./UserAuth"
import { useNavigate, Link } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {signUp} = useUserAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
          try {
            await logIn(email, password)
            navigate("/home");
          } catch (err) {
            setError(err.message);
            console.log(err);
          }
      };
    
  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} name="username"/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} name="password"/>
            <button type="submit">Login</button>
            <Link to="/signup">Go to Signup Page</Link>
        </form>
    </div>
  )
}

export default Login