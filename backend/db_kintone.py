import requests
import yaml
from werkzeug.security import  check_password_hash
from flask import jsonify

def get_kintone_record(record_id, app_id):
    with open('api.yaml', 'r') as file:
        data_loaded = yaml.safe_load(file)

    kintone_users_api = data_loaded['kintone_users_api']
    url = "https://urban-pulse.kintone.com/k/v1/record.json"
    headers = {
        'X-Cybozu-API-Token': kintone_users_api,
    }
    params = {
        'app': app_id,
        'id': record_id
    }
    
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()  # This will raise an HTTPError if the HTTP request returned an unsuccessful status code
        return jsonify(response.json()), 200
    except requests.exceptions.RequestException as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500


def check_credentials(email, password, records):
    for record in records:
        # Assuming 'email' is the field code for the email in Kintone records
        if record['email']['value'] == email:
            # Assuming the password is hashed using bcrypt
            hashed_password = record['password']['value']
            # The password field from Kintone record includes the hash type and hash parameters, hence split by '$'
            if hashed_password and check_password_hash(hashed_password, password):
                return True, record['id']['value'], record['on_trip']['value']

    return False


def add_user_to_kintone(data):
    with open('api.yaml', 'r') as file:
        data_loaded = yaml.safe_load(file)

    kintone_users_api = data_loaded['kintone_users_api']
    
    url = "https://urban-pulse.kintone.com/k/v1/record.json"
    headers = {
        "X-Cybozu-API-Token": kintone_users_api,
        "Content-Type": "application/json"
    }
    payload = {
        "app": 1,
        "record": {
            "email": {"value": data['email']},
            "first_name": {"value": data['firstName']},
            "last_name": {"value": data['lastName']},
            "password": {"value": data['password']},
            "address": {"value": data['address']},
            "occupation": {"value": data['occupation']},
            "phone_number": {"value": data['phoneNumber']},
            "disability_type": {"value": data['disabilityType']},
        }
    }
    print(payload, "\n")
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        return True
    else:
        print(response.json())
        return False

def read_records():
    with open('api.yaml', 'r') as file:
        data_loaded = yaml.safe_load(file)

    kintone_users_api = data_loaded['kintone_users_api']

    url = "https://urban-pulse.kintone.com/k/v1/records.json"
    params = {
        "app": 1
    }
    headers = {
        "X-Cybozu-API-Token": kintone_users_api
    }
    
    all_records = []
    offset = 0
    
    while True:
        response = requests.get(url, headers=headers, params=params)
        if response.status_code != 200:
            print(response.json())  # Handle errors appropriately
            break
        
        data = response.json()
        all_records.extend(data['records'])
        
        if "next" not in data:  # Check if there's a 'next' key in the response
            break
        
        offset += 100  # Update the offset, Kintone typically has a 100 record limit per request
        params["query"] = f"limit 100 offset {offset}"
    
    return all_records
