# TravelGPT
## Backend
### Built with

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

### APIs

![OpenAI](https://img.shields.io/badge/OpenAI-412991.svg?style=for-the-badge&logo=OpenAI&logoColor=white)

![GoogleMaps](https://img.shields.io/badge/Google%20Maps-4285F4.svg?style=for-the-badge&logo=Google-Maps&logoColor=white)

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

![backend directory](https://github.com/mengwaichan/TravelGPT/assets/20369540/601a8735-3d0d-4f66-8c0a-66359b97a721)



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
### Built with
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

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

![frontend directory](https://github.com/mengwaichan/TravelGPT/assets/20369540/636e0068-f5ca-4c9a-beb5-20db45b66ca8)


### To Start 

```bash     
npm run dev
```
