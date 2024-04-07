

import folium
from shapely.geometry import LineString
import geopandas as gpd
from collections import defaultdict
import requests
import yaml

# Your Mapbox access token
with open('api.yaml', 'r') as file:
    data_loaded = yaml.safe_load(file)

MAPBOX_ACCESS_TOKEN = data_loaded['mapbox_api']

def get_mapbox_route(coordinates):
    """
    Fetches a route from the Mapbox Directions API.

    Parameters:
    - coordinates: A list of [longitude, latitude] pairs for start, waypoints, and end.

    Returns:
    - The GeoJSON route as a dictionary.
    """
    coords_str = ';'.join([f"{lng},{lat}" for lng, lat in coordinates])
    url = f"https://api.mapbox.com/directions/v5/mapbox/driving/{coords_str}?geometries=geojson&access_token={MAPBOX_ACCESS_TOKEN}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        routes = data['routes'][0]['geometry']
        return routes
    else:
        print("Failed to fetch the route:", response.content)
        return None

def process_route(geojson_route):
    """
    Converts a GeoJSON route into a list of Shapely LineStrings (segments).
    """
    if not geojson_route:
        return []
    line = LineString(geojson_route['coordinates'])
    return [LineString([line.coords[i], line.coords[i + 1]]) for i in range(len(line.coords) - 1)]

def calculate_frequencies(segments):
    """
    Calculate frequencies of each unique segment.
    """
    segment_strs = [''.join(map(str, seg.coords)) for seg in segments]
    frequency = defaultdict(int)
    for seg in segment_strs:
        frequency[seg] += 1
    return frequency

def visualize_route(m, segments, frequency, disability_color):
    """
    Modifies the function to use a color based on the route's disability.
    """
    max_freq = max(frequency.values(), default=1)
    for seg in segments:
        seg_str = ''.join(map(str, seg.coords))
        freq = frequency[seg_str]
        thickness = 5 * (freq / max_freq)  # Example of dynamic thickness scaling
        # Use the disability color for each segment
        folium.PolyLine(locations=[list(reversed(coord)) for coord in seg.coords],
                        weight=thickness, color=disability_color).add_to(m)
        

def add_legend(m):
    """
    Adds a custom legend with color boxes to the Folium map.
    """
    legend_html = '''
     <div style="position: fixed; 
     bottom: 50px; left: 50px; width: 200px; height: 200px; 
     border:2px solid grey; z-index:9999; font-size:14px;
     background-color:white; opacity: 0.9; padding: 10px">
     <b>Disability Types</b> <br>
     &nbsp; Hearing &nbsp; <i style="background:blue;opacity:0.7;"></i><br>
     &nbsp; Visual &nbsp; <i style="background:red;opacity:0.7;"></i><br>
     &nbsp; Mobility &nbsp; <i style="background:green;opacity:0.7;"></i>
     </div>
    '''

    legend_html = '''
     <div style="position: fixed; 
     bottom: 50px; left: 50px; width: 180px; height: 120px; 
     border:2px solid grey; z-index:9999; font-size:14px; overflow: auto; background-color:white;">
     <b>Disability Types</b><br>
     &nbsp; Hearing &nbsp; <i class="fa fa-square fa-2x" style="color:blue"></i><br>
     &nbsp; Visual &nbsp; <i class="fa fa-square fa-2x" style="color:red"></i><br>
     &nbsp; Mobility &nbsp; <i class="fa fa-square fa-2x" style="color:green"></i>
     </div>
    '''
    m.get_root().html.add_child(folium.Element(legend_html))

def process_and_visualize_routes(routes_with_disabilities):
    """
    Processes multiple routes, calculates segment frequencies, and visualizes them.
    Each route is associated with a disability to color the routes accordingly.
    """
    disability_colors = {
        'Hearing': 'blue',
        'Visual': 'red',
        'Mobility': 'green'
    }
    
    # Initialize your Folium map here
    print(f"\n\n\n {routes_with_disabilities[0]['coordinates']} \n\n\n")
    m = folium.Map(location=[routes_with_disabilities[0]['coordinates'][0][1], routes_with_disabilities[0]['coordinates'][0][0]], zoom_start=12)

    for route_info in routes_with_disabilities:
        coordinates = route_info['coordinates']
        disability = route_info['disability']
        
        # Fetch the route
        geojson_route = get_mapbox_route(coordinates)
        
        # Process the route to get segments
        segments = process_route(geojson_route)
        
        # Calculate segment frequencies (assuming this is still relevant for your application)
        frequency = calculate_frequencies(segments)
        
        # Determine the color based on the disability
        disability_color = disability_colors.get(disability, 'gray')  # Default to gray if not found
        
        # Visualize the route with the assigned disability color
        visualize_route(m, segments, frequency, disability_color)
    add_legend(m)
    m.save("./visuals/mapbox_route_visualization.html")