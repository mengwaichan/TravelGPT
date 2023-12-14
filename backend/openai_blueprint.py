from flask import Blueprint, jsonify, request
from openai import OpenAI
import json
from write_itinerary import write_itinerary

itinerary_blueprint = Blueprint('itinerary', __name__)

@itinerary_blueprint.route('/',methods = ["POST"])
def get_itinerary():
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
    
    response_data = jsonify(itinerary_data)
    write_itinerary(user_id, itinerary_data)
    print(response_data)
    return response_data