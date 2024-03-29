import React from "react"
import { useUserAuth } from "../components/UserAuth"
import logo from "../assets/travel.png"

const AboutUs = () => {
    const { user } = useUserAuth()

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-stone-400 to-green-900 justify-center items-center px-4 sm:px-6 lg:px-8 sm:mt-0">
            <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl bg-[#e8e7d5] rounded-lg shadow-md p-6 sm:p-8 text-center">
            <img className="mx-auto h-35 sm:h-32 md:h-40 mb-5" src={logo} alt="Travel Logo"/>
            <hr className="w-40 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>
                {/* <h1 className="text-center mt-5 text-3xl">About Us</h1> */}
                <div className="text-black text-left">
                    <p className="indent-5">
                        Welcome to our travel community! We are passionate about exploring the world and sharing our experiences with you.
                        whether you are a seasoned traveler or planning your first adventure, our platform is here to 
                        inspire and assist you on your journey.
                    </p>
                    <p className="indent-5">
                        Our team is dedicated to providing valuable travel insights, tips, and recommendations.
                        Join us on this exciting adventure, and let's make every trip unforgettable!
                    </p>
                </div>
            </div>
        </div>

    )
}

export default AboutUs
