from flask import Blueprint, jsonify, request
from openai import OpenAI
import json
from write_itinerary import write_itinerary

itinerary_blueprint = Blueprint('itinerary', __name__)

@itinerary_blueprint.route('/',methods = ["POST"])
def get_itinerary():
    """
    Generate and store an itinerary based on user input.

    This endpoint takes a JSON payload containing information about the city, duration,
    and user ID from the request. It uses the OpenAI GPT-3.5 model to generate an itinerary
    based on a predefined prompt. The generated itinerary is then stored in Firebase.

    Parameters:
        - city (str): The city for which the itinerary is generated.
        - duration (int): The duration of the itinerary in days.
        - UID (str): User ID used for authentication.

    Returns:
        - JSON: The generated itinerary in JSON format.

    Raises:
        - HTTP 400: If the required parameters (city or duration) are missing.
        - Any exceptions raised during the process.

    Usage:
        - Send a POST request with JSON payload containing city, duration, and UID.
    """
    client = OpenAI()
    data = request.get_json()
    city = data.get('city')
    duration = data.get('duration')
    user_id = request.headers.get('Authorization')

    if not city or not duration:
        return jsonify({'error': 'City and duration are required parameters'}), 400

    prompt =f"return an itinerary for {duration} days in {city}, with 4 activities for each day, and transport = walk, transit."
    json_format = "JSON = {city: city, days:  [ { day: 1, locations:  [ { name: name, activity: activity, transport: transport}, { name: name, activity: activity, transport: transport} ] }, }"   
    openai_response = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        response_format={ "type": "json_object" },
        messages = [{"role": "system", "content": "You are a helpful assistant designed to output JSON."},
                   {"role": "user", "content": prompt + json_format}]
    )
    
    itinerary_data = json.loads(openai_response.choices[0].message.content)
    
    write_itinerary(user_id, itinerary_data)
    
    return jsonify(itinerary_data)