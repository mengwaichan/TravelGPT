from openai import OpenAI
import json

class OpenAIService:
    def __init__(self):
        self.client = OpenAI()

    def generate_itinerary(self, city, duration):
        prompt =f"return an itinerary for {duration} days in {city}, with 4 activities for each day, no repeat locations, and transport = walk, transit."
        json_format = "JSON = {city: city, days:  [ { day: 1, locations:  [ { name: name, activity: activity, transport: transport}, { name: name, activity: activity, transport: transport} ] }, }"   
        openai_response = self.client.chat.completions.create(
            model="gpt-3.5-turbo-1106",
            response_format={ "type": "json_object" },
            messages = [{"role": "system", "content": "You are a helpful assistant designed to output JSON."},
                        {"role": "user", "content": prompt + json_format}]
        )
    
        return json.loads(openai_response.choices[0].message.content)
