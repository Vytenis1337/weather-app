import axios from "axios";
import { fetchWeatherData } from "./weatherService"; // adjust if path differs

jest.mock("axios");

describe("fetchWeatherData", () => {
  it("fetches weather and adds humidity based on closest hour", async () => {
    const mockResponse = {
      data: {
        current_weather: {
          temperature: 18.5,
          time: "2025-03-26T12:30:00Z",
        },
        hourly: {
          time: [
            "2025-03-26T11:00:00Z",
            "2025-03-26T12:00:00Z",
            "2025-03-26T13:00:00Z",
          ],
          relative_humidity_2m: [40, 42, 43],
        },
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const result = await fetchWeatherData(50.0, 30.0);

    expect(axios.get).toHaveBeenCalledWith(
      "https://api.open-meteo.com/v1/forecast",
      expect.objectContaining({
        params: expect.objectContaining({
          latitude: 50.0,
          longitude: 30.0,
        }),
      })
    );

    expect(result.current_weather.humidity).toBe(42);

    expect(result.current_weather.temperature).toBe(18.5);
  });

  it("returns null humidity if no hourly time data", async () => {
    axios.get.mockResolvedValue({
      data: {
        current_weather: {
          temperature: 10,
          time: "2025-03-26T12:00:00Z",
        },
        hourly: {
          time: [],
          relative_humidity_2m: [],
        },
      },
    });

    const result = await fetchWeatherData(10, 10);
    expect(result.current_weather.humidity).toBeNull();
  });
});
