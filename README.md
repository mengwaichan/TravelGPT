# TravelGPT
## Backend

### Installation
1. Clone the repository:

    ```bash
    git clone https://github.com/mengwaichan/TravelGPT.git
    cd TravelGPT/backend
    ```

2. Start Virtual Environment 
    #### For Windows User
    ```bash
    python -m venv env
    env/Scripts/Activate
    ```
    #### For MacOS User
    ```bash
    python3 -m venv env
    source env/bin/Activate
    ```
3. Install dependencies:
    #### For Windows User
    ```bash
    pip install -r requirements.txt
    ```
    #### For MacOS User
    ```bash
    pip3 install -r requirements.txt
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

### Create Profile 
```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: UID" -d '{"email": "Email", "first_name":"FirstName","last_name": "LastName", "dob": "Day of Birth"}' http://127.0.0.1:5000/profile/create_profile
```

### Update Profile 
```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: UID" -d '{"email": "Email", "first_name":"FirstName","last_name": "LastName", "dob": "Day of Birth"}' http://127.0.0.1:5000/profile/update_profile
```

## Frontend

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mengwaichan/TravelGPT.git
    cd TravelGPT/frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```
make sure to have `.env` in your directory.

### To Start 

```bash     
npm run dev
```