import os
import requests
from dotenv import load_dotenv

load_dotenv()

class Geocoding:
    def __init__(self):
        self.api_url = "https://maps.googleapis.com/maps/api/geocode/json"
        self.api_key = os.getenv("MAP_API_KEY")
    
    def fetch_coordinates(self, location_name):
        address = location_name.replace(" ", "+")
        params = {
            "address": address,
            "key": self.api_key
        }
        response = requests.get(self.api_url, params=params)
        if response.status_code == 200 and response.json()['status'] == 'OK':
            location = response.json()['results'][0]['geometry']['location']
            return location
            
        else:
            print("Error:", response.json()['status'])
            return None

# For testing purpose
# To test run 'python geocoding.py' in terminal
if __name__== '__main__':       
    test = Geocoding()
    result = test.fetch_coordinates("Empire State Building")
    print(result)