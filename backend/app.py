from flask import Flask
import firebase_admin
from firebase_admin import credentials
from flask_cors import CORS
import os
from dotenv import load_dotenv

from controllers.route import route_blueprint
from controllers.itinerary import itinerary_blueprint
from controllers.geocoding import geocoding_blueprint
from controllers.profile import profile_blueprint
from controllers.place import place_image_blueprint

load_dotenv()

app = Flask(__name__)
CORS(app) 

cred = credentials.Certificate({
    "type": os.getenv("FIREBASE_TYPE"),
    "project_id": os.getenv("FIREBASE_PROJECT_ID"),
    "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
    "private_key": os.getenv("FIREBASE_PRIVATE_KEY").replace("\\n", "\n"),
    "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
    "client_id": os.getenv("FIREBASE_CLIENT_ID"),
    "auth_uri": os.getenv("FIREBASE_AUTH_URI"),
    "token_uri": os.getenv("FIREBASE_TOKEN_URI"),
    "auth_provider_x509_cert_url": os.getenv("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"),
    "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_X509_CERT_URL")
})

firebase_admin.initialize_app(cred)

app.register_blueprint(route_blueprint, url_prefix='/route')
app.register_blueprint(itinerary_blueprint, url_prefix = '/itinerary')
app.register_blueprint(geocoding_blueprint, url_prefix = '/geocoding')
app.register_blueprint(profile_blueprint, url_prefix = '/profile')
app.register_blueprint(place_image_blueprint, url_prefix = '/image')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))