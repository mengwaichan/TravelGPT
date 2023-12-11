from flask import Blueprint, jsonify, request
from route import Route

route_blueprint = Blueprint('route', __name__)

@route_blueprint.route('/', methods = ['POST'])
def get_route():
    try:
        data = request.get_json()

        origin_latitude = float(data.get('origin_latitude'))
        origin_longitude = float(data.get('origin_longitude'))
        destination_latitude = float(data.get('destination_latitude'))
        destination_longitude = float(data.get('destination_longitude'))
        travel_mode = data.get('transport')

        route = Route()

        route_data = route.fetch_directions(origin_latitude, origin_longitude, destination_latitude, destination_longitude, travel_mode)
        
        return jsonify(route_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
