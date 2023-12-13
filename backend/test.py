import firebase_admin
from firebase_admin import credentials, firestore

# Replace with the path to your Firebase credentials JSON file
cred = credentials.Certificate('./firebase_auth.json')

# Initialize Firebase Admin SDK
firebase_admin.initialize_app(cred)

# Replace with the actual user ID you want to check
user_id_to_check = "vXxXabXz4obkrp0322qwgCRXD5j2"

# Reference to the 'users' collection and the specific document (user_id)
user_profile_ref = firestore.client().collection('users').document("vXxXabXz4obkrp0322qwgCRXD5j2")

# Check if the document exists
document_snapshot = user_profile_ref.get()
if document_snapshot.exists:
    print(f"User with ID {user_id_to_check} exists in the 'users' collection.")
else:
    print(f"User with ID {user_id_to_check} does not exist in the 'users' collection.")
