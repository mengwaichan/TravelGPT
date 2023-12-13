import React from "react"
import { Link } from "react-router-dom"
import { useUserAuth } from "../components/UserAuth"
import logo from "../assets/travel.png"

const AboutUs = () => {
    const { user } = useUserAuth()

    return (
        <div>About Us</div>
    )
}

export default AboutUs