# 🌦️ Weather Forecast App

A full-stack web application that displays 5-day weather forecasts and logs user actions to a backend server and database.

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

- Logs user city selections
- Stores log entries in a lightweight SQLite database
- Optional `/logs` route for viewing stored entries

---

## 🌐 External APIs

- **Weather Forecast API:** https://api.open-meteo.com/v1/forecast
- **Geocoding API:** https://geocoding-api.open-meteo.com/v1/search?name=City

---

## 🧰 Tech Stack

| Layer         | Technology                     |
| ------------- | ------------------------------ |
| Front-end     | React, Material UI, SASS       |
| Back-end      | Node.js, Express               |
| API           | Open-Meteo Weather + Geocoding |
| Database      | SQLite (file-based)            |
| State Storage | localStorage                   |

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

Run tests:

```bash
npm test
```

### 🧪 Backend (React)

- POST /log – logs user actions to SQLite DB
- 400 response for missing cityName

Run tests:

```bash
cd backend
npm test
```
