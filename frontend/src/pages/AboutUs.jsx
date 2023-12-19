import React from "react"
import { Link } from "react-router-dom"
import { useUserAuth } from "../components/UserAuth"
import logo from "../assets/travel.png"

const AboutUs = () => {
    const { user } = useUserAuth()

    return (
        <div className="about-container">
            <header >
                <img src={logo} alt="Travel Logo"/>
                <h1>About Us </h1>
            </header>
            <section>
                <p>
                    Welcome to our travel community! We are passionate about exploring the world and sharing our experiences with you.
                    whether you are a seasoned traveler or planning your first adventure, our platform is here to 
                    inspire and assist you on your journey.
                </p>
                <p>
                    Our team is dedicated to providing valuable travel insights, tips, and recommendations.
                    Join us on this exciting adventure, and let's make every trip unforgettable!
                </p>
            </section>
        </div>

    )
}

export default AboutUs
