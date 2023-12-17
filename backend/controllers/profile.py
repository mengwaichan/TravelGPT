from flask import Blueprint, jsonify, request
from models.profile import create_user_profile, update_user_profile, fetch_user_profile

profile_blueprint = Blueprint('profile', __name__)

@profile_blueprint.route('/create_profile', methods=['POST'])
def create_profile():
    user_id = request.headers.get('Authorization')
    profile_fields = request.get_json()
    
    create_user_profile(user_id, profile_fields)
    
    return jsonify({"message": "Profile created successfully"})

@profile_blueprint.route('/update_profile', methods=['POST'])
def update_profile():
    user_id = request.headers.get('Authorization')
    profile_fields = request.get_json()

    update_user_profile(user_id, profile_fields)

    return jsonify({"message": "Profile updated successfully"})

@profile_blueprint.route('/get_profile', methods=['GET'])
def get_profile():
    user_id = request.headers.get('Authorization')

    user_profile_fields = fetch_user_profile(user_id)

    if user_profile_fields:
        return jsonify(user_profile_fields)
    else:
        return jsonify({"error": "User profile not found"}), 404
