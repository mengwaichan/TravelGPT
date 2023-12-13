from flask import Flask
import firebase_admin
from firebase_admin import credentials
from route_blueprint import route_blueprint
from openai_blueprint import itinerary_blueprint
from geocoding_blueprint import geocoding_blueprint
from user_profile_blueprint import profile_blueprint

app = Flask(__name__)

cred = credentials.Certificate('./firebase_auth.json')
firebase_admin.initialize_app(cred)

app.register_blueprint(route_blueprint, url_prefix='/route')
app.register_blueprint(itinerary_blueprint, url_prefix = '/itinerary')
app.register_blueprint(geocoding_blueprint, url_prefix = '/geocoding')
app.register_blueprint(profile_blueprint, url_prefix = '/profile')

if __name__ == '__main__':
    app.run(host="localhost", debug=True, port=5000)
