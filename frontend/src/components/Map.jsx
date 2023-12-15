import React from "react"
import { Link } from "react-router-dom"
import {GoogleMap, Marker, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api'


const Map = ( { geocodingData, markerLocation, directionData }) => {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_API_KEY,
      });
    const defaultCenter = { lat: 40.81792206720871, lng: -73.94995404366331}
    
    console.log("marker", markerLocation)
    console.log("geo", geocodingData)
    console.log("dir", directionData)

    const center =
    markerLocation && markerLocation.lat !== null && markerLocation.lng !== null
        ? { lat: markerLocation.lat, lng: markerLocation.lng }
        : geocodingData
        ? { lat: geocodingData.lat, lng: geocodingData.lng }
        : defaultCenter;

    console.log(center)
    const containerStyle = { width: "100%", height: "550px"}
    
    const onLoad = (map) => {
        // Do something when the map is loaded
        console.log("Map loaded:", map);
      };
    
    const onUnmount = (map) => {
        // Do something when the map is unmounted
        console.log("Map unmounted:", map);
      };
    
    return isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          {markerLocation && <Marker position={markerLocation} />}
          {directionData && directionData.prev && directionData.curr && directionData.transport && (
    <DirectionsRenderer
        directions={{
            routes: [
                {
                    legs: [
                        {
                            start_location: directionData.prev && {
                                lat: directionData.prev.lat,
                                lng: directionData.prev.lng,
                            },
                            end_location: directionData.curr && {
                                lat: directionData.curr.lat,
                                lng: directionData.curr.lng,
                            },
                            steps: [
                                {
                                    travel_mode: directionData.transport.toUpperCase(),
                                    start_location: directionData.prev && {
                                        lat: directionData.prev.lat,
                                        lng: directionData.prev.lng,
                                    },
                                    end_location: directionData.curr && {
                                        lat: directionData.curr.lat,
                                        lng: directionData.curr.lng,
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        }}
    />
)}
          <></>
        </GoogleMap>
    ) 
  
}

export default Map