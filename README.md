# 🌦️ Weather Forecast App

A full-stack web application that displays 5-day weather forecasts and logs user actions to a backend server and Firestore database.  
Deployed on **Firebase Hosting** (frontend) and **Google App Engine** (backend).

---

## 🌍 Live Links

- **Frontend:** [https://weather-app-gcp-454913.web.app]
- **Backend (logs route):** [https://weather-app-gcp-454913.ew.r.appspot.com/logs]

---

## 📦 Features

### 🌐 Frontend (React + Material UI + SASS)

- Responsive layout
- Searchable city input with live results via [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- Displays 3 most-viewed cities using `localStorage`
- Shows selected city's:
  - Temperature
  - Humidity
  - Wind speed
  - Timestamp
- 5-day weather forecast with:
  - Min/Max temperatures
  - Precipitation

### 🔧 Backend (Node.js + Express + SQLite)

- Logs city selections via `/log` POST route
- Stores user actions in a **Firestore** database
- Optional `/logs` GET route for viewing saved entries

---

## 🌐 External APIs

- **Weather Forecast API:** https://api.open-meteo.com/v1/forecast
- **Geocoding API:** https://geocoding-api.open-meteo.com/v1/search?name=City

---

## 🧰 Tech Stack

| Layer         | Technology                                   |
| ------------- | -------------------------------------------- |
| Front-end     | React, Material UI, SASS                     |
| Back-end      | Node.js, Express                             |
| API           | Open-Meteo Weather + Geocoding               |
| Database      | Firestore (NoSQL, serverless)                |
| Hosting       | Firebase Hosting (Frontend), App Engine (BE) |
| State Storage | localStorage                                 |

---

## 🛠️ Setup Instructions

### 🧱 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/weather-app.git
cd weather-forecast
```

### 🌐 2. Run the Frontend

```bash
npm install
npm start
```

### 🌐 3. Run the Backend

```bash
cd ../backend
npm install
node server.js
```

## ✅ Tests

This project includes both frontend and backend unit tests.

### 🧪 Frontend (React)

- Tested using **Jest** and **React Testing Library**
- Covers rendering of current weather and 5-day forecast
- User input, async search results, and selection handling
- Transforms API response to include closest humidity data
- Fetches geocoding data from Open-Meteo and maps it

Run tests:

```bash
npm test
```

### 🧪 Backend (React)

- POST /log – logs user actions to Firestore
- Mocks Firestore during tests to avoid real database writes
- Handles missing cityName with 400 Bad Request response

Run tests:

```bash
cd backend
npm test
```
