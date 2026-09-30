# WTWR (What to Wear?)

## About the Project

WTWR is a React-based web application that suggests clothing items based on the current weather in your location. It fetches real-time weather data from the OpenWeather API and displays appropriate clothing recommendations filtered by temperature. Users can add and delete garments and toggle between Fahrenheit and Celsius at any time.

## Features

- Real-time weather data fetched from the OpenWeather API
- Temperature unit toggle switch (°F / °C) shared across components via React Context
- Clothing recommendations filtered by weather type (hot, warm, cold)
- Dynamic WeatherCard image that adapts to the time of day and conditions
- Profile page showing all garments (React Router v6)
- Add new garment via a controlled form powered by the `useForm` custom hook
- Delete garment with a two-step confirmation modal to prevent accidental removal
- Persistent mock data via json-server — items survive page refreshes during development

## Technologies Used

- React 18 (functional components + hooks)
- React Router v6 (client-side routing)
- React Context API (temperature unit state shared without prop-drilling)
- Vite (build tool and dev server)
- CSS with BEM methodology (one CSS file per component)
- OpenWeather API (current conditions)
- json-server (mock REST API serving `db.json`)

## Running the Project

You need **two terminal windows** — one for the React app, one for the mock API server.

**Terminal 1 — React dev server:**
```bash
npm install
npm run dev
```

**Terminal 2 — Mock API server:**
```bash
npm install -g json-server@^0
json-server --watch db.json --id _id --port 3001
```

The app opens at `http://localhost:3000` (configured in `vite.config.js`).
The mock API runs at `http://localhost:3001`.

> **Note:** If you deploy to GitHub Pages, swap `BrowserRouter` for `HashRouter` in `App.jsx` to avoid 404s on direct URL access. The json-server API will not be available on a static deployment.

## File Structure Highlights

```
src/
├── components/          # One folder per component, each with .jsx + .css
├── contexts/            # CurrentTemperatureUnitContext.js
├── hooks/               # useForm.js — custom controlled-form hook
└── utils/
    ├── api.js           # GET / POST / DELETE calls to json-server
    ├── constants.js     # Coordinates, API key, weather image map
    └── weatherAPI.js    # OpenWeather fetch + data parsing
db.json                  # Mock database — loaded by json-server
```

## Project Pitch Video

Check out [this video](https://drive.google.com/file/d/1nhvPM8C30h5qBM0RBarLzfG-RIwVi1_U/view?usp=drive_link), where I describe my project and some challenges I faced while building it.
