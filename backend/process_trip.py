import requests
import yaml



def process_trip(data):
    with open('api.yaml', 'r') as file:
        data_loaded = yaml.safe_load(file)

    kintone_users_api = data_loaded['kintone_trips_api']
    
    url = "https://urban-pulse.kintone.com/k/v1/record.json"
    headers = {
        "X-Cybozu-API-Token": kintone_users_api,
        "Content-Type": "application/json"
    }
    payload = {
        "app": 2,
        "record": {
            "start_point": {"value": data['start_point']},
            "start_time": {"value": data['start_time']},
            "end_point": {"value": data['end_point']},
            "end_time": {"value": data['end_time']},
            "path": {"value": data['path']},
            "comments": {"value": data['comments']},
            "duration": {"value": data['duration']},
            "disability": {"value": data['disability']},
            "user_id": {"value": data['userId']}
        }
    }
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        return True
    else:
        print(response.json())
        return False