import axios from "axios";
import { searchCityByName } from "./geolocationService";

jest.mock("axios");

describe("searchCityByName", () => {
  it("returns transformed city data", async () => {
    const mockResponse = {
      data: {
        results: [
          {
            name: "Paris",
            country: "France",
            latitude: 48.8566,
            longitude: 2.3522,
          },
        ],
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const result = await searchCityByName("Paris");

    expect(axios.get).toHaveBeenCalledWith(
      "https://geocoding-api.open-meteo.com/v1/search",
      {
        params: {
          name: "Paris",
          count: 5,
          language: "en",
          format: "json",
        },
      }
    );

    expect(result).toEqual([
      {
        name: "Paris, France",
        lat: 48.8566,
        lon: 2.3522,
      },
    ]);
  });

  it("returns an empty array if no results", async () => {
    axios.get.mockResolvedValue({ data: { results: null } });

    const result = await searchCityByName("Nowhere");
    expect(result).toEqual([]);
  });
});
