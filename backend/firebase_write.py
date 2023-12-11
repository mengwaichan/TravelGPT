import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate('./firebase_auth.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

def write_itinerary(uid, itinerary_data):
 
    user_ref = db.collection('users').document(uid)

    itineraries_ref = user_ref.collection('itineraries')

    new_itinerary_ref = itineraries_ref.add(itinerary_data)

