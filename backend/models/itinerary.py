from firebase_admin import firestore

def write_itinerary(uid, itinerary_data):
    
    itinerary_data['timestamp'] = firestore.SERVER_TIMESTAMP

    user_ref = firestore.client().collection('users').document(uid)

    itineraries_ref = user_ref.collection('itineraries')

    itineraries_ref.add(itinerary_data)

