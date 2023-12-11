import os
import requests
from dotenv import load_dotenv

load_dotenv()

class Route:
    def __init__(self):
        self.api_url = "https://maps.googleapis.com/maps/api/directions/json"  # Updated API endpoint
        self.api_key = os.getenv("MAP_API_KEY")
        self.headers = {"Content-Type": "application/json"}

    def fetch_directions(self, origin_latitude, origin_longitude, destination_latitude, destination_longitude, travel_mode="transit"):
        directions_request = {
            "origin": f"{origin_latitude},{origin_longitude}",
            "destination": f"{destination_latitude},{destination_longitude}",
            "mode": travel_mode,
            "key": self.api_key,
            "language": "en_US"
        }

        response = requests.get(self.api_url, headers=self.headers, params=directions_request)
        return response.json()


#fetch_directions = Route()

#response_data = fetch_directions.fetch_directions(40.60672559389838, -73.94413969169213, 40.82071004912401, -73.9481195380607, "transit")
#print(response_data)
