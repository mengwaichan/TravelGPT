import React, { useState, useEffect } from "react";
import {GoogleMap, Marker, useJsApiLoader, Polyline } from '@react-google-maps/api'

const LIBRARIES = ['geometry'];

const Map = ( { geocodingData, markerLocation, directionData }) => {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_API_KEY,
        libraries: LIBRARIES
      });
    const defaultCenter = { lat: 40.81792206720871, lng: -73.94995404366331}

    const center = 
        (markerLocation.lat && markerLocation.lng)
        ? { lat: markerLocation.lat, lng: markerLocation.lng }
        : (geocodingData && geocodingData.lat && geocodingData.lng)
        ? { lat: geocodingData.lat, lng: geocodingData.lng }
        : defaultCenter;
        
    const containerStyle = { width: "100%", height: "100%"}
    
    const onLoad = (map) => {
        // Do something when the map is loaded
        console.log("Map loaded:", map);
      };
    
    const onUnmount = (map) => {
        // Do something when the map is unmounted
        console.log("Map unmounted:", map);
      };
    
    const [polylineMarker, setPolylineMarker] = useState('0%')
    
    useEffect(() => {
      // Check if directionData is available before setting up the interval
      
      const intervalId = setInterval(() => {
        setPolylineMarker((prevOffset) => {
          const newOffset = (parseFloat(prevOffset) + 1) % 100;
          return `${newOffset}%`;
        });
      }, 100);
    
        // Clear the interval when the component unmounts or when directionData changes
      return () => clearInterval(intervalId);
      
    }, []);
    

    return isLoaded && directionData ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={directionData !== null ? 14.5 : 7.5}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
          scaleControl: true,
          mapTypeControl: true,
          panControl: false,
          zoomControl: false,
          rotateControl: true,
          fullscreenControl: true,
          disableDefaultUI: true,
          gestureHandling: "auto",
          scrollwheel: true}}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {markerLocation && <Marker position={markerLocation} />}
        {directionData.routes && directionData.routes.map((route, index) => (
          <Polyline
            key={index}
            path={google.maps.geometry.encoding.decodePath(route.polyline.encodedPolyline)}
            options={{
              strokeColor: "#ec6c54",
              strokeOpacity: 1.0,
              strokeWeight: 2,
              icons: [
                {
                  icon: {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 4,
                    strokeColor: '#304434',
                  },
                  offset: polylineMarker,
                },
              ],
            }}
          />
        ))}
      </GoogleMap>
    ) : null;    
  
}

export default Map