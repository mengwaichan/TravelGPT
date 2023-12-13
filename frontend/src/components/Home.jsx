import React, {useState} from 'react'
import { useUserAuth } from "./UserAuth"
import { useNavigate, Link } from "react-router-dom"
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

const Home = () => {
    const { user } = useUserAuth()

    return (
        <div>
            <div>Recently Viewed</div>
            
            <div>Travel</div>

            <div>Recommended</div>
        </div>
    )
}

export default Home