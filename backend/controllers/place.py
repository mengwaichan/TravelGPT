from flask import Blueprint, jsonify, request
from models.place import get_place_image

# Create a Blueprint for the controller
place_image_blueprint = Blueprint('place_image', __name__)

@place_image_blueprint.route('/', methods=['GET'])
def get_places():
    city = request.args.get('city')

    try:
        return jsonify(get_place_image(city))
    except RuntimeError as e:
        return jsonify({'error': str(e)}), 500
