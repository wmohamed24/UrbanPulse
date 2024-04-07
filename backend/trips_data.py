import yaml, requests
import json
import re
import ast
import pandas as pd
from ast import literal_eval

def read_records():
    with open('api.yaml', 'r') as file:
        data_loaded = yaml.safe_load(file)

    kintone_trips_api = data_loaded['kintone_trips_api']

    url = "https://urban-pulse.kintone.com/k/v1/records.json"
    params = {
        "app": 2
    }
    headers = {
        "X-Cybozu-API-Token": kintone_trips_api
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


def convert_decimal_string_to_dict(decimal_string):
    decimal_string = re.sub(r"Decimal\('(-?\d+\.\d+)'\)", r"\1", decimal_string)
    return ast.literal_eval(decimal_string)

def convert_path_string_to_list(path_string):
    path_string = re.sub(r"Decimal\('(-?\d+\.\d+)'\)", r"\1", path_string)
    return ast.literal_eval(path_string)

def convert_comments(comments):
    processed_str = comments.replace("Decimal('", "").replace("')", "")    
    list_obj = literal_eval(processed_str)
    return list_obj

def filter_records(records):
    to_return = list()
    for record in records:
        record['end_point']['value'] = convert_decimal_string_to_dict(record['end_point']['value'])
        record['start_point']['value'] = convert_decimal_string_to_dict(record['start_point']['value'])
        record['path']['value'] = convert_path_string_to_list(record['path']['value'])
        record['duration']['value'] = int(record['duration']['value'])
        
        to_keep = ['comments', 'disability', 'user_id', 'start_point', 'end_point', 'start_time', 'end_tiem', 'path', 'duration']
        record = {key: value['value'] for key, value in record.items() if isinstance(value, dict)}
        record = {k: record[k] for k in to_keep if k in record}
        record['comments'] = convert_comments(record['comments'])

        to_return.append(record)
        
    return to_return



def read_trips_data():
    records = filter_records(read_records())
    return records
    
# if __name__ == "__main__":
#     read_trips_data()