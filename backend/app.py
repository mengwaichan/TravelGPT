from flask import Flask
import firebase_admin
from firebase_admin import credentials
from flask_cors import CORS

from controllers.route import route_blueprint
from controllers.itinerary import itinerary_blueprint
from controllers.geocoding import geocoding_blueprint
from controllers.profile import profile_blueprint
from controllers.place import place_image_blueprint

app = Flask(__name__)
CORS(app) 

cred = credentials.Certificate('./firebase_auth.json')
firebase_admin.initialize_app(cred)

app.register_blueprint(route_blueprint, url_prefix='/route')
app.register_blueprint(itinerary_blueprint, url_prefix = '/itinerary')
app.register_blueprint(geocoding_blueprint, url_prefix = '/geocoding')
app.register_blueprint(profile_blueprint, url_prefix = '/profile')
app.register_blueprint(place_image_blueprint, url_prefix = '/image')

if __name__ == '__main__':
    app.run(host="localhost", debug=True, port=5000)
