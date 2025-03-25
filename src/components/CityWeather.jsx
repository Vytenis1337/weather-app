import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const CityWeather = ({ cityName, weather }) => {
  if (!weather) return null;

  const current = weather.current_weather;
  const forecast = weather.daily;

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h5">{cityName} - Current Weather</Typography>
        <Typography>Temperature: {current.temperature}°C</Typography>
        <Typography>
          Humidity: {current.humidity !== null ? `${current.humidity}%` : "N/A"}
        </Typography>
        <Typography>Wind: {current.windspeed} km/h</Typography>
        <Typography>Time: {current.time}</Typography>

        <Typography variant="h6" mt={3}>
          5-Day Forecast
        </Typography>
        <Grid container spacing={2}>
          {forecast.time.slice(0, 5).map((day, index) => (
            <Grid item xs={12} sm={6} md={4} key={day}>
              <Card sx={{ backgroundColor: "#f0f0f0" }}>
                <CardContent>
                  <Typography variant="subtitle1">{day}</Typography>
                  <Typography>
                    Min: {forecast.temperature_2m_min[index]}°C
                  </Typography>
                  <Typography>
                    Max: {forecast.temperature_2m_max[index]}°C
                  </Typography>
                  <Typography>
                    Precipitation: {forecast.precipitation_sum[index]} mm
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CityWeather;
