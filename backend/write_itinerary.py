from firebase_admin import firestore

def write_itinerary(uid, itinerary_data):
 
    user_ref = firestore.client().collection('users').document(uid)

    itineraries_ref = user_ref.collection('itineraries')

    new_itinerary_ref = itineraries_ref.add(itinerary_data)

