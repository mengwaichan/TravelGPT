import requests

def get_place_image(city):
    teleport_url = f'https://api.teleport.org/api/urban_areas/slug:{city}/images/'
    headers = {'Accept': 'application/vnd.teleport.v1+json'}

    try:
        response = requests.get(teleport_url, headers=headers)
        
        return response.json()
    
    except Exception as e:
        raise RuntimeError(f"Error fetching place images: {str(e)}")
