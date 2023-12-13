import React, {useState} from 'react'
import { useUserAuth } from "./UserAuth"
import { useNavigate, Link } from "react-router-dom"
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'



const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {logIn} = useUserAuth();
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const userCredential = await logIn(email, password)
        const user = userCredential.user; 

        if (user) {
          const uid = user.uid
          console.log('User UID:', uid)
    
          const docRef = doc(db, "users", uid)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            // User exists in the 'users' collection, navigate to the home page
            console.log('Navigating to /home')

            navigate('/home');
          } else {
            // User doesn't exist in the 'users' collection, navigate to the profile creation page
            console.log('Navigating to /create-profile')

            navigate('/create-profile')
          }
          
        } else {
          throw new Error('User not found')
        }
    
      } catch (err) {
        setError(err.message)
        console.error(err)
      }
    }
    
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