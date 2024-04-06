from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from db_kintone import add_user_to_kintone, read_records, check_credentials

app = Flask(__name__)
CORS(app)

# Dummy database structure for demonstration purposes
users_db = {}

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    print(data)
    
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
    if check_credentials(email, password, records):
        # Login successful
        return jsonify({'message': 'Login successful'}), 200
    else:
        # Login failed
        return jsonify({'message': 'Invalid email or password'}), 401

if __name__ == '__main__':
    app.run(debug=True, port='8080')
