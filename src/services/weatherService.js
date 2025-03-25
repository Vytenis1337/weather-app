import axios from "axios";

export const fetchWeatherData = async (lat, lon) => {
  const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: {
      latitude: lat,
      longitude: lon,
      current_weather: true,
      hourly: "temperature_2m,relative_humidity_2m",
      daily:
        "temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode",
      timezone: "auto",
    },
  });

  const { current_weather, hourly } = response.data;

  const findClosestHourIndex = () => {
    const currentTime = new Date(current_weather.time).getTime();
    let closestDiff = Infinity;
    let closestIndex = -1;

    hourly.time.forEach((t, i) => {
      const diff = Math.abs(new Date(t).getTime() - currentTime);
      if (diff < closestDiff) {
        closestDiff = diff;
        closestIndex = i;
      }
    });

    return closestIndex;
  };

  const humidityIndex = findClosestHourIndex();
  const currentHumidity =
    humidityIndex !== -1 ? hourly.relative_humidity_2m[humidityIndex] : null;

  return {
    ...response.data,
    current_weather: {
      ...current_weather,
      humidity: currentHumidity,
    },
  };
};
