import React from 'react'
import Map from "../components/Map"
import Itinerary from "../components/Itinerary"

const Travel = () => {

  const selectedData = {}
  
  return (
    <div>
      <Itinerary selectedData = {selectedData}/>
      <Map />
    </div>
  )
}

export default Travel