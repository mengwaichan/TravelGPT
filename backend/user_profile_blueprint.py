from flask import Blueprint, jsonify, request
from firebase_admin import firestore

profile_blueprint = Blueprint('profile', __name__)

@profile_blueprint.route('create_profile', methods = ['POST'])
def create_profile():
    user_id = request.headers.get('Authorization')
    profile_fields = request.get_json()

    # Create user profile in Firebase
    create_user_profile(user_id, profile_fields)

    return jsonify({"message": "Profile created successfully"})

@profile_blueprint.route('/update_profile', methods=['POST'])
def update_profile():
    user_id = request.headers.get('Authorization')
    profile_fields = request.get_json()

    # Update user profile in Firebase
    update_user_profile(user_id, profile_fields)

    return jsonify({"message": "Profile updated successfully"})


def create_user_profile(user_id, profile_fields):
    # Create user profile in Firestore
    print("creating user")
    user_profile_ref = firestore.client().collection('users').document(user_id)
    user_profile_ref.set(profile_fields)

def update_user_profile(user_id, profile_fields):
    # Update user profile in Firestore
    print("updating user")
    user_profile_ref = firestore.client().collection('users').document(user_id)
    user_profile_ref.update(profile_fields)
