from flask import Blueprint, jsonify, request
from firebase_admin import auth, firestore

profile_blueprint = Blueprint('profile', __name__)

@profile_blueprint.route('create_profile', methods = ['POST'])
def create_profile():
    user_id = authenticate_user(request)
    profile_fields = request.get_json()

    # Create user profile in Firebase
    create_user_profile(user_id, profile_fields)

    return jsonify({"message": "Profile created successfully"})

@profile_blueprint.route('/update_profile', methods=['POST'])
def update_profile():
    user_id = authenticate_user(request)
    profile_fields = request.get_json()

    # Update user profile in Firebase
    update_user_profile(user_id, profile_fields)

    return jsonify({"message": "Profile updated successfully"})

def authenticate_user(request):
    # Extract Firebase ID token from the request
    id_token = request.headers.get('Authorization')
    
    # Verify the ID token
    decoded_token = auth.verify_id_token(id_token)

    # Extract user ID from decoded_token
    user_id = decoded_token['uid']

    return user_id

def create_user_profile(user_id, profile_fields):
    # Create user profile in Firestore
    user_profile_ref = firestore.client().collection('users').document(user_id)
    user_profile_ref.set(profile_fields)

def update_user_profile(user_id, profile_fields):
    # Update user profile in Firestore
    user_profile_ref = firestore.client().collection('users').document(user_id)
    user_profile_ref.update(profile_fields)
