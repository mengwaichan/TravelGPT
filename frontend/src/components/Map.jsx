import React from "react"
import { Link } from "react-router-dom"
import {GoogleMap, Marker, useJsApiLoader, Polyline } from '@react-google-maps/api'


const Map = ( { geocodingData, markerLocation, directionData }) => {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_API_KEY,
      });
    const defaultCenter = { lat: 40.81792206720871, lng: -73.94995404366331}
    
    console.log("dir",directionData.routes)

    const center = 
        (markerLocation.lat && markerLocation.lng)
        ? { lat: markerLocation.lat, lng: markerLocation.lng }
        : (geocodingData && geocodingData.lat && geocodingData.lng)
        ? { lat: geocodingData.lat, lng: geocodingData.lng }
        : defaultCenter;
        
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
          
          <></>
        </GoogleMap>
    ) 
  
}

export default Map