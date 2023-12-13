import React, {useState} from 'react'
import { useUserAuth } from "./UserAuth"
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

const Itinerary = () => {
    const { user } = useUserAuth()

    return (
        <div>Itinerary</div>
    )
}

export default Itinerary