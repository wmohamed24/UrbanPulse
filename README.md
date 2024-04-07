
# UrbanPulse

UrbanPulse is an innovative application dedicated to advancing urban planning and financial decision-making to enhance accessibility for people with disabilities. This project collects data from users to identify and address accessibility challenges, aiming to direct organizations and governments towards impactful investments in infrastructure and services.

## Features

- **Dynamic Route Analysis:** Utilizes the Mapbox API for detailed route visualization and accessibility analysis.
- **Data Analysis & Visualization:** Employs tools like Folium, Shapely, and Geopandas for sophisticated GIS data manipulation and interactive map displays.
- **Secure Data Management:** Incorporates Flask with Kintone for robust backend storage and management. Sensitive information, such as API keys, is securely handled using YAML files, and passwords are hashed for additional security.
- **Interactive Frontend:** Built with React and TypeScript, offering a responsive and user-friendly interface. Chakra UI supports a modern and accessible design system.
- **Authentication:** Features a secure and seamless authentication process using an Auth Context.
- **API Integration:** Uses Axios for efficient API calls, and React Router for seamless navigation within the application.
- **Location Tracking:** Implements navigator.geolocation for real-time user location tracking, feeding crucial data back to the backend for analysis.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/wmohamed24/UrbanPulse.git
   ```
2. Install NPM packages for the frontend
   ```sh
   cd frontend
   npm install
   ```
3. Install Python packages for the backend
   ```sh
   cd backend
   pip install -r requirements.txt
   ```

### Usage

For development purposes, start the frontend and backend servers:

- Starting the frontend:
  ```sh
  cd frontend
  npm start
  ```
- Starting the backend:
  ```sh
  cd backend
  python app.py
  ```

## Roadmap

- Expand to native development for enhanced performance and accessibility.
- Integrate additional APIs for broader data collection and analysis.
- Implement more advanced security features for data protection.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Please refer to CONTRIBUTING.md for more information.

## License

Distributed under the MIT License. See LICENSE for more information.

## Contact

- Project Link: https://github.com/wmohamed24/UrbanPulse

## Acknowledgments

- Flask
- React
- Mapbox
- Chakra UI
- Kintone
- Axios
- React Router
