# WTWR (What to Wear?)

## About the project

WTWR is a React-based web application that suggests clothing items based on the current weather. It fetches real-time weather data from the OpenWeather API and displays appropriate clothing recommendations filtered by temperature.

## Features

- Real-time weather data fetched from OpenWeather API
- Temperature unit toggle switch (°F / °C) using React Context
- Clothing recommendations filtered by weather type (hot, warm, cold)
- Dynamic WeatherCard that changes based on time of day and conditions
- Profile page with full wardrobe view (React Router)
- Add new garment via controlled form (useForm custom hook)
- Delete garment with confirmation modal
- Persistent data via json-server mock API

## Technologies used

- React 18
- React Router v6
- Vite
- CSS (BEM methodology)
- OpenWeather API
- json-server (mock REST API)

## Running the project

You need **two terminal windows** — one for the React app and one for the mock API server.

**Terminal 1 — React dev server:**
```bash
npm install
npm run dev
```

**Terminal 2 — Mock API server (json-server):**
```bash
npm install -g json-server@^0
json-server --watch db.json --id _id --port 3001
```

The app will open at `http://localhost:5173` (Vite default).  
The API runs at `http://localhost:3001`.

## Project Pitch Video

Check out [this video](https://drive.google.com/file/d/1nhvPM8C30h5qBM0RBarLzfG-RIwVi1_U/view?usp=drive_link), where I describe my project and some challenges I faced while building it.
