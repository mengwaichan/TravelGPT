from flask import Flask, render_template, send_from_directory
import firebase_admin
from firebase_admin import credentials
from flask_cors import CORS
import os

from controllers.route import route_blueprint
from controllers.itinerary import itinerary_blueprint
from controllers.geocoding import geocoding_blueprint
from controllers.profile import profile_blueprint
from controllers.place import place_image_blueprint

app = Flask(__name__, static_folder="frontend/dist", template_folder="frontend")
CORS(app) 

@app.route("/static/<path:filename>")
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

@app.route("/")
def index():
    return render_template("index.html")


app.register_blueprint(route_blueprint, url_prefix='/route')
app.register_blueprint(itinerary_blueprint, url_prefix = '/itinerary')
app.register_blueprint(geocoding_blueprint, url_prefix = '/geocoding')
app.register_blueprint(profile_blueprint, url_prefix = '/profile')
app.register_blueprint(place_image_blueprint, url_prefix = '/image')

cred = credentials.Certificate('./firebase_auth.json')
firebase_admin.initialize_app(cred)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
