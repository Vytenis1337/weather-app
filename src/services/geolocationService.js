import axios from "axios";

export const searchCityByName = async (query) => {
  const response = await axios.get(
    "https://geocoding-api.open-meteo.com/v1/search",
    {
      params: {
        name: query,
        count: 5,
        language: "en",
        format: "json",
      },
    }
  );

  return (
    response.data.results?.map((city) => ({
      name: `${city.name}, ${city.country}`,
      lat: city.latitude,
      lon: city.longitude,
    })) || []
  );
};
