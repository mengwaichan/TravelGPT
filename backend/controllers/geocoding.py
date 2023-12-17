from flask import Blueprint, jsonify, request
from models.geocoding import Geocoding

geocoding_blueprint = Blueprint('geocoding', __name__)

@geocoding_blueprint.route('/', methods = ['POST'])
def get_coordinates():
    try:
        data = request.get_json()

        location = data.get('name')

        coordinates = Geocoding()

        coordinates_data = coordinates.fetch_coordinates(location)

        return jsonify(coordinates_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500