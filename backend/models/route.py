import os
import requests
from dotenv import load_dotenv

load_dotenv()

class Route:
    def __init__(self):
        self.api_url = "https://routes.googleapis.com/directions/v2:computeRoutes"
        self.api_key = os.getenv("MAP_API_KEY")
        self.headers = {"Content-Type": "application/json", "X-Goog-Api-Key": self.api_key, "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline"}

    def fetch_directions(self, origin_latitude, origin_longitude, destination_latitude, destination_longitude, travel_mode):
        route_request = {"origin": {
                            "location":{
                                "latLng":{
                                    "latitude": origin_latitude,
                                    "longitude": origin_longitude,
                                    }
                                }
                            },
                         "destination": {
                                "location":{
                                    "latLng":{
                                        "latitude": destination_latitude,
                                        "longitude": destination_longitude
                                        }
                                }
                            },
                         "travelMode": travel_mode,
                         "languageCode": "en_US",
                         "units": "IMPERIAL",
                }
          
        response = requests.post(self.api_url,headers=self.headers, json=route_request)  
        return response.json()

