# TravelGPT
## Backend

### Installation
1. Clone the repository:

    ```bash
    git clone https://github.com/mengwaichan/TravelGPT.git
    cd TravelGPT/backend
    ```

2. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```
make sure to have `firebase_auth.json` and `.env` in your directory.


### To Start the API
```bash
flask run
```
### Itinerary API

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: UID" -d '{"city":"CityName","duration":5}' http://127.0.0.1:5000/itinerary
```

### Geocoding API 

```bash
curl -X POST -H "Content-Type: application/json" -d '{"name": "LocationName"}' http://127.0.0.1:5000/geocoding
```

### Route API
```bash
curl -X POST -H "Content-Type: application/json" -d '{"origin_latitude": float, "origin_longitude": float, "destination_latitude": float, "destination_longitude": float, "transport": "walk"}' http://127.0.0.1:5000/route
```
