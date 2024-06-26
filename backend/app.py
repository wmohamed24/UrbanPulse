from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from db_kintone import add_user_to_kintone, read_records, check_credentials, get_kintone_record
from trips_data import read_trips_data
from visualize_trips import process_and_visualize_routes
from process_trip import process_trip

app = Flask(__name__)
CORS(app)

# Dummy database structure for demonstration purposes
users_db = {}

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()    
    hashed_password = generate_password_hash(data['password'])
    data['password'] = hashed_password
    
    if add_user_to_kintone(data):
        return jsonify({'message': 'User created successfully'}), 201
    else:
        return jsonify({'message': 'Failed to create user in Kintone'}), 500
    

@app.route('/authenticate_login', methods=['POST'])
def login():
    records = read_records()
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Now call the function to check these credentials against Kintone records
    found, id, on_trip = check_credentials(email, password, records)
    if found:
        # Login successful
        return jsonify({'message': 'Login successful', 'id': id, 'on_trip': on_trip}), 200
    else:
        # Login failed
        return jsonify({'message': 'Invalid email or password'}), 401
    

@app.route('/get_kintone_record', methods=['GET'])
def read_user_data():

    record_id = request.args.get('id')
    app_id = 1
    return get_kintone_record(record_id, app_id)


@app.route('/analyze_trips_data', methods=['GET'])
def analyze_trips_data():
    trips = read_trips_data()
    routes = list()
    for trip in trips:
        points = [trip['start_point']]
        points.extend(trip['path'])
        points.append(trip['end_point'])
        points_lon_lat = [(point['lon'], point['lat']) for point in points]
        
        routes.append({'coordinates': points_lon_lat, 'disability': trip['disability']})
    
    process_and_visualize_routes(routes[:10])
    return send_from_directory('./visuals', 'mapbox_route_visualization.html')

@app.route('/add_trip', methods=['POST'])
def log_trip():
    trip_data = request.json
    process_trip(trip_data)
    return jsonify({'status': 'success'}), 200

if __name__ == '__main__':
    app.run(debug=True, port='8080')
