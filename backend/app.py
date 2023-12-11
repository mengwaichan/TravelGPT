from flask import Flask
from route_api import route_blueprint
from openai_api import itinerary_blueprint
from geocoding_api import geocoding_blueprint

app = Flask(__name__)

app.register_blueprint(route_blueprint, url_prefix='/route')
app.register_blueprint(itinerary_blueprint, url_prefix = '/itinerary')
app.register_blueprint(geocoding_blueprint, url_prefix = '/geocoding')

if __name__ == '__main__':
    app.run(host="localhost", debug=True, port=5000)
